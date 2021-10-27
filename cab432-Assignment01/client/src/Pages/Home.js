import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../css/home.css";

function GetRandomQuote(){
    const [quote, setQuote] = useState("Loading...");
    const [anime, setAnime] = useState("Loading...");
    const [character, setCharacter] = useState("Loading...");
    const url = "/api/quotes";
    useEffect(
        () => {

            fetch(url)
            .then( (res) => res.json())
            .then( (res) => {
                    setQuote(res.quote);
                    setAnime(res.anime);
                    setCharacter(res.character);
            })
        }, [])

    return {quote, anime, character};
}

function GetActionAnimes(){
    const url = "api/action";
    const [mangaList, setMangaList] = useState([])
    useEffect(
        () => {
            fetch(url)
                .then(res =>res.json())
                .then(res => {
                    setMangaList(res.anime)
                })
        }, [])

    return mangaList.slice(0,5)
}

function GetPopularAnimes(){
    const url = "/api/popularity"
    const [popularList, setPopularList] = useState([])

    useEffect(
        () => {
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    setPopularList(res.top)
                })
        }, [])

    return popularList.slice(0, 5)
}


function GetNews() {
    const url = "/api/news"
    const [news, setNews] = useState([])
    useEffect(
        () => {
            fetch(url)
                .then(res =>res.json())
                .then(res => setNews(res.ann.manga[0].news))

        }, [])
    return news
}

function Quote(prop){

    return(
        <div className="quote-container">
        <h3>Quote of the day</h3>
        <p>{prop.quote}</p>     
        <p id="quote-source">-- {prop.character} in<i> {prop.anime}</i></p>    
    </div>
    )
}



function Home(){
    const {quote, anime, character} = GetRandomQuote();
    const history = useHistory()

    function handleImageClick(id){
        history.push("/anime/" + id)
    }
    
    const news = GetNews()
    const mangaList = GetActionAnimes()
    const popularList = GetPopularAnimes()

 
    return(
        <div>
            <Quote quote={quote} anime={anime} character={character}/>
            <h1 className="title">Adventure animes</h1>
            <div className="mangas">
                {
                    mangaList.map(
                        item => (
                            <div className="manga-container">

                                <h4> {item.title}</h4>
                    
                                    <img src={item.image_url}  alt={item.title}   onClick={() => handleImageClick(item.mal_id)}/>
                                
                            </div>
                        )
                    )
                }
            </div>


            <h1 className="title">Popular animes</h1>
            <div className="mangas">
                {
                    popularList.map(
                        item => (
                            <div className="manga-container">

                                <h4> {item.title}</h4>
                            
                                    <img src={item.image_url} alt={item.title} onClick={() => handleImageClick(item.mal_id)}/>
                            
                            </div>
                        )
                    )
                }
            </div>


            <div className="news">
            <h1 className="title">Trending news</h1>
                {
                    news.map(
                        item => (
                            <div className="news-container">
                            <a href={item.$.href}><h2>{item._.replaceAll("<cite>", "").replaceAll("</cite>", "")}</h2></a>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Home