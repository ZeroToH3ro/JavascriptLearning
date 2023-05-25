function myDisplayer(some) {
    document.getElementById("demo").innerHTML = some;
}

let myPromise =  new Promise(function(resolve, reject){
    let x = 0;

    if(x == 0){
        resolve("Okie");
    } else {
        reject("Not okie");
    }
});

myPromise.then(
    function(value){ 
        console.log("Data from promise", value);
        myDisplayer(value)
    },
    function(error){
        console.log(error);
        myDisplayer(error) 
    }
);

let myPromiseLoadFile = new Promise(function(myResolve, myReject){
    let req = new XMLHttpRequest();
    req.open('GET', 'index.html');
    req.onload = function(){
        if(req.status === 200){
            myResolve(req.response);
        } else {
            myReject("File not found");
        }
    };
    req.send();
});

function myDisplayerFile(some) {
    document.getElementById("loadFile").innerHTML = some;
}

myPromiseLoadFile.then(
    function(value){ 
        console.log("Data from promise: ", value);
        myDisplayerFile(value)
    },
    function(error){
        console.log(error);
        myDisplayerFile(error) 
    }
);
