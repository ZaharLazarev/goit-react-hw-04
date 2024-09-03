import React from "react"
import clsx from 'clsx';
import css from "./ImageCard.module.css"
export default function ImageCard({user,onImageClick}){

  return(
    <div>
       <img width="400px" height="300px" className={clsx(css.image)} src={user.urls.small} alt={user.alt_description} onClick={() => onImageClick(user)}  style={{ cursor: 'pointer' }} />
    </div>

  )
}