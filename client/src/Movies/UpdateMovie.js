import React, { useState, useEffect } from "react";
import axios from "axios";

import {rerender} from "../utils/rerender";

export function UpdateMovie(props){
    const [update,setUpdate] = useState({
        id: '',
        title:'',
        director:'',
        stars: [],
    })

    const [starHandle, setStarHandle] = useState("");

    useEffect(()=> {
        rerender().get(`movies/${props.match.params.id}`)
        .then(res => {
            setUpdate(res.data)
        })
        .catch(err=> console.log(err))
    }, [props.match.params.id])

    const handleChanges = e => {
        e.persist()
        let value = e.target.value
        setUpdate({
            ...update, 
            [e.target.name]: value
        })
    }

    // const handleChanges = e => {
    //     e.persist();
    //     if (e.target.name === "stars") {
    //       setUpdate(prevData => ({
    //         ...prevData,
    //         [e.target.name]: e.target.value.split(",")
    //       }));
    //     } else {
    //       setUpdate(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
    //     }
    //   };

    return(
        <form onSubmit={e=> {e.preventDefault()
        rerender().put(`/movies/${update.id}`, update)
        props.history.push('/')}}
        >

        <input
            type="text"
            name="title"
            value={update.title}
            onChange={handleChanges}
            placeholder="Title"
            />

            <input
            type="text"
            name="director"
            value={update.director}
            onChange={handleChanges}
            placeholder="Director"
            />

            <input
            type="number"
            name="metascore"
            value={update.metascore}
            onChange={handleChanges}
            placeholder="Metascore"
            />

            <input
            type="text"
            name="stars"
            value={update.stars}
           onChange={handleChanges}
            placeholder="Stars"
            />

            <h4>Stars</h4>
            {console.log(update.director)}
            {/* <button onClick={e => {
                //console.log(update.stars);
                // e.preventDefault()
                // setUpdate({...update, stars: [...update.stars, starHandle]})
                // setStarHandle('')
            }}>Add Stars</button>
            {/* {update.stars.map((item,index)=> {
                return <p key={index}>{item}</p>
            })} */} 

            <button type="submit">Update</button>
        </form>
    )
}
export default UpdateMovie;