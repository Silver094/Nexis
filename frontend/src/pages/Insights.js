import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaLightbulb } from "react-icons/fa";

const Insights = () => {
  return (
    <Card className="p-4 shadow">
      <h4>AI-Powered Insights</h4>
      <p>
        Get personalized habit recommendations based on your consistency and performance.
      </p>
      <Button variant="info">
        <FaLightbulb /> View Detailed Insights
      </Button>
    </Card>
  );
};

export default Insights;
