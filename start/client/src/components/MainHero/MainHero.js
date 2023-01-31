import React from 'react'
import "./MainHero.css"
import animals from "../../assets/images"
import cat from "./cat.jpg"
import lion from "./lion2.jpg"
import penguin from "./penguin2.jpg"
import {Container} from "reactstrap"

import { useQuery, gql } from "@apollo/client"


const FETCH_MAIN_CARDS = gql`
{
    mainCards {
        image
        title
    }
}
`

function MainHero() {

    // const cardsData = useQuery(gql`
    //     {
    //         mainCards {
    //             image
    //             title
    //         }
    //     }
    
    // `)

    const { loading, error, data } = useQuery(FETCH_MAIN_CARDS)

    if (loading) return <div> Loading ... </div>

    if (error) return <div> Something went wrong ... </div>

    console.log(data)

    return (
        <div className="MainHero">
            <Container>
                    <div className="header-container">
                        <h2>Find your <br/> new four-legged <br/> best friend</h2>
                        <img src={animals.rhino} alt="Rhino Mascotte" />
                    </div>
                    <div className="cards-container">
                        {data.mainCards.map(card => {
                            return (
                                <div className="card">
                                    <h3>{card.title}</h3>
                                    <img src={animals[card.image]} alt="animal" style={{width: "100%"}}/>
                                </div>
                            )
                        })}
                    </div>
            </Container>
        </div>
    )
}

export default MainHero
