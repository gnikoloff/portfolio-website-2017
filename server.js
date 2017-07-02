const path = require('path')
const express = require('express')
const app = express()
const compression = require('compression')

const PORT = process.env.PORT || 1102

app.use(compression())
app.use(express.static('public'))
app.set('view engine', 'pug')

const tabletop = require('tabletop')

let worksData

tabletop.init({
  key: 'https://docs.google.com/spreadsheets/d/1L0eCoEqntWxyKUfWL4Y22hOiRnd4p4xyxQ1tC75NUs4/edit?usp=sharing',
  callback: sheetsLoaded,
  simpleSheet: true
})

function sheetsLoaded (data) {
  worksData = data
}

app.route('/').get((req, res) => {
    res.render('index', { worksData })
})

app.listen(PORT, () => { console.log(`App is listening on port: ${PORT}`) })
