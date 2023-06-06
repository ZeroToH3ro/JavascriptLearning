const onMyBirthday = (isOkioSick) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(isOkioSick){
                resolve(2)
            } else {
                reject(new Error("I am sad")); 
            }
        }, 2000);
    });
}

onMyBirthday(false).then((result) => {
    console.log(`I have ${result} cakes`);
}).catch((error) => {
    console.log(error.message);
}).finally(() => {
    console.log("Party");
})