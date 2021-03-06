// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp', (req, res) => {
  const unix = Date.now();
  const utc= Date();

  res.json({
      unix,
      utc
    })
})

app.get('/api/timestamp/:date', (req, res) => {
  let date = req.params.date;
  let dateObj;

  if(!isNaN(date)){
    dateObj = new Date(parseInt(date))
    return res.json({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString()
    })
  }
    
  dateObj = new Date(date)

  if (dateObj.toString() === 'Invalid Date') {
    res.json({
      error: dateObj.toString(),
    });
  } else {
    res.json({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString(),
    });
  }
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

