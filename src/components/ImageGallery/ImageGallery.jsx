import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from './ImageGallery.module.css'
import clsx from 'clsx';
export default function ImageGallery({user,onImageClick}){
    return(
      <div className={clsx(css.imageGallery)}>
            <ul className={clsx(css.imageList)}>
               {user.map((image)=>(
                 <li className={clsx(css.imageListElement)} key={image.id}>
                   <ImageCard onImageClick={onImageClick} user={image}/>
                </li>
  ))}
            </ul>
      </div>
            )

}