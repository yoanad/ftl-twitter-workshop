const express = require('express')
const app = express()

// Start serv & listen on port 3000.
app.listen(3000, function () {
  console.log('Node listening on port 3000')
})

app.set('view engine', 'ejs')

//Listen for get request on root url. eg. http://localhost:3000
app.get('/', function (req, res) {
    res.render('index',  {welcomeMessage: "Welcome to my app."})
})