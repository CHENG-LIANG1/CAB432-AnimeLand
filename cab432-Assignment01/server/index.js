const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
var parseString = require('xml2js').parseString;
var axios = require("axios").default;

// Serve out any static assets correctly
app.use(express.static('../client/build'))


// fetch popular animes
app.get('/api/popularity', (req, res) => {
  axios.get("https://api.jikan.moe/v3/top/anime/2/bypopularity")
    .then(response => res.json(response.data))
    .catch(err => {
      console.log(err)
      res.json({error: true}) // Send error message in JSON format
    })
})

// fetch adventure animes
app.get('/api/action', (req, res) => {
  axios.get("https://api.jikan.moe/v3/genre/anime/1/1")
    .then(response => res.json(response.data))
    .catch(err => {
      console.log(err)
      res.json({error: true}) // Send error message in JSON format
    })
})

// fetch a random anime quote
app.get('/api/quotes', (req, res) => {
  axios.get("https://animechan.vercel.app/api/random")
    .then(response => res.json(response.data))
    .catch(err => {
      console.log(err)
      res.json({error: true}) // Send error message in JSON format
    })
})

// fetch trending anime news
app.get('/api/news', (req, res) => {
  axios.get("https://cdn.animenewsnetwork.com/encyclopedia/api.xml?manga=12660")
    .then(response => {
      parseString(response.data, function(err, result){ // Convert XML to JSON
        res.json(result)
      })
    })
    .catch(err => {
      console.log(err)
      res.json({error: true}) // Send error message in JSON format
    })
})

// get detailed anime info based on anime id
app.get('/api/anime/:id', (req, res) => {
  const id = req.params.id
  const url = "https://api.jikan.moe/v3/anime/" + id
  axios.get(url)
     .then(response => {
         res.json(response.data)
       })
      .catch(err => {
        console.log(err)
        res.json({error: true}) // Send error message in JSON format
      })
})

// fetch anime ino based on title
app.get('/api/anime/search/:title', (req, res) => {
  const title = req.params.title
  const url = "https://api.jikan.moe/v3/search/anime?q=" + title + "&page=1"
  axios.get(url)
    .then(response => {
      res.json(response.data)
    })
    .catch(err => {
      console.log(err)
      res.json({error: true}) // Send error message in JSON format
    })
})

// fetch anime news based on anime title
app.get('/api/news/:title', (req, res) => {
  const title = req.params.title
  let url = "https://www.animenewsnetwork.com/encyclopedia/reports.xml?id=155&type=anime&search=" + title

    axios.get(url)
    .then(response => {
      parseString(response.data, function(err, result){ // Convert XML to JSON

        try {
          const id = result.report.item[0].id[0]; // Get the anime id based on the title

          url = "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=" + id
          axios.get(url)
          .then(resp => {
            
            parseString(resp.data, function(err, jsonRes){ // Conver XML to JSON
              res.json(jsonRes) // Send the json data
                })
            })
          .catch(err => {
            console.log(err)
            res.json({error: true}) // Send error message in JSON format
            })
        }catch(err){
          console.log(err)
        }

      })
    })
    .catch(err => {
      console.log(err)
      res.json({error: true}) // Send error message in JSON format
      })
})

// fetch quotes based on anime title
app.get('/api/quotes/:title', (req, res) => {
  const title = req.params.title
  const quote_url = 'https://animechan.vercel.app/api/quotes/anime?title=' + title
  axios.get(quote_url)
    .then(response => res.json(response.data))
    .catch(err => {
      console.log(err)
      res.json({error: true}) // Send error message in JSON format
    })
})

// fetch anime rankings
app.get('/api/anime/top/rankings', (req, res) => {
  const url = "https://api.jikan.moe/v3/top/anime/1"

  axios.get(url)
    .then(response => {
        res.json(response.data)
    })
    .catch(err => {
      console.log(err)
      res.json({error: true}) // Send error message in JSON format
    })
})


// Any routes that don't match on our static assets or api should be sent to the React Application
// This allows for the use of things like React Router
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})

app.listen(port, () => {
  console.log(` app is listening`)
})
