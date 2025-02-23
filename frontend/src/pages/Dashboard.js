import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Habits from "./Habits";
import Insights from "./Insights";
import Progress from "./Progress";

const Dashboard = () => {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Your Dashboard</h2>
      <Row>
        <Col md={6}>
          <Habits />
        </Col>
        <Col md={6}>
          <Insights />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Progress />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
