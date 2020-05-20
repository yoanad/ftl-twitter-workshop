const express = require('express')
const app = express()
const twit = require("twit")
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));

// Start serv & listen on port 3000.
app.listen(3000, function () {
  console.log('Node listening on port 3000')
})

//Listen for get request on root url. eg. http://localhost:3000
app.get('/', function (req, res) {
    res.render('index');
})

app.set('view engine', 'ejs')

app.post('/', function (req, res) {
    if (req.body.hashtag !== null) {
        let Twitter = new twit({
            consumer_key: 'consumer_key',
            consumer_secret: 'consumer_secret',
            access_token: 'access_token',
            access_token_secret: 'access_token_secret',
            timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
            strictSSL: true, // optional - requires SSL certificates to be valid.
      });
  
      Twitter.get('search/tweets', {
          q: req.body.hashtag, // use the user posted hashtag value as the query
          count: 100,
          result_type: "mixed" 
  
      }).catch(function (err) {
          console.log('caught error', err.stack)
          res.render('index', {
              hashtag: null,
              twitterData: null,
              error: err.stack
          });
      }).then(function (result) {
        // Render the index page passing in the hashtag and the Twitter API results
          res.render('index', {
              hashtag: req.body.hashtag, 
              twitterData: result.data,
              error: null
          });
      });
    }
  });
