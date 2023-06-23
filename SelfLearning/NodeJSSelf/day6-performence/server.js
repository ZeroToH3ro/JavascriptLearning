const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express();

function delay(duration){
    const startTime = Date.now();
    while(Date.now() - startTime < duration){
        //event loop is blocked
    }

}

app.get('/', (req, res) => {
    res.send(`Performance Server with ${process.pid}`);
})

app.get('/time', (req, res) => {
    delay(9000);
    res.send(`Ding ding ding with ${process.pid}`);
})

console.log("Running server....");
if(cluster.isMaster){
    console.log("Master has been started");
    const NUM_WORKERS = os.cpus().length;
    for(let i=0; i<NUM_WORKERS; i++){
        cluster.fork();
    }

} else {
    console.log("Worker has been started");
    app.listen(3000);
}


