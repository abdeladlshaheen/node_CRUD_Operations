const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routers/router');
const body_parser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
mongoose.connect("mongodb://localhost:27017/school")
.then(()=>{
    app.listen(8080, ()=> console.log("running......"));
    console.log("database connection established successfully");
})
.catch(error=>{
    console.log("error with Database connection");
})


app.use(body_parser.urlencoded({ extended:false }));
app.use(body_parser.json());
app.use(morgan('tiny'));

app.use(cors());

app.use(router);

app.use((err, req, res, next) => {
    res.status(500).json({message: err+""});
});

// the notFound middleware
app.use((req, res, next) => {
    res.status(404).json({message: 'page not found'});
});
