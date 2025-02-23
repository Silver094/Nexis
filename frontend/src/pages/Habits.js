import React, { useEffect, useState } from "react";
import { Card, Form, Button, ListGroup } from "react-bootstrap";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { fetchHabits, addHabit, deleteHabit } from "../services/api"; // Import the necessary API functions

const Habits = () => {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const getHabits = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await fetchHabits(token);
        setHabits(response.data);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };

    getHabits();
  }, []);

  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (habit.trim() !== "") {
      try {
        const token = localStorage.getItem("token");
        await addHabit(token, { name: habit });
        setHabits([...habits, habit]);
        setHabit("");
      } catch (error) {
        console.error("Error adding habit:", error);
      }
    }
  };

  const handleDeleteHabit = async (habitName) => {
    try {
      const token = localStorage.getItem("token");
      setHabits(habits.filter((h) => h !== habitName));
      await deleteHabit(token, habitName);
    } catch (error) {
      console.error("Error deleting habit:", error);
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
      <ListGroup className="mt-3">
        {habits.map((h, idx) => (
          <ListGroup.Item key={idx} className="d-flex justify-content-between">
            {h.name}
            <FaTrash
              className="text-danger"
              role="button"
              onClick={() => handleDeleteHabit(h)}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default Habits;
