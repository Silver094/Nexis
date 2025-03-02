import React, { useState, useEffect } from "react";
import { Card, ProgressBar, Alert } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxios from "../hooks/useAxios";

const Progress = () => {
  const { fetchData } = useAxios();
  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    const getProgress = async () => {
      const { data } = await fetchData({
        method: "GET",
        url: "/api/progress",
        auth: true,
      });
      if (data) {
        setProgressData(data.progress);
      } else {
        console.error("Error fetching progress data");
      }
    };
    getProgress();
    // eslint-disable-next-line
  }, []);

  return (
    <Card className="p-4 shadow">
      <h4>📈 Habit Progress</h4>
      <p>Track your progress over time with AI-powered insights.</p>

      {progressData ? (
        <>
          <h5>Overall Progress</h5>
          <ProgressBar
            now={progressData.overall_completion}
            label={`${progressData.overall_completion}%`}
            variant="success"
            className="mb-3"
          />

          <h5>Streak Trends</h5>
          {progressData.streak_trends.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData.streak_trends}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="streak"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="Daily Streak"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Alert variant="info">No streak data available yet.</Alert>
          )}
        </>
      ) : (
        <p>Loading progress data...</p>
      )}
    </Card>
  );
};

export default Progress;
