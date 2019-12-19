import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateMovie = props => {
  const [update, setUpdate] = useState(initialMovie);


  useEffect(() => {
      console.log("props.match.params.id", props.match.params.id)
      console.log("update", update)
      axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        setUpdate(res.data);
    //     const movieToEdit = props.movies.find(
    //   e => `{e.id}` === props.match.params.id
    // );
    // console.log(props.movies, movieToEdit);
    // if (movieToEdit) {
    //   setUpdate(movieToEdit);
    // }
      })
      .catch(err => console.log(err));
    
  }, [props.match.params.id]);

  const changeHandler = e => {
    e.persist();
      if(e.target.name === "stars"){
          
          setUpdate(update => ({...update,
             [e.target.name]: e.target.value.split(",")}));
      }
        else {
        setUpdate(update => ({ ...update, [e.target.name]: e.target.value }));
        }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("This is the put request", update)
    axios
      .put(`http://localhost:5000/api/movies/${update.id}`, update)
      .then(res => {
          console.log("res.data after put request", res.data)
        // setUpdate(res.data)
         console.log("stars", update.stars)
         console.log("update.id", update.id)
        props.history.push(`/movies/${update.id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={changeHandler}
          value={update.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          placeholder="Director"
          onChange={changeHandler}
          value={update.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          placeholder="Metascore"
          onChange={changeHandler}
          value={update.metascore}
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars"
          placeholder="Stars"
          onChange={changeHandler}
          value={update.stars}
        />
        <div className="baseline" />

        <button>Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;