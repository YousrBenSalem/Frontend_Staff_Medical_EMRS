import { useEffect, useState } from "react";
import Lyout from "../components/lyout/Lyout";
import { AiOutlineDelete } from "react-icons/ai";

function ToDoList() {
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const handleAddTodo = () => {
    let newToDoItem = {
      title: newTitle,
      description: newDesc,
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newToDoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };
  const handleDeleteToDo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);

    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  useEffect(() => {
    let savedTodoList = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodoList) {
      setTodos(savedTodoList);
    }
  }, []);
  return (
    <Lyout>
      <div className="todo-wrapper text-center overflow-y-auto bg-slate-100 p-10 rounded-lg shadow-2xl w-fit ml-auto mr-auto mt-3 min-h-max grid grid-cols-1  ">
        <div className="todo-input flex items-center justify-center border-b-2 border-gray-300 pb-4 mr-4 ">
          <div className="to-input-item flex flex-col	items-start mr-6 sm ">
            <label htmlFor="TitleInput" className="font-bold mb-3">
              Title
            </label>
            <input
              className="p-3 w-96 "
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title ?"
              name=""
              id="TitleInput"
            />
          </div>
          <div className="to-input-item flex flex-col	items-start mr-6">
            <label className="font-bold mb-3" htmlFor="DescInput">
              Description
            </label>
            <input
              className="p-3 w-96"
              type="text"
              placeholder="What's the task description ?"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              name=""
              id="DescInput"
            />
          </div>
          <div className="to-input-item flex flex-col	items-start mr-6">
            <button
              onClick={() => handleAddTodo(newTitle, newDesc)}
              type="button"
              className="primaryBtn bg-primaryColor text-white border-none outline-offset-0 p-3 w-16 cursor-pointer hover:bg-primary-500 "
            >
              Add
            </button>
          </div>
        </div>

        <div className="todo-list flex  flex-col mt-2">
          {allTodos.map((item, index) => {
            return (
              <div
                className="todo-list-item  bg-slate-300 flex justify-between items-center p-6 pb-3 pt-3 mb-3  "
                key={index}
              >
                <div>
                  <h3 className="font-bold text-2xl	 text-primaryColor m-0 ">
                    {item.title}
                  </h3>
                  <p className=" font-semibold text-base  text-headingColor mt-6 m-0">
                    {item.description}
                  </p>
                </div>
                <div>
                  <AiOutlineDelete
                    onClick={() => handleDeleteToDo(index)}
                    className="text-4xl cursor-pointer hover:text-red-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Lyout>
  );
}

export default ToDoList;
