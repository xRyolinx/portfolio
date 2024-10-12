import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
} from "react-icons/si";

import {
  DiGit,
} from "react-icons/di";


function Toolstack() {
  // design
  const xs = 4
  const md = 2

  // tools
  const tools = [
    <SiVisualstudiocode/>,
    <DiGit/>,
    <SiPostman/>,

  ]

  // component
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {
        tools.map((tool) => (
          <Col xs={xs} md={md} className="tech-icons">
            { tool }
          </Col>
        ))
      }
    </Row>
  );
}

export default Toolstack;
