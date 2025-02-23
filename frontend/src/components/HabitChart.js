import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const HabitChart = ({ habits }) => {
  // Prepare data for the chart
  const chartData = habits.map((habit) => ({
    name: habit.name,
    streak: habit.streak,
  }));

  return (
    <div className="container">
      <h3>Habit Progress</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="streak" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HabitChart;
