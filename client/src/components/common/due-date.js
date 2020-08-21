import React from 'react'
import ReactTimeAgo from 'react-time-ago'
 
export default function DueDate({ date }) {
  return (
    <div className="due-date">
      Due <ReactTimeAgo date={date}/>
    </div>
  )
}