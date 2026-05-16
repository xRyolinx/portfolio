import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import projectsJSON from "./projects.json";
import { normalizeProjectMedia } from "./projectMedia";

function Projects() {
  const projects = projectsJSON["projects"];
  return (
    <Container id="projects" fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          You will find here the projects I've worked on.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {
            projects.map((project) => (
              <Col md={6} className="project-card" key={project.slug || project.title}>
                <ProjectCard
                  isBlog={false}
                  title={project.title}
                  subtitle={project.subtitle}
                  summary={project.summary}
                  description={project.description}
                  details={project.details}
                  stack={project.stack}
                  media={normalizeProjectMedia(project?.media, project?.video)}
                  notesHtml={project.notesHtml}
                  ghLink={project?.links?.github ?? project.github}
                  demoLink={project?.links?.demo ?? project.demo}
                />
              </Col>
            ))
          }
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
