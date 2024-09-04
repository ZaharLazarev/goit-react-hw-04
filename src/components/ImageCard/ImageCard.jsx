import React from "react"
import clsx from 'clsx';
import css from "./ImageCard.module.css"
export default function ImageCard({images,onImageClick}){

  return(
    <div>
       <img width="400px" height="300px" className={clsx(css.image)} src={images.urls.small} alt={images.alt_description} onClick={() => onImageClick(images)}  style={{ cursor: 'pointer' }} />
    </div>

  )
}