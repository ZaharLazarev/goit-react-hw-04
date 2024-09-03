import axios from "axios"
export const fetchImages=async(value,page,totalPages)=>{
  const response=await axios.get(`https://api.unsplash.com/search/photos`,{
    params:{
      client_id:'BA4p3wZYoVVQnQ7CSFgpmD-7noZWD5xhR16ZoY4I0ZE',
      query:value,
      page:page,
      per_page:15,
      total_pages:totalPages
    },
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
}