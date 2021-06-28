// 563492ad6f91700001000001e3402c4bd542451a92ce545f9c88a551

import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

const Grid = styled.div`
    display: grid;
    width: 100%;
    max-width: 1200px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2em;
`

const Picture = styled.div`
    border: 10px solid white;
    background-color: #ecf5fd;
    min-height: 500px;
    
    a {
        display: flex;
        width: 100%;
    }

    img {
        object-fit: cover;
    }
`

export default function Main() {

    let [pictures, setPictures] = useState([])

    let search = useRef()

    let fetchPictures = async (type) => {
        let response
        let header = { headers: { "Authorization": "563492ad6f91700001000001e3402c4bd542451a92ce545f9c88a551" } }
        switch (type) {
            case "initial":
                search.current.value = ''
                response = await fetch("https://api.pexels.com/v1/curated?per_page=30", header)
                break;
            case "search":
                response = await fetch("https://api.pexels.com/v1/search?query=" + search.current.value + "&per_page=30", header)
                break;
            default:
                break;
        }
        let data = await response.json()
        setPictures(data.photos)
    }


    useEffect(() => fetchPictures("initial"), [])

    return (
        <div className="container">
            <div className="search">
                <input
                    type="text"
                    placeholder='e.g. apples, nature'
                    ref={search}
                    onKeyPress={(e) => {
                        if (e.code === 'Enter') fetchPictures("search")
                    }}
                />
                <button onClick={() => fetchPictures("search")}>Search</button>
            </div>
            <Grid>
                {pictures.map(el => <Picture key={el.url}><a href={el.url}><img src={el.src.portrait} alt={el.photographer} /></a></Picture>)}
            </Grid>
        </div>
    )
}