import React from 'react'
import { Link } from 'react-router-dom'
const LinkItem = ({text,linkText,forwardTo}) => {
  return (
    <>
     <div>
     {text}
      <Link to={forwardTo} >
        {linkText}
     </Link>
     </div>
     
    </>
  )
}

export default LinkItem
