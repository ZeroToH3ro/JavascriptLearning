const express = require('express');
const path = require('path');
const friendRouter = require('./routes/friend.router');
const messageRouter = require('./routes/message.router');
const PORT = 3000;

const app = express();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.url}: ${delta}ms`);
});

app.get('/' ,(req, res) => {
    res.render('index', {
        title: 'Node JS',
        caption: 'Let \'s go to the mountain'
    });
})

app.use('/site', express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/friend', friendRouter);
app.use('/message', messageRouter);

app.listen(PORT, () => {
    console.log(`This server is open on port ${PORT}`);
})