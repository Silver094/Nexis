import React from "react";
import { Card } from "react-bootstrap";
import { FaChartLine } from "react-icons/fa";

const Progress = () => {
  return (
    <Card className="p-4 shadow">
      <h4>Progress Overview</h4>
      <p>Visualize your habit streaks and trends.</p>
      <FaChartLine size={50} className="text-primary" />
    </Card>
  );
};

export default Progress;
