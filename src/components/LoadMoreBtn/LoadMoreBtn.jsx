import React from "react"
export default function LoadMoreBtn({changePages}){
  return(
    <div>
      <button onClick={changePages}>Load more</button>
    </div>
  )
}