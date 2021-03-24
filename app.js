const express = require("express");
const { NotFoundError } = require("./expressError");
const app = express();
const db = require('./fakeDb');
const router = require('./routes');




// process JSON body => req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded({ extended: true }));


app.use('/items', router);






/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
    const status = err.status || 500;
    const message = err.message;
    if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
    return res.status(status).json({ error: { message, status } });
  });
  // end
  
  
  module.exports = app;