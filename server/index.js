const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

var db  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'admin',
    database        : 'event_calendar'
  });

app.get('/', (req, res) => {
    db.query("INSERT INTO Events (Date, StartTime, EndTime, Title) VALUES ('11/22/2023', '12:00pm', '3:00pm', 'Work on homework')", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
});

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

app.listen(8080, () => {
    console.log('server listening on port 8080');
})