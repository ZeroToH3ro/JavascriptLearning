const mission = process.argv[2];

if(mission === 'learn') {
    console.log('You are learning Node.js');
} else {
    console.log(`Is ${mission} really fun ?`);
}
