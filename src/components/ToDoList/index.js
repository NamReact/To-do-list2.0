import React, { useContext } from "react";
import { TodoContext } from "../../pages/ToDo";
import { DashboardContext } from "../../pages/Dashboard";
import axios from "axios";
import "./index.css";

const ToDoList = props => {
  const context = useContext(TodoContext);
  const dbContext = useContext(DashboardContext);
  let thisDateList;

  if (context.agenda) {
    for (let i = 0; i < context.agenda.pages.length; i++) {
      if (context.agenda.pages[i].date === props.match.params.date) {
        thisDateList = context.agenda.pages[i].tasks.map(task => {
          return task;
        });
        break;
      }
    }
  }
  let listDisplay = null;

  const deleteTask = async e => {
    const id = e.target.id;
    const response = await axios.post(
      "http://localhost:3001/agenda/delete/task",
      {
        date: props.match.params.date,
        id: id
      },
      { headers: { authorization: `Bearer ${dbContext.state.token}` } }
    );
    context.setAgenda(response.data);
  };

  const taskDone = async e => {
    const id = e.target.id;
    const response = await axios.post(
      "http://localhost:3001/agenda/update/task",
      {
        date: props.match.params.date,
        id: id
      },
      { headers: { authorization: `Bearer ${dbContext.state.token}` } }
    );
    context.setAgenda(response.data);
  };

  if (thisDateList) {
    listDisplay = thisDateList.map(({ title, _id, done }) => {
      return (
        <div key={_id} className="todolist-task">
          <div
            className="todolist-delete-button"
            id={_id}
            onClick={e => deleteTask(e)}
          >
            delete
          </div>
          <div id={_id} onClick={e => taskDone(e)}>
            done
          </div>
          <div className={done ? "todolist-done" : null}>{title}</div>
        </div>
      );
    });
  }

  return (
    <div className="todolist-container">
      <div className="todolist-tasks-container">{listDisplay}</div>
    </div>
  );
};

export default ToDoList;
