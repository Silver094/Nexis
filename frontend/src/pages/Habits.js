import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import useAxios from "../hooks/useAxios";
const Habits = () => {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const { fetchData } = useAxios();

  useEffect(() => {
    const getHabits = async () => {
      const response = await fetchData({
        method: "GET",
        url: "/habits",
        auth: true,
      });
      if (response.data) {
        setHabits(response.data);
      } else {
        console.error("Error fetching habits:", response.error);
      }
    };

    getHabits();
    // eslint-disable-next-line
  }, []);

  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (habit.trim() !== "") {
      const { data, statusCode } = await fetchData({
        method: "POST",
        url: "/habits",
        options: { data: { name: habit } },
        auth: true,
      });

      if (statusCode === 409) alert("Habit already added");
      if (data) {
        setHabits(data.habits);
        setHabit("");
      } else {
        console.error("Error adding habit:");
      }
    }
  };

  const handleUpdate = async (habitName) => {
    const response = await fetchData({
      method: "PUT",
      url: `/habits/${habitName}`,
      auth: true,
    });

    if (response.data) {
      alert("Habit updated!");
      setHabits(response.data.habits);
    } else {
      alert("Failed to update");
    }
  };

  const handleDelete = async (habitName) => {
    const response = await fetchData({
      method: "DELETE",
      url: `/habits/${habitName}`,
      auth: true,
    });
    if (response.data) {
      alert("Habit deleted!");
      setHabits(response.data.habits);
    } else {
      alert("Failed to delete");
    }
  };

  return (
    <Card className="p-4 shadow">
      <h4>My Habits</h4>
      <Form onSubmit={handleAddHabit}>
        <Form.Control
          type="text"
          placeholder="Enter a habit"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
          required
        />
        <Button type="submit" variant="success" className="mt-2">
          <FaPlusCircle /> Add Habit
        </Button>
      </Form>
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
    </Card>
  );
};

export default Habits;
