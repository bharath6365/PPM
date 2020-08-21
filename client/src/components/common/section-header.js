import React from 'react'

export default function SectionHeader({heading, buttonHeading, handleClick}) {
  return (
    <div className="section-header">
        <h2>{heading}</h2>
        <button onClick={handleClick} className="create-button float-right">
        <span className="text">{buttonHeading}</span>
          <svg
            class="bi bi-plus"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
    </div>
  )
}
