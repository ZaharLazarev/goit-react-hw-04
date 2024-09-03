import React from "react"
import { useEffect, useState } from "react";
import './App.css'
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar'
import {fetchImages} from './images'
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn"
import ImageModal from "../ImageModal/ImageModal"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import Modal from 'react-modal'; 
import Loader from "../Loader/Loader"

Modal.setAppElement('#root');
function App() {
  const [search, setSearch]=useState("");
  const [user,setUser]=useState([]);
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
      setUser((prevState)=>[...prevState, ...results]);
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
    getImages()
  },[page])


  const handleSubmit=(event)=>{
    event.preventDefault();
    if (search.trim()===""){
      toast('Please enter this field!');
      return;
    }
    setPages(1);
    setUser([]);
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
      <Toaster />
      <SearchBar onSubmit={handleSubmit} value={search} onChange={onChange} />
      {error&&<ErrorMessage/>}
      {user.length>0&&<ImageGallery onImageClick={(image) => setSelectedImage(image)} user={user}/>}
      {loading&& <Loader/>}
      {user.length>0&&!loading&&<LoadMoreBtn changePages={changePages} />}
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
