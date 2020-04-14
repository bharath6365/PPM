import React from 'react'
import {Link} from 'react-router-dom';

export default function CreateProjectButton() {
  return (
    <div>
      <Link to="/add-project" className="btn btn-lg btn-info">
        Create a Project
      </Link>
    </div>
  )
} 
