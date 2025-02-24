import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { FaLightbulb } from "react-icons/fa";
import useAxios from "../hooks/useAxios";
const Insights = () => {
  const { fetchData } = useAxios();
  // useEffect(() => {
  //   const getHabits = async () => {
  //     const response = await fetchData({
  //       method: "GET",
  //       url: "/api/insights",
  //       auth: true,
  //     });
  //     if (response.data) {
  //       setHabits(response.data);
  //     } else {
  //       console.error("Error fetching habits:", response.error);
  //     }
  //   };

  //   getHabits();
  //   // eslint-disable-next-line
  // }, []);
  return (
    <Card className="p-4 shadow">
      <h4>AI-Powered Insights</h4>
      <p>
        Get personalized habit recommendations based on your consistency and
        performance.
      </p>
      <Button variant="info">
        <FaLightbulb /> View Detailed Insights
      </Button>
    </Card>
  );
};

export default Insights;
