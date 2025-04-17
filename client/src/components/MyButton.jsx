import React from 'react'

const MyButton = ({text ,className = "",onClick,disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`${
        disabled
          ? "bg-gray-700 cursor-not-allowed"
          : "bg-[#B67B0F] cursor-pointer"
      } text-[#FBFBFB] rounded-[31px] ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default MyButton