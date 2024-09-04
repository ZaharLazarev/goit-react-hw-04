import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from './ImageGallery.module.css'
import clsx from 'clsx';
export default function ImageGallery({images,onImageClick}){
    return(
      <div className={clsx(css.imageGallery)}>
            <ul className={clsx(css.imageList)}>
               {images.map((image)=>(
                 <li className={clsx(css.imageListElement)} key={image.id}>
                   <ImageCard onImageClick={onImageClick} images={image}/>
                </li>
  ))}
            </ul>
      </div>
            )

}