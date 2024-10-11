import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <div style={{height:"100%", display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
        <div>
        <Card.Title className="main-name">{props.title}</Card.Title>
        <Card.Text dangerouslySetInnerHTML={{__html: props.description}} style={{ textAlign: "justify" }}>
          
        </Card.Text>
        </div>

        <div style={{paddingTop: '20px'}}>
        {props.ghLink && (
          <Button variant="primary" href={props.ghLink} target="_blank">
            <BsGithub /> &nbsp;
            GitHub
          </Button>
        )}
        {"\n"}
        {"\n"}
        {props.demoLink && (
          <Button
            variant="primary"
            href={props.demoLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
          >
            <CgWebsite /> &nbsp;
            {"Demo"}
          </Button>
        )}
        </div>
        </div>
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
