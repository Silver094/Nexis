import React, { useState, useEffect } from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import { FaLightbulb } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxios from "../hooks/useAxios";

const Insights = () => {
  const { fetchData } = useAxios();
  const [insights, setInsights] = useState(null);

  const getInsights = async () => {
    const { data } = await fetchData({
      method: "GET",
      url: "/api/insights",
      auth: true,
    });
    if (data) {
      setInsights(data.insights);
    } else {
      console.error("Error fetching insights");
    }
  };
  useEffect(() => {
    getInsights();
    // eslint-disable-next-line
  }, []);

  return (
    <Card className="p-4 shadow">
      <h4>📊 AI-Powered Insights</h4>
      <p>Get personalized habit analysis based on your progress.</p>

      {insights ? (
        <>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Total Habits:</strong> You’re tracking{" "}
              {insights.total_habits} habits. Keep up the momentum! 🚀
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Average Streak:</strong> On average, you stick to your
              habits for {insights.average_streak} days. Solid consistency! 🔄
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Longest Streak:</strong> Your longest streak is{" "}
              {insights.longest_streak} days. Amazing dedication! 🎯
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Predicted Next Streak:</strong> Based on your progress,
              your next streak could be {insights.predicted_next_streak} days.
              Keep pushing! 📈
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>AI Suggestion:</strong> {insights.cluster_suggestion}. A
              smart tip to improve your habits! 💡
            </ListGroup.Item>
          </ListGroup>

          {Array.isArray(insights?.anomalous_habits) &&
          insights?.anomalous_habits?.length > 0 ? (
            <>
              <p>
                🚨 <strong>Oops! Some habits need attention:</strong>
              </p>
              <ul>
                {insights.anomalous_habits.map((habit, index) => (
                  <li key={index}>
                    ⚠️ <strong>{habit}</strong> – Try getting back on track! 💪
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>✅ No anomalies detected – You’re on a great streak! 🎉</p>
          )}

          {/* Habit Visualization */}
          <div className="mt-4">
            <h5>📈 Habit Progress</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[insights]}>
                <XAxis dataKey="total_habits" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="average_streak"
                  fill="#8884d8"
                  name="Avg Streak"
                />
                <Bar
                  dataKey="longest_streak"
                  fill="#82ca9d"
                  name="Longest Streak"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <Button variant="info" className="mt-3" onClick={getInsights}>
            <FaLightbulb /> Refresh Insights
          </Button>
        </>
      ) : (
        <p>Loading insights...</p>
      )}
    </Card>
  );
};

export default Insights;
