const express = require('express')
const request = require('request-promise')
const app = express()

const PORT = process.env.PORT || 5000

const genarateScraperURL = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json())
app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname+"/index.html")
})

app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params
  const { api_key } = req.query
  try {
    const response = await request(
      `${genarateScraperURL(
        api_key,
      )}&url=https://www.amazon.com/dp/${productId}`,
    )
    res.json(JSON.parse(response))
  } catch (error) {
    res.status(500).send(error.message)
  }
})
app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params
  const { api_key } = req.query
  try {
    const response = await request(
      `${genarateScraperURL(
        api_key,
      )}&url=https://www.amazon.com/product-reviews/${productId}`,
    )
    res.json(JSON.parse(response))
  } catch (error) {
    res.status(500).send(error.message)
  }
})
app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params
  const { api_key } = req.query
  try {
    const response = await request(
      `${genarateScraperURL(
        api_key,
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`,
    )
    res.json(JSON.parse(response))
  } catch (error) {
    res.status(500).send(error.message)
  }
})
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params
  const { api_key } = req.query
  try {
    const response = await request(
      `${genarateScraperURL(
        api_key,
      )}&url=https://www.amazon.com/s?k=${searchQuery}`,
    )
    res.json(JSON.parse(response))
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.listen(PORT, () => {
  console.log(`server run success on port localhost:${PORT}`)
})
