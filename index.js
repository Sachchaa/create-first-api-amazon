const express = require('express')
const request = require('request-promise')

const app = express()
const PORT = process.env.PORT || 5001

const apiKey = '675bf94e6e48829fc38e2995fef91f2d'
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to first API of CodeSutra.')
})

//Get Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com.au/dp/${productId}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))