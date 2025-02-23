import React from "react";
import { updateHabit, deleteHabit } from "../services/api";

const HabitList = ({ habits }) => {
  const token = localStorage.getItem("token");

  const handleUpdate = (habitName) => {
    updateHabit(token, habitName)
      .then(() => alert("Habit updated!"))
      .catch(() => alert("Failed to update"));
  };

  const handleDelete = (habitName) => {
    deleteHabit(token, habitName)
      .then(() => alert("Habit deleted!"))
      .catch(() => alert("Failed to delete"));
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Habit</th>
          <th>Streak</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {habits.map((habit, index) => (
          <tr key={index}>
            <td>{habit.name}</td>
            <td>{habit.streak}</td>
            <td>
              <button onClick={() => handleUpdate(habit.name)}>✅</button>
              <button onClick={() => handleDelete(habit.name)}>❌</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HabitList;
