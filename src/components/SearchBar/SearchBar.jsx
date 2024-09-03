import React from "react"
import css from "./SearchBar.module.css"
import clsx from "clsx"
export default function SearchBar({value, onChange, onSubmit}){
  return(
<header className={clsx(css.SearchBar)}>
  <form className={clsx(css.SearchBarForm)} onSubmit={onSubmit}>
    <input
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