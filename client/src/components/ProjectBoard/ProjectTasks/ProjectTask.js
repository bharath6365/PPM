import React from 'react';
import {Pencil, Trash} from 'react-bootstrap-icons';
import DueDate from '../../common/due-date';


const deleteConfirm = (e,projectIdentifier, projectSeqeunce, handleDelete) => {
  e.stopPropagation();
  const shouldDelete = window.confirm("Are you sure you want to delete this task?");
  if (shouldDelete) {
    handleDelete(projectIdentifier, projectSeqeunce);
  }
}

const handleClick = (projectIdentifier, projectSequeunce, handleUpdate) => {

  handleUpdate(projectIdentifier, projectSequeunce);
}

export default function ProjectTask({task, handleUpdate, handleDelete}) {
  return (
    <div className="task" style={{
      cursor: 'pointer'
    }} onClick={(e) => handleClick(task.projectIdentifier, task.projectSeqeunce, handleUpdate)}>
      <div className="task-body">
        <span className={`status ${task.priority.toLowerCase()}`}></span>
        <p>{task.summary}</p>
        {
          task.dueDate && (
            <DueDate date={task.dueDate} />
          )
        }
      </div>

      <div className="task-actions">
        {/* Pass on the update task to the parent. */}
        <Pencil onClick={() => handleUpdate(task.projectIdentifier, task.projectSeqeunce)} />
        <Trash className="delete-task-icon" onClick={(e) => deleteConfirm(e,task.projectIdentifier, task.projectSeqeunce, handleDelete)}/>
      </div>
    </div>
  );
}
