import axios from "axios"

export function rerender(){

    return(
        axios.create({
            baseURL: 'http://localhost:5000/api'
        })
    )
}