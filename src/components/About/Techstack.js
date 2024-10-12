import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiPython,
  DiJavascript1,
  DiJava,

  DiDjango,
  

  DiReact,
  // DiNodejs,
  DiMongodb,
} from "react-icons/di";

import {
  SiExpress,
  // SiNextdotjs,
  SiNodedotjs,

  SiHtml5,
  SiCss3,
  
  SiPostgresql,
  SiFlask,

  SiC,
  SiNumpy,
  SiPandas,
} from "react-icons/si";

function Techstack() {
  // design
  const xs = 4
  const md = 3

  // skills
  const skills = [
    <DiReact/>,
    <SiNodedotjs/>,
    <SiExpress/>,
    
    <DiDjango/>,
    <SiPostgresql/>,
    <DiMongodb/>,

    <SiHtml5/>,
    <SiCss3/>,
    <DiJavascript1/>,
    
    <DiPython/>,
    <DiJava/>,
    <SiC/>,

    <SiNumpy/>,
    <SiPandas/>,
    <SiFlask/>,

  ]

  // component
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {
        skills.map((skill) => (
          <Col xs={xs} md={md} className="tech-icons">
            {skill}
          </Col>
        ))
      }
      
    </Row>
  );
}

export default Techstack;
