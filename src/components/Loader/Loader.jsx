import { Circles } from 'react-loader-spinner'
import css from "./Loader.module.css"
import clsx from 'clsx'
export default function Loader(){
  return(
    <div className={clsx(css.Loader)}>
       <Circles
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      />
    </div>
  )
}