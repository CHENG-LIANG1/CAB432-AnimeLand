import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../css/mangaInfo.css"


function GetMangaInfo(id){
   let url = "/api/anime/" + id

   const [mangaInfo, setMangaInfo] = useState({})
   const [news, setNews] = useState([])
   const [quotes, setQuotes] = useState([])
   const [quoteError, setQuoteError] = useState(false)
   const [newsError, setNewsError] = useState(false) 

   useEffect(
     () => {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setMangaInfo(res)

                url = "/api/news/" + res.title.replaceAll(".", '')

                fetch(url)
                    .then(response => response.json())
                    .then(response => {
                        if (response.hasOwnProperty('error') || !response.ann.anime[0].hasOwnProperty('news')){
                            setNewsError(true) // if the result has error or the result doesn't have news, set error to true
                        }else{
                            setNews(response.ann.anime[0].news.slice(0, 10)) // get the first 10 news
                        }
 
                    })
                    .catch(err => {
                        setNewsError(true)
                    })

                url = "/api/quotes/" + res.title.replaceAll(".", '')
                fetch(url)
                    .then(resp => resp.json())
                    .then(resp => {
                        if (resp.hasOwnProperty('error')){
                            setQuoteError(true)
                        }
                        setQuotes(resp)
                    })
            })

    }, [])
    return { mangaInfo, news, quotes, newsError, quoteError}
}


function Quotes(prop){
    const titleStyle = {
        textAlign: "center"
    }

    if(!prop.error){ // conditionally display quotes
        return(
            <div className="quote-container">
            <h1 className="title" style={titleStyle}>Quotes from {prop.title}</h1>
            {
                prop.quotes.map(
                    quote => (
                        <div>
                           <p>{quote.quote}</p>     
                           <p id="quote-source">-- {quote.character} in<i> {quote.anime}</i></p>    

                       </div>
                    )
                )
            }
       </div>
        )
    }else{
        return(
            <div>

            </div>
        )
    }
}

function News(prop){
    if(!prop.error) { // conditionally display news
        return(
            <div className="news">
            <h1 className="title">Related news</h1>
               {
                   prop.news.map(
                       item => (
                           <div className="news-container">
                           <a href={item.$.href}><h2>{item._.replaceAll("<cite>", "").replaceAll("</cite>", "")}</h2></a>
                           </div>
                       )
                   )
               }
           </div>
        )
    }else{
        return(
            <div>

            </div>
        )
    }

}




function AnimeInfo(){
    const { mangaID } = useParams()
    const {mangaInfo, news, quotes, quoteError, newsError} = GetMangaInfo(mangaID)

    return(
        <div>
            <div className="anime-container">
                <div>
                    <h1>{mangaInfo.title}</h1>

                    <div className="info-container">
                        <img src={mangaInfo.image_url} alt={mangaInfo.title} />

                        <div className="detail-container">
                            <p>Plot summery: {mangaInfo.synopsis}</p>
                            <p>Episodes: {mangaInfo.episodes}</p>
                            <p>Score: {mangaInfo.score}</p>
                            <a href={mangaInfo.url}>View detail</a>
                        </div>
                    
                    </div>

                </div>
            </div>

            <div className="trailer">
             <iframe title="trailer" src={mangaInfo.trailer_url} width="1200" height="730" frameborder="0" allowfullscreen></iframe>
             </div>


            <Quotes quotes={quotes} error={quoteError} title={mangaInfo.title}/>

            <News news={news} error={newsError} />
        </div>
    )
}

export default AnimeInfo