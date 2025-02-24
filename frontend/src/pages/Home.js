import React from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaChartLine, FaLightbulb, FaCheckCircle } from "react-icons/fa";

const Home = () => {
  return (
    <Container className="text-center mt-5">
      {/* Hero Section */}
      <Row className="align-items-center">
        <Col >
          <h1 className="fw-bold">Achieve Your Goals with Nexis</h1>
          <p className="lead">
            Stay consistent, track your progress, and let AI guide your journey towards better habits.
          </p>
          <Link to={localStorage.getItem('token')?"/dashboard":"/register"}>
            <Button variant="primary" size="lg">Get Started</Button>
          </Link>
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="mt-5">
        <Col md={4}>
          <Card className="p-3 shadow">
            <FaChartLine size={40} className="mb-3 text-primary" />
            <h5>Progress Tracking</h5>
            <p>Monitor your habits with insightful statistics and trend analysis.</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow">
            <FaLightbulb size={40} className="mb-3 text-warning" />
            <h5>AI-Powered Insights</h5>
            <p>Get personalized habit recommendations based on your progress.</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow">
            <FaCheckCircle size={40} className="mb-3 text-success" />
            <h5>Build Consistency</h5>
            <p>Develop strong habits with reminders and positive reinforcement.</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
