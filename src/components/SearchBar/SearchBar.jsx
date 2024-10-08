import React from "react"
import toast, { Toaster } from 'react-hot-toast';
import css from "./SearchBar.module.css"
import clsx from "clsx"
export default function SearchBar({value, onChange, onSubmit}){
  return(
<header className={clsx(css.SearchBar)}>
  <Toaster/>
  <form className={clsx(css.SearchBarForm)} 
        onSubmit={(event) => {
          event.preventDefault();
          if (value.trim() === "") {
            toast('Please enter this field!');
            return;
          }
          onSubmit(event); 
        }}>
    <input
      name="search"
      className={clsx(css.SearchBarInput)}
      value={value}
      onChange={onChange}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
    <button className={clsx(css.SearchBarButton)} type="submit">Search</button>
  </form>
</header>
)
}