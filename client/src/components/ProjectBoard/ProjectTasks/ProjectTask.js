import React from 'react';
import {Pencil, Trash} from 'react-bootstrap-icons';

export default function ProjectTask({task}) {
  return (
    <div className="task">
      <div className="task-body">
        <span className={`status ${task.priority.toLowerCase()}`}></span>
        <p>{task.summary}</p>
      </div>

      <div className="task-actions">
        <Pencil />
        <Trash />
      </div>
    </div>
  );
}
