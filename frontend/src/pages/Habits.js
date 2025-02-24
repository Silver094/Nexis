import React, { useEffect, useState } from "react";
import { Card, Form, Button, ListGroup } from "react-bootstrap";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
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
      const response = await fetchData({
        method: "POST",
        url: "/habits",
        options: { data: { name: habit } },
        auth: true,
      });
      if (response.data) {
        setHabits([...habits, response.data]);
        setHabit("");
      } else {
        console.error("Error adding habit:", response.error);
      }
    }
  };

  const handleDeleteHabit = async (habitToDelete) => {
    const response = await fetchData({
      method: "DELETE",
      url: `/habits/${habitToDelete.id}`,
      auth: true,
    });
    if (response.statusCode === 200) {
      setHabits(habits.filter((h) => h.id !== habitToDelete.id));
    } else {
      console.error("Error deleting habit:", response.error);
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
