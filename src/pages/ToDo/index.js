import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import Calendar from "../../components/Calendar";
import ToDoList from "../../components/ToDoList";
import { DashboardContext } from "../Dashboard";
import "./index.css";

export const TodoContext = React.createContext();

const ToDO = () => {
  const [input, setInput] = useState("");
  const [agenda, setAgenda] = useState();
  const myContext = useContext(DashboardContext);

  const newTask = async () => {
    try {
      if (input) {
        const response = await axios.post(
          "https://todolist-nam-back.herokuapp.com/agenda/create",
          {
            date: myContext.state.selectedDate,
            title: input
          },
          { headers: { authorization: `Bearer ${myContext.state.token}` } }
        );
        setAgenda(response.data);
        setInput("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const newTaskEnter = e => {
    if (e.key === "Enter") {
      return newTask();
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://todolist-nam-back.herokuapp.com/agenda",
        {
          headers: { authorization: `Bearer ${myContext.state.token}` }
        }
      );
      setAgenda(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line
  }, []);

  return (
    <TodoContext.Provider
      value={{
        agenda: agenda,
        setAgenda: setAgenda
      }}
    >
      {myContext.state.selectedDate && (
        <Redirect to={"/dashboard/todolist/" + myContext.state.selectedDate} />
      )}
      <div className="todo-container">
        <Calendar />
        <div className="todo-input-container">
          <div className="todo-title">Tasks of the day</div>
          <div className="todo-input-wrapper">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => newTaskEnter(e)}
            />
            <div onClick={newTask}>+</div>
          </div>
        </div>

        <Route
          path="/dashboard/todolist/:date"
          render={props => {
            return <ToDoList match={props.match} />;
          }}
        />
      </div>
    </TodoContext.Provider>
  );
};

export default ToDO;
