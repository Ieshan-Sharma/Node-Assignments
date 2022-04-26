import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Book } from './Book'
import { Appbar } from './Appbar'

export const Dashboard = () => {
  const data = sessionStorage.getItem("token")
  const [bookData, setBookData] = useState([])
  const [render, setRender] = useState(true)

  useEffect(() => {
    axios.get("http://localhost:5000/book"
      , {
        headers: {
          Authorization: "Bearer " + data,
        },
      })
      .then((res) => setBookData(res.data))
      .catch((err) => console.log(err));
  }, [data, render])

  const removeHandler = async (id) => {
    await axios
      .delete(`http://localhost:5000/book/${id}`, {
        headers: {
          Authorization: "Bearer " + data,
        },
      })
      .then((res) => {
        alert("delete");
        const filterBook = bookData.filter((book) => book._id !== id);
        setBookData(filterBook);
      });
    setRender(!render)
  };

  return (
    <div>
      <Appbar />
      <Book data={bookData}
        removeHandler={removeHandler} />
    </div>
  )
}
