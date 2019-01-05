let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = process.env.PORT||5000;
let router = require('./routes');

app.use(bodyParser.json());                     
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());   
app.use(bodyParser.json({ type: 'application/json'}));  


app.use('/api/v1', router);


if(!module.parent){app.listen(port)}

module.exports = app;