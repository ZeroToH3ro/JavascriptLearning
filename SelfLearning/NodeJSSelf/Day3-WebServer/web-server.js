const http = require('http');
const PORT = 3000;
const friends = [
    {
        id: 1,
        name: 'Jane Doe'
    },
    {
        id: 2,
        name: 'Johny Deep'
    }
]
const server = http.createServer();

server.on('request', (req, res) => {
    //Create Item To Get Data
    const items = req.url.split('/');
    //Handle method POST and GET
    if(req.method == 'POST' && items[1] === 'friends'){
        req.on('data', (data)=> {
            const friend = data.toString();
            console.log('Value input: ', friend);
            friends.push(JSON.parse(friend));
        })
        req.pipe(res);
    } else if (req.method == 'GET' && items[1] === 'friends') {
        req.statusCode = 200;
        req.setHeader('Content-Type', 'application/json');
        //check data input from use is valid
        if(items.length === 3){
            const friendIndex = Number(items[2]);
            res.end(JSON.stringify(friends[friendIndex]));
        } else {
            res.end(JSON.stringify(friends));
        }
    } else if (req.method == 'GET' && items[1] === 'messages'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello Isaac!</li>');
        res.write('<li>What are your thoughts on astronomy?</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
    } else {
        res.statusCod = 400;
        res.end();
    }
});


server.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})