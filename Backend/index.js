require('dotenv').config();
const express = require('express')
const connectToMongo = require('./config/db.js');

connectToMongo();
const app = express()
const cors = require('cors')
const port = process.env.PORT 
app.use(express.json())// Middleware

 
app.use(cors())
//Available routes
app.use('/auth',require('./routes/auth.js'))
app.use('/notes',require('./routes/notes.js'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`CloudNote backend listening on port http://localhost:${port}`)
})