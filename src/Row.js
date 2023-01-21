import React, { useEffect, useState } from 'react'
import "./Row.css";
import axios from './axios';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url="https://image.tmdb.org/t/p/original/";
function Row({ title , fetchUrl , isLargeRow}) {

    const [movies, setMovies]= useState([]);
    const [trailerUrl,setTrailerUrl]=useState("");
    //useEffect: Its a React Hook. It is a snippet of code which runs based on a specific conditioin/variables.
    
    useEffect(() => {     //we want this code to run when the movies loads on screen.
       async function fetchData(){
            const request= await axios.get(fetchUrl);
            console.log(request);
            setMovies(request.data.results);
            return request;
       }
        fetchData();
    }, [fetchUrl]);//if this bracket is empty "[]" ,run once when row loads and dont run again

    const opts ={
        height:"390",
        width:"100%",
        playerVard:{
            autoplay: 1,
        },
    }

    const handleClick = (movie)=>{
        if(trailerUrl){
            setTrailerUrl("");
        }
        else{
            movieTrailer(movie ?.name || "")
            .then((url)=>{
                const urlParams=new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch((error)=>console.log(error));
        }
    };


    console.table(movies);
    return (
        <div className="row">
            <h1>{title}</h1>
            <div className="row_posters" >
                {movies.map(movie=>(
                    <img 
                        key={movie.id}
                        onClick={()=>handleClick(movie)}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}
                     />
                ))}

            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            
        </div>
    )
}

export default Row
