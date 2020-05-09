import React from 'react';
import {Pencil, Trash} from 'react-bootstrap-icons';


const deleteConfirm = (projectIdentifier, projectSeqeunce, handleDelete) => {
  const shouldDelete = window.confirm("Are you sure you want to delete this task?");
  if (shouldDelete) {
    handleDelete(projectIdentifier, projectSeqeunce);
  }
}

export default function ProjectTask({task, handleUpdate, handleDelete}) {
  return (
    <div className="task" style={{
      cursor: 'pointer'
    }} onDoubleClick={() => handleUpdate(task.projectIdentifier, task.projectSeqeunce)}>
      <div className="task-body">
        <span className={`status ${task.priority.toLowerCase()}`}></span>
        <p>{task.summary}</p>
      </div>

      <div className="task-actions">
        {/* Pass on the update task to the parent. */}
        <Pencil onClick={() => handleUpdate(task.projectIdentifier, task.projectSeqeunce)} />
        <Trash onClick={() => deleteConfirm(task.projectIdentifier, task.projectSeqeunce, handleDelete)}/>
      </div>
    </div>
  );
}
