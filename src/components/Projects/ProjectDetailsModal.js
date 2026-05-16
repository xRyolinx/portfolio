import React, { useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { BsGithub } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";

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

export default function ProjectDetailsModal({
  show,
  onHide,
  title,
  subtitle,
  summary,
  description,
  details,
  stack,
  media,
  notesHtml,
  ghLink,
  demoLink,
}) {
  const items = useMemo(() => (Array.isArray(media) ? media : []).filter((m) => m?.src), [media]);
  const descriptionContent = description || summary;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      scrollable
      contentClassName="project-modal-content"
      dialogClassName="project-modal-dialog"
      aria-labelledby="project-details-title"
    >
      <Modal.Header closeButton closeVariant="white" className="project-modal-header">
        <div className="project-modal-titleWrap">
          <Modal.Title id="project-details-title" className="project-modal-title">
            {title}
          </Modal.Title>
          {subtitle ? <div className="project-modal-subtitle">{subtitle}</div> : null}
        </div>
      </Modal.Header>

      <Modal.Body className="project-modal-body">
        {items.length > 0 ? (
          <Carousel
            className="project-modal-carousel"
            interval={null}
            indicators={items.length > 1}
            controls={items.length > 1}
            fade={false}
          >
            {items.map((item) => {
              const isVideo = isMediaVideo(item);
              const key = `${item.type || "img"}-${item.src}`;
              const embedUrl = isVideo ? toYouTubeEmbedUrl(item.src) : null;

              return (
                <Carousel.Item key={key} className="project-modal-carouselItem">
                  {isVideo ? (
                    embedUrl ? (
                      <div className="project-modal-embedWrap">
                        <iframe
                          src={embedUrl}
                          title={item.alt || `${title || "Project"} video`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <video
                        className="project-modal-media project-modal-media--video"
                        src={item.src}
                        controls
                        preload="metadata"
                      />
                    )
                  ) : isMediaImage(item) ? (
                    <img
                      className="project-modal-media project-modal-media--img"
                      src={item.src}
                      alt={item.alt || title || "project"}
                      loading={isExternalUrl(item.src) ? "lazy" : undefined}
                    />
                  ) : null}

                  {item.alt ? (
                    <Carousel.Caption className="project-modal-caption">
                      <div className="project-modal-captionText">{item.alt}</div>
                    </Carousel.Caption>
                  ) : null}
                </Carousel.Item>
              );
            })}
          </Carousel>
        ) : null}

        {Array.isArray(stack) && stack.length > 0 ? (
          <div className="project-tech project-modal-tech">
            {stack.map((tech) => (
              <span className="project-tech-badge" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        ) : null}

        {descriptionContent ? (
          <div className="project-modal-description">
            {looksLikeHtml(descriptionContent) ? (
              <div dangerouslySetInnerHTML={{ __html: descriptionContent }} />
            ) : (
              <div style={{ whiteSpace: "pre-line" }}>{descriptionContent}</div>
            )}
          </div>
        ) : null}

        {Array.isArray(details) && details.length > 0 ? (
          <ul className="project-highlights project-modal-highlights">
            {details.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

        {notesHtml ? (
          <div className="project-notes" dangerouslySetInnerHTML={{ __html: notesHtml }} />
        ) : null}
      </Modal.Body>

      <Modal.Footer className="project-modal-footer">
        <div className="project-modal-links">
          {ghLink ? (
            <Button variant="primary" href={ghLink} target="_blank" rel="noreferrer">
              <BsGithub /> &nbsp;GitHub
            </Button>
          ) : null}

          {demoLink ? (
            <Button
              variant="primary"
              href={demoLink}
              target="_blank"
              rel="noreferrer"
              className={ghLink ? "project-link-spaced" : undefined}
            >
              <CgWebsite /> &nbsp;Demo
            </Button>
          ) : null}
        </div>

        <Button variant="secondary" onClick={onHide} className="project-modal-close">
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
