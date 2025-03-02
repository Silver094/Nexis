import React from "react";
import { Container, Row } from "react-bootstrap";
import Habits from "./Habits";
import Insights from "./Insights";

const Dashboard = () => {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Your Dashboard</h2>
      <Row>
        <Habits />
      </Row>
      <Row className="mt-4">
        <Insights />
      </Row>
      {/* <Row className="mt-4">
        <Col>
          <Progress />
        </Col>
      </Row> */}
    </Container>
  );
};

export default Dashboard;
