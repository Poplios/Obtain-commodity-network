const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');

const app = express()
const port = process.env.PORT || 5000

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// MySQL code
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'shop',




});

// Get all rows || app.get('/rows') kdyby stranka specific
app.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err 
        console.log(`connected as id ${connection.threadId}`)

        // quary(sqlString, callback)
        connection.query('SELECT * from items', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err){
                res.send(rows)
            }else {
                console.log(err)
            }

        }) 


    })

})




// Listen on enviroment port on 5000
app.listen(port, () => console.log(`Listen on port ${port}`))


