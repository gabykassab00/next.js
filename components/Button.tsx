import React from 'react'

type buttonprops={
    type:'button' | 'submit' | 'reset',
    title:string,
    icon?:string,
    variant:''
}


const Button = ({type,title,icon,variant}:buttonprops) => {
  return (
    <button></button>
  )
}

export default Button
