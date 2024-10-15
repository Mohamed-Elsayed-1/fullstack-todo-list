import React from 'react'

export const Button = ({title,buttonWidth,...rest}) => {
  return (
    <button className='bg-indigo-600 text-white text-lg block p-3 rounded-lg w-full mx-auto' style={{width:buttonWidth}} {...rest}>{title}</button>
  )
}
