const EventEmitter = require('events');
const celebrity = new EventEmitter();

//Subcribe to celebrity for observer 1
celebrity.on('race', (result) => {
    if(result === 'win'){
        console.log('Congratularion you are the best');
    }
})

//Subcribe to celebrity for observer 2
celebrity.on('race', (result) => {
    if(result === 'lose'){
        console.log('Sorry you are the worst');
    }
})

process.on('exit', (code) => {
    console.log('Process exit with event code ', code);
})
//Run event
celebrity.emit('race', 'win');
celebrity.emit('race', 'lose');