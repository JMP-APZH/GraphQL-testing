import React from 'react'
import MainHero from "../components/MainHero/MainHero"
import CategoryDisplay from "../components/CategoryDisplay/CategoryDisplay"
import CardDisplay from "../components/CardDisplay/CardDisplay"

import { useQuery, useMutation, gql } from "@apollo/client"

const ANIMALS_QUERY = gql`
{
    animals {
        id
        title
        image
        price
        slug
    }
}
`

const ADD_ANIMAL_MUTATION = gql`
    mutation(
        $image: String!,
        $category: String!,
        $title: String!,
        $stock: Int!,
        $price: String!,
        $description: [String!]!,
        $rating: Float,
        $slug: String!
    ) {
        addAnimal(
            image: $image,
            category: $category,
            title: $title,
            stock: $stock,
            price: $price,
            description: $description,
            rating: $rating,
            slug: $slug,
        ) {
            id
        }
    }
`

function LandingPage() {

    const { loading, error, data } = useQuery(ANIMALS_QUERY)
    
    let image, category, title, stock, price, description, rating, slug;
    const [addAnimal] = useMutation(ADD_ANIMAL_MUTATION)

    if (loading) return <div> Loading ... </div>

    if (error) return <div> Something went wrong ... </div>

    console.log(data)

    return (
        <div>
            <MainHero />
            <CategoryDisplay />
            <CardDisplay animals={data.animals}/>

            <div>
                <form onSubmit={e => {
                   e.preventDefault();
                   addAnimal( {variables: {image: image.value, category: category.value, title: title.value, stock: parseInt(stock.value), price: price.value, description: description.value, rating: parseFloat(rating.value), slug: slug.value}})
                }}>
                    <label for='image'>Image</label>
                    <input id='image' type="text" ref={ value => image = value }></input>
                    <label for='category'>Category</label>
                    <input id='category' type="text" ref={ value => category = value }></input>
                    <label for='title'>Title</label>
                    <input id='title' type="text" ref={ value => title = value }></input>
                    <label for='stock'>Stock</label>
                    <input id='stock' type="number" ref={ value => stock = value }></input>
                    <label for='price'>Price</label>
                    <input id='price' type="text" ref={ value => price = value }></input>
                    <label for='description'>Description</label>
                    <input id='description' ref={ value => description = value }></input>
                    <label for='rating'>Rating</label>
                    <input id='rating' type="number" step='0.1' ref={ value => rating = value }></input>
                    <label for='slug'>Slug</label>
                    <input id='slug' type="text" ref={ value => slug = value }></input>

                    <button type='submit'> Add an Animal </button>
                </form>
            </div>
            
        </div>
    )
}

export default LandingPage
