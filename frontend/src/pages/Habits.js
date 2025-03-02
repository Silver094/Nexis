import React, { useEffect, useState } from "react";
import { Card, Form, Button, ListGroup, Badge } from "react-bootstrap";
import { FaPlusCircle, FaCheck, FaTrash } from "react-icons/fa";
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
      <h4 className="mb-3">🌱 My Habits</h4>
      <Form onSubmit={handleAddHabit} className="d-flex gap-2 flex-wrap">
        <Form.Control
          type="text"
          placeholder="Enter a habit..."
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
          required
          className="flex-grow-1"
        />
        <Button type="submit" variant="success">
          <FaPlusCircle /> Add
        </Button>
      </Form>

      {habits?.length > 0 ? (
        <ListGroup variant="flush" className="mt-3">
          {habits.map((habit, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 px-3 py-2"
            >
              {/* Habit Name */}
              <div className="flex-grow-1 text-center text-md-start">
                <strong className="text-primary">
                  {habit.name.charAt(0).toUpperCase() + habit.name.slice(1)}
                </strong>
              </div>

              {/* Streak Badge */}
              <Badge
                bg={
                  habit.streak >= 10
                    ? "success"
                    : habit.streak >= 5
                    ? "warning"
                    : "info"
                }
                className="px-3 py-2 rounded-pill text-center"
                style={{
                  fontSize: "0.9rem",
                  minWidth: "110px",
                }}
              >
                🔥 {habit.streak} Days
              </Badge>

              {/* Action Buttons */}
              <div className="d-flex gap-2">
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => handleUpdate(habit.name)}
                >
                  <FaCheck />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(habit.name)}
                >
                  <FaTrash />
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="text-center mt-3">No habits added yet. Start tracking! 🚀</p>
      )}
    </Card>
  );
};

export default Habits;
