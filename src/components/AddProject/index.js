import React, { useState } from "react";
import "./index.css";

const AddProject = () => {
  const [selector, setSelector] = useState(false);
  const [yPosition, setPosition] = useState(0);
  return (
    <div
      className="addproject-block-container"
      onMouseEnter={() => {
        setSelector(true);
        setPosition(
          document.getElementById("add-project").getBoundingClientRect().y
        );
      }}
      onMouseLeave={() => setSelector(false)}
      id="add-project"
    >
      {selector && (
        <div className="navbar-hover-bubble" style={{ top: yPosition + 33 }}>
          <div className="navbar-hover-bubble-arrow" />
          Create new project
        </div>
      )}
      <div className="addproject-block">
        <i className="fas fa-plus" />
      </div>
    </div>
  );
};

export default AddProject;
