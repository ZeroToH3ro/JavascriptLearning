const express = require('express');
const path = require('path');
const db = require('./config/db');
const {engine} = require("express-handlebars");

const app = express();
const port = 3000;
//Engine View
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
//Set static file
app.use(express.static(path.join(__dirname, 'public')));
//Body parser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
//Connect database
try {
    db.authenticate().then(() => console.log('Connection has been established successfully.'));
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
app.get('/', (req, res) => {
    res.render('index', {layout: 'landing'})
});

app.use('/gigs', require('./router/web'))

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})
