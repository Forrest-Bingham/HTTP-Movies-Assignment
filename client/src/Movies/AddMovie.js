import React, { useState, useEffect } from "react";
import axios from "axios";

const newMovie = {
    id: Date.now(),
    title:"",
    director:'',
    metascore:'',
    stars: [],
}

const AddMovie = props => {

    const [deets, setDeets] = useState(newMovie);

    const handleChange = e => {
        setDeets({...deets, [e.target.name]: e.target.value})
    }

    const handleStarsChange = e => {
        setDeets({...deets, [e.target.name]: e.target.value.split(",")})
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log("new movie deets", deets);
        axios.post('http://localhost:5000/api/movies', deets)
        .then(res => {
            console.log(res);
            props.history.push('/');
        })
        .catch(err=> console.log(err));
    }


    return (
        <div>
            <h2>Add a new movie:</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Movie Title"
                    value={deets.title}
                    onChange={handleChange}
                    />
                    <input
                    type="text"
                    name="director"
                    placeholder="Directed by"
                    value={deets.director}
                    onChange={handleChange}
                    />
                    <input
                    type="number"
                    name="metascore"
                    placeholder="Metascore"
                    value={deets.metascore}
                    onChange={handleChange}
                    />

                    <input
                        type={[]}
                        name="stars"
                        placeholder="Stars"
                        onChange={handleStarsChange}
                        value={deets.stars}
                        />

                    <button type="submit">Add Movie</button>
            </form>
        </div>
    )
}

export default AddMovie;