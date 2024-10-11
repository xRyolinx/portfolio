import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";
import projectsJSON from './projects.json'

function Projects() {
  const projects = projectsJSON["projects"]
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
              <Col md={4} className="project-card">
                <ProjectCard
                  imgPath={project.img}
                  isBlog={false}
                  title={project.title}
                  description={project.description}
                  ghLink={project.github}
                  demoLink={project.demo}
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
