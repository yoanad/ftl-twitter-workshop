# twitter-analysis
analyze tweets

## Welcome to the Twitter API Workshop

1. Set up local web server with [NodeJs & ExpressJS](https://www.codewall.co.uk/setting-up-a-local-web-server-with-nodejs-expressjs/)
1. Build Twitter Hashtag [Tweet Viewing Tool](https://www.codewall.co.uk/how-to-build-a-twitter-hashtag-viewing-tool-tutorial/)
1. Locally store [Tweets in DB](https://medium.com/swlh/sentiment-analysis-on-tweets-with-node-js-82b7f18c0456)

## Setting up
Adapted from https://www.codewall.co.uk/setting-up-a-local-web-server-with-nodejs-expressjs/
1. Open your editor and terminal of choice. 
2. Create directory ``mkdir twitter-analysis``
3. Using the command line, navigate to this folder and run the npm init command to initialize your project

### Installing Express
``npm install express --save``

Allow the files to download and then move to the next section.

### Configuring our Node server with Express
#### Step 1

Ok, no we have Express, we’re ready to start readying our server configuration.

Create a new file named `server.js` in the root directory.
Add the following code to the file and save it

```javascript
const express = require('express')
const app = express()

// Start serv & listen on port 3000.
app.listen(3000, function () {
  console.log('Node listening on port 3000')
})

//Listen for get request on root url. eg. http://localhost:3000
app.get('/', function (req, res) {
  res.send('Woohoo, our homepage works!')
})
```

#### Step 2

Testing the server works…

Now from the command line in the root folder, execute the following command, ``node server.js``
Then, with your browser, navigate to ``localhost:3000``

You should be served a blank screen with the message ‘Woohoo, our homepage works!’

### Adding Views
We now need to add a templating engine, one in particular named EJS. EJS is enabled you to construct HTML code along with JavaScript variables that are passed in via the backend of your application. It’s highly similar to how Laravel works with its Blade views or ASP.NET works with Razor views.

#### Step 1
EJS will be our view template engine.

To add EJS, run the following command in the project root directory

```bash
npm install ejs --save
```

#### Step 2

Next, we need to instruct Node to use EJS as our template engine with the following line of code added to your `server.js` file –

```javascript
app.set('view engine', 'ejs')
```

#### Step 3

EJS expects a view folder to present in the project directory, so we need to create one, and whilst we are there, we may as well create an index file too. So, create a new folder called `views`, and add a new file within the views folder but name this index.ejs

#### Step 4

Now we want to edit our server.js file so that it actually renders the index.js file when the root directory is accessed. To do this, edit your app.get listener function to return the following –


```javascript
res.render('index');
```

rather than

```javascript
res.send('Woohoo, our homepage works!')
```

So it should now look like this –
```javascript
app.get('/', function (req, res) {
  res.render('index');
})
```

## Create an app on Twitter
In order to access the Twitter API, you need to create an app and use credentials.
1. Navigate to `Apps` on the top right.
2. Click on `Create new app` (top right).
3. Fill out the required fields.
4. Copy & generate `Consumer API keys` and `Access token & access token secret` to your app.
