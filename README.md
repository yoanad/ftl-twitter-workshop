# Twitter-analysis
analyze tweets

## Navigation

## Welcome to the Twitter API Workshop

1. Set up local web server with [NodeJs & ExpressJS](https://www.codewall.co.uk/setting-up-a-local-web-server-with-nodejs-expressjs/)
1. Build Twitter Hashtag [Tweet Viewing Tool](https://www.codewall.co.uk/how-to-build-a-twitter-hashtag-viewing-tool-tutorial/)
1. Locally store [Tweets in DB](https://medium.com/swlh/sentiment-analysis-on-tweets-with-node-js-82b7f18c0456)

## Setting Up A Local Web Server With NodeJS & ExpressJS
Adapted from https://www.codewall.co.uk/setting-up-a-local-web-server-with-nodejs-expressjs/
## Prerequisites
The code used in this tutorial will be entirely JavaScript & HTML, so, all you need in place is the following two points.

* Download NodeJs,  Note: for this tutorial, version 10.15.3 (MacOS) was used.
* Have an IDE handy, something like VS Code will be sufficient.

### Setting up 
Adapted from https://www.codewall.co.uk/setting-up-a-local-web-server-with-nodejs-expressjs/
1. Open your editor and terminal of choice. 
2. Create directory ``mkdir twitter-analysis``
3. Using the command line, navigate to this folder and run the npm init command to initialize your project

#### Installing Express
``npm install express --save``

Allow the files to download and then move to the next section.

#### Configuring our Node server with Express
##### Step 1

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

##### Step 2

Testing the server works…

Now from the command line in the root folder, execute the following command, ``node server.js``
Then, with your browser, navigate to ``localhost:3000``

You should be served a blank screen with the message ‘Woohoo, our homepage works!’

#### Adding Views
We now need to add a templating engine, one in particular named EJS. EJS is enabled you to construct HTML code along with JavaScript variables that are passed in via the backend of your application. It’s highly similar to how Laravel works with its Blade views or ASP.NET works with Razor views.

##### Step 1
EJS will be our view template engine.

To add EJS, run the following command in the project root directory

```bash
npm install ejs --save
```

##### Step 2

Next, we need to instruct Node to use EJS as our template engine with the following line of code added to your `server.js` file –

```javascript
app.set('view engine', 'ejs')
```

##### Step 3

EJS expects a view folder to present in the project directory, so we need to create one, and whilst we are there, we may as well create an index file too. So, create a new folder called `views`, and add a new file within the views folder but name this index.ejs

##### Step 4

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

##### Step 5

Navigate to `localhost:3000` again, and you should be presented with a beautiful blank page!

##### Step 6

Let’s add some HTML to the `.ejs` file so it actually looks like a proper page.

Add the following HTML to your `index.ejs` file –

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>title</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
  </head>
  <body>
    <!-- page content -->
    <p>Hello world!</p>
  </body>
</html>
```

##### Step 7

Reload your index page in the browser, and you should see a pretty white screen with the message Hello World!

### Passing data from the backend to the client side
So, if we want to store data in our backend and pass it to the client side, how do we do it? It’s pretty straight forward, by using an object of data within the listener, and a snippet of code in the .ejs file we can pass data through.

Here is a very basic example –

##### Step 1

Firstly edit your app.get listener function, adding an object as a parameter to the render function.

*server.js*

```javascript
//Listen for get request on root url. eg. http://localhost:3000
app.get('/', function (req, res) {
  res.render('index',  {welcomeMessage: "Welcome to my app."})
})
```

##### Step 2

Then add the following snippet to your index file, using the <%- %> syntax to allow us to specify variables.

*index.ejs*
```ejs
<!-- page content -->
<p><%- welcomeMessage %></p>
```
  
##### Step 3

Kill your node server and re-run node server.js to start it up again. Navigate to your root URL in the browser and you should now see the welcome message within the page.

#### Summary
And that is it, a very basic NodeJS & ExpressJS web server. These two combined are perfectly capable of running a website with dynamic data. And it takes less than ten minutes to get it set up!

## Build A Twitter Hashtag Tweets Viewing Tool
### Prerequesites
* A Twitter Developers Account

### Installing & Configuring Twit
First up, we need to install the beautiful Twit library which allows us to configure our API credentials and also gives us some pre-defined API functionality. Twit is a neat Twitter API client for Node and saves a boatload of time fleshing out all the code yourself.

Install Twit by running

```npm install twit```

Then, require the library in your server.js file by adding the following code near to the top of the file –


```javascript
const twit = require("twit")
```

Lastly, configure a new Twit instance with your API credentials –

```javascript
let Twitter = new twit({
        consumer_key: 'your_consumer_key',
        consumer_secret: 'your_consumer_secret',
        access_token: 'your_access_token',
        access_token_secret: 'your_access_token_secret',
        timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
        strictSSL: true, // optional - requires SSL certificates to be valid.
    });
```

### Create an app on Twitter
In order to access the Twitter API, you need to create an app and use credentials.
1. Navigate to `Apps` on the top right.
2. Click on `Create new app` (top right).
3. Fill out the required fields.
4. Copy & generate `Consumer API keys` and `Access token & access token secret` to your app.

### Searching for some tweets
Before we make it all beautiful and user-friendly, we can test searching for tweets from a hashtag by running the API call and logging the response to the console. For this example, we used the `#stayAtHome` hashtag for the q parameter, which stands for ‘Query’.

Let’s add the code to search tweets on Twitter, just after the Twit instance setup.

```javascript
Twitter.get('search/tweets', {
  q: '#stayAtHome',
  count: 100,
  result_type: "mixed" 
}).catch(function (err) {
  console.log('caught error', err.stack)
}).then(function (result) {
   console.log('data', result.data);
});
```
