import { useEffect, useState } from "react";
import Lyout from "../components/lyout/Lyout";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Input, Button, message } from "antd";
import { motion } from "framer-motion";

function ToDoList() {
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const { user } = useSelector((state) => state.user);
  const userId = user._id;
  const handleAddTodo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/tasks/${userId}/addTask`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            title: newTitle,
            description: newDesc,
            userId: user._id,
          }),
        }
      );
      const newTask = await response.json();
      setTodos([...allTodos, newTask]);
      fetchTodos();
      message.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      message.error("Failed to add task.");
    }
  };

  const handleDeleteToDo = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3000/api/tasks/deleteTask/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setTodos(allTodos.filter((task) => task._id !== id));
      message.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      message.error("Failed to delete task.");
    }
  };

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/tasks/${userId}/getTasks`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await response.json();
      setTodos(data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Lyout>
      <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            To-Do List
          </h1>
          <div className="mb-6 flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 mb-4 md:mb-0">
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Task Title"
                className="mb-2"
                size="large"
              />
              <Input
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Task Description"
                className="mb-4"
                size="large"
              />
              <Button
                type="primary"
                onClick={handleAddTodo}
                className="w-full"
                size="large"
              >
                Add Task
              </Button>
            </div>
          </div>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {allTodos.map((item) => (
              <motion.div
                key={item._id}
                className="bg-white p-3 rounded-lg shadow-md flex justify-between items-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className=" mt-6">
                  <h3 className="text-xl mb-4 font-semibold text-gray-800">
                    {item.title}
                  </h3>

                  <p className="text-gray-600">{item.description}</p>
                </div>
                <Button
                  type="text 
                  "
                  className="text-3xl"
                  icon={<AiOutlineDelete />}
                  onClick={() => handleDeleteToDo(item._id)}
                  danger
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Lyout>
  );
}

export default ToDoList;
