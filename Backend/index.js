const express = require('express')
const connectToMongo = require('./db');

connectToMongo();
const app = express()
const cors = require('cors')
const port = 5000
app.use(express.json())// Middleware

 
app.use(cors())
//Available routes
app.use('/auth',require('./routes/auth.js'))
app.use('/notes',require('./routes/notes.js'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})