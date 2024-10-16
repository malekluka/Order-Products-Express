const express = require('express'),
       // init app
       app = express(),
       connection = require('./config/connection');

//Database Connection
connection.DBconnection();
// Parse JSON
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

// Router Middleware
app.use('/users' , require('./routes/users'));
app.use('/products' , require('./routes/products'));
app.use('/orders' , require('./routes/orders'));


// Handling Request Error
app.use((req, res , next) => {
   const error = new Error("Something went Wrong....");
   error.status = 404;
   next(error);
})

app.use((error , req , res ,next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    })
})

// app.use((req , res , next) => {
//     res.status(200).json({
//         success : "Server Working...."
//     })
//     next();
// })

// Export App   
module.exports = app
