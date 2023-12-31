if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const cors = require('cors')
const express = require('express')
const routes = require('./routes')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.send('hello world'))
app.use(routes)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

