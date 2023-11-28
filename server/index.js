const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// Connect to mysql database
var db  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'admin',
    database        : 'event_calendar'
  });

// Get all events on a specific date from the database
app.post('/test', (req, res) => {
    const date = req.body.date;
    
    db.query("SELECT * FROM Events WHERE Date = (?)", [date], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    }); 
});

// Add new event to the database
app.post('/add', (req, res) => {
    const date = req.body.date;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const title = req.body.title;

    db.query("INSERT INTO Events (Date, StartTime, EndTime, Title) VALUES (?, ?, ?, ?)", [date, startTime, endTime, title], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send({title: title});
        }
    });
})

// Start the server and listen on port 8080
app.listen(8080, () => {
    console.log('server listening on port 8080');
})