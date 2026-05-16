import React, { useCallback, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Ratio from "react-bootstrap/Ratio";
import ProjectDetailsModal from "./ProjectDetailsModal";

function looksLikeHtml(text) {
  if (typeof text !== "string") return false;
  return /<[^>]+>/.test(text);
}

function toYouTubeEmbedUrl(url) {
  if (typeof url !== "string") return null;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace("www.", "");

    if (host === "youtu.be") {
      const id = parsed.pathname.replace("/", "").trim();
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        const id = parsed.searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }

      if (parsed.pathname.startsWith("/embed/")) {
        return url;
      }
    }
  } catch {
    // ignore invalid URLs
  }

  return null;
}

function isMediaVideo(item) {
  return item?.type === "video";
}

function isMediaImage(item) {
  return !item?.type || item?.type === "img";
}

function isExternalUrl(value) {
  return typeof value === "string" && (value.startsWith("http://") || value.startsWith("https://"));
}

function ProjectCards(props) {
  const media = Array.isArray(props.media) ? props.media : [];
  const coverMedia = media[0] || null;

  const [showDetails, setShowDetails] = useState(false);
  const openDetails = useCallback(() => setShowDetails(true), []);
  const closeDetails = useCallback(() => setShowDetails(false), []);

  const descriptionContent = props.summary || props.description;

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openDetails();
      }
    },
    [openDetails]
  );

  return (
    <>
      <Card
        className="project-card-view project-card-view--clickable"
        onClick={openDetails}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={`Voir les détails du projet ${props.title || ""}`.trim()}
      >
        <Card.Body>
          <div className="project-card-content">
            <div>
              <div className="project-card-header">
                <Card.Title className="main-name">{props.title}</Card.Title>

                {Array.isArray(props.stack) && props.stack.length > 0 ? (
                  <div className="project-tech project-tech--top">
                    {props.stack.slice(0, 4).map((tech) => (
                      <span className="project-tech-badge" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              {props.subtitle ? <div className="project-subtitle">{props.subtitle}</div> : null}

              {coverMedia ? (
                <div className="project-cover">
                  {isMediaVideo(coverMedia) ? (
                    (() => {
                      const embedUrl = toYouTubeEmbedUrl(coverMedia.src);
                      if (embedUrl) {
                        return (
                          <Ratio aspectRatio="16x9">
                            <iframe
                              src={embedUrl}
                              title={coverMedia.alt || `${props.title || "Project"} video`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </Ratio>
                        );
                      }

                      return (
                        <video
                          className="project-cover-media project-cover-media--video"
                          src={coverMedia.src}
                          controls
                          preload="metadata"
                        />
                      );
                    })()
                  ) : isMediaImage(coverMedia) ? (
                    <img
                      className="project-cover-media project-cover-media--img"
                      src={coverMedia.src}
                      alt={coverMedia.alt || props.title || "project"}
                      loading={isExternalUrl(coverMedia.src) ? "lazy" : undefined}
                    />
                  ) : null}
                </div>
              ) : null}

              {descriptionContent ? (
                <Card.Text className="project-summary project-summary--clamp" style={{ textAlign: "left" }}>
                  {looksLikeHtml(descriptionContent) ? (
                    <span dangerouslySetInnerHTML={{ __html: descriptionContent }} />
                  ) : (
                    <span style={{ whiteSpace: "pre-line" }}>{descriptionContent}</span>
                  )}
                </Card.Text>
              ) : null}
            </div>

            <div className="project-links">
              <Button
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  openDetails();
                }}
              >
                Voir plus
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <ProjectDetailsModal
        show={showDetails}
        onHide={closeDetails}
        title={props.title}
        subtitle={props.subtitle}
        summary={props.summary}
        description={props.description}
        details={props.details}
        stack={props.stack}
        media={media}
        notesHtml={props.notesHtml}
        ghLink={props.ghLink}
        demoLink={props.demoLink}
      />
    </>
  );
}
export default ProjectCards;
