import React from "react"
import { useEffect, useState } from "react";
import './App.css'
import SearchBar from '../SearchBar/SearchBar'
import {fetchImages} from './images'
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn"
import ImageModal from "../ImageModal/ImageModal"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import Modal from 'react-modal'; 
import Loader from "../Loader/Loader"
import toast, { Toaster } from 'react-hot-toast';

Modal.setAppElement('#root');
function App() {
  const [search, setSearch]=useState("");
  const [images,setImages]=useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false)
  const [error, setError] = useState(false);
  const [page, setPages]=useState(1);
  const [totalPages, setTotalPages] = useState(999);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const onChange=(event)=>{
    const actualValue=event.target.value;
    setSearch(actualValue);
  }
  async function getImages() {
    try{
      setLoading(true);
      setLoading2(false);
      setError(false);
      const {results,totalPages}=await fetchImages(search,page);
      setImages((prevState)=>[...prevState, ...results]);
      setTotalPages(totalPages);
     }
     catch(error){
       setError(true)
     }
     finally{
      setLoading(false);
     }
  }
  useEffect(() => {
    if (search.trim()==="") {
      return;
    }
  },[page,search])


  const handleSubmit=(event)=>{
    event.preventDefault();
    setSearch("")
    setPages(1);
    setImages([]);
    getImages();
  }
  const changePages=()=>{
    if(page<totalPages){
    setLoading2(true);
    setPages((prevPage)=>prevPage + 1);
    }
    else{
      toast('No more pages to load!');
    }
  }

  return (
    <>
      <Toaster/>
      <SearchBar onSubmit={handleSubmit} value={search} onChange={onChange} />
      {error&&<ErrorMessage/>}
      {images.length>0&&<ImageGallery onImageClick={(image) => setSelectedImage(image)} images={images}/>}
      {loading&& <Loader/>}
      {images.length>0&&!loading&&<LoadMoreBtn changePages={changePages} />}
      {loading2&&<Loader/>}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  )
}

export default App
