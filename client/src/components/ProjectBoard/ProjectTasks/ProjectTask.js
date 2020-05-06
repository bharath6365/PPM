import React from 'react';
import {Pencil, Trash} from 'react-bootstrap-icons';

export default function ProjectTask({task}) {
  return (
    <div className="task">
      <div className="task-body">
        <p>{task.summary}</p>
        <span className="status">{task.priority.toLowerCase()}</span>
      </div>

      <div className="task-actions">
        <Pencil />
        <Trash />
      </div>
    </div>
  );
}
