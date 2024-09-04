import React, { useEffect, useState } from "react";
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import {fetchImages} from './images';
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Modal from 'react-modal'; 
import Loader from "../Loader/Loader";
import toast, { Toaster } from 'react-hot-toast';

Modal.setAppElement('#root');

function App() {
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(999);
  const [selectedImage, setSelectedImage] = useState(null);
  
  useEffect(() => {
    if (search.trim() === "") {
      return;
    }

    async function getImages() {
      try {
        setLoading(true);
        setError(false);
        const { results, totalPages } = await fetchImages(search, page);
        setImages(prevState => page === 1 ? results : [...prevState, ...results]);
        setTotalPages(totalPages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, [page, search]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPages(1);
    setImages([]);
    setSearch(inputValue);  
  }

  const changePages = () => {
    if (page < totalPages) {
      setPages(prevPage => prevPage + 1);
    } else {
      toast('No more pages to load!');
    }
  }

  return (
    <>
      <Toaster />
      <SearchBar 
        onSubmit={handleSubmit} 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
      />
      {error && <ErrorMessage />}
      {images.length > 0 && <ImageGallery onImageClick={(image) => setSelectedImage(image)} images={images} />}
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMoreBtn changePages={changePages} />}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  )
}

export default App;
