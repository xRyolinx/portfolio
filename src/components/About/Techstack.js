import React from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiGit,
  DiJava,
} from "react-icons/di";
import {
  SiRedis,
  SiFirebase,
  SiNextdotjs,
  SiSolidity,
  SiPostgresql,
} from "react-icons/si";
import { TbBrandGolang } from "react-icons/tb";

function Techstack() {
  const xs = 4
  const md = 3
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={xs} md={md} className="tech-icons">
        <DiJavascript1 />
      </Col>
      <Col xs={xs} md={md} className="tech-icons">
        <DiReact />
      </Col>
      <Col xs={xs} md={md} className="tech-icons">
        <DiNodejs />
      </Col>
      <Col xs={xs} md={md} className="tech-icons">
        <DiMongodb />
      </Col>
      <Col xs={xs} md={md} className="tech-icons">
        <SiNextdotjs />
      </Col>
      <Col xs={xs} md={md} className="tech-icons">
        <SiPostgresql />
      </Col>
      <Col xs={xs} md={md} className="tech-icons">
        <DiPython />
      </Col>
      <Col xs={xs} md={md} className="tech-icons">
        <DiGit />
      </Col>
      <Col xs={xs} md={md} className="tech-icons">
        <CgCPlusPlus />
      </Col>
    </Row>
  );
}

export default Techstack;
