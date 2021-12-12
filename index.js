const express = require('express')
const request = require('request-promise')

const app = express()
const PORT = process.env.PORT || 5001

//const apiKey = '675bf94e6e48829fc38e2995fef91f2d'

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to first API of CodeSutra.')
})

//Get Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params
    const { api_key } = req.query

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com.au/dp/${productId}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

//Get Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params
    const { api_key } = req.query

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com.au/product-reviews/${productId}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

//Get Product Offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params
    const { api_key } = req.query

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com.au/gp/offer-listing/${productId}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

//Get Search Results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params
    const { api_key } = req.query

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com.au/s?k=${searchQuery}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))