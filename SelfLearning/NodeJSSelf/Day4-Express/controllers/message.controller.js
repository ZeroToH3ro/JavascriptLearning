const path = require('path');

function getMessage(req, res){
    res.render('message', {
        title: 'Message To My Friend',
        friend: 'Zero'
    })
    // res.sendFile(path.join(__dirname, '..' ,'public', 'images' ,'skimountain.jpg'));
}

function postMessage(req, res){
    console.log('Updating message.....');
}

module.exports = {
    getMessage,
    postMessage
}