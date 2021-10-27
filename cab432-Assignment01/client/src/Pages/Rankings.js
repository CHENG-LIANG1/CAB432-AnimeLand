import React, { useState, useEffect } from "react";
import {Card, Button} from "react-bootstrap"
import "../css/rankings.css"
import { useHistory } from "react-router";

function GetRankings(){
    const url = "/api/anime/top/rankings"
    const [anime, setAnime] = useState([])
    useEffect(
        () => {
            fetch(url)
                .then(res =>res.json())
                .then(res => {
                    setAnime(res.top)
                })
        }, [])
    return anime
}

function Rank(props){
    const history = useHistory()

    function handleClick(id){
        history.push("/anime/" + id)
    }

    return(
        <div className="card">
            <Card>
                <Card.Body>
                    <Card.Title>{props.rank + ". " + props.title}</Card.Title>
 
                    <Card.Text>
                    Score: {props.score}
                    </Card.Text>
                    <Button onClick={() => handleClick(props.animeID)}>View detail</Button>
                </Card.Body>
            </Card>
        </div>
    )
}


function Rankings(){
    const rankingList = GetRankings()
    return(
        <div>
            {
                rankingList.map( rank => (
                    <div>
                        <Rank title= {rank.title} score={rank.score} link={rank.url} animeID={rank.mal_id} rank={rank.rank}/>
                    </div>
                    )
                )
            }   

        </div>
    )
}

export default Rankings