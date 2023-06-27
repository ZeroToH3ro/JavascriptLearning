const axios = require("axios");
const fs = require("fs");

//https://tutorialzine.com/misc/files/example.json
function getJsonPromise() {
  return new Promise(function (resolve) {
    axios
      .get("https://tutorialzine.com/misc/files/example.json")
      .then(function (json) {
        resolve(json.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      });
  });
}

function writeJsonToFile() {
  getJsonPromise()
    .then(function (json) {
      if (json) {
        const formattedData = JSON.stringify(json, null, 2); // Indentation of 2 spaces
        const dataWithNewLines = formattedData.replace(/\n/g, "\n"); // Add newline character
        //fs.writeFile(file, data, option, callback())
        fs.writeFile("data.txt", dataWithNewLines, function (err) {
          if (err) {
            console.log("Error writing to file:", err);
          } else {
            console.log("Data written to file successfully!");
          }
        });
      } else {
        console.log("No JSON data available.");
      }
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}
// writeJsonToFile();

async function getJsonAsyncAwait(){
    try {
        const response = await axios.get("https://tutorialzine.com/misc/files/example.json");
        return response.data;  
    } catch (error) {
        console.log("Error get json:", error);
        return null;
    }
};

async function writeJsonAsyncToFile(){
    let json = await getJsonAsyncAwait();
    try {
        if(json){
            const formattedData = JSON.stringify(json, null, 2);
            const dataWithNewLines = formattedData.replace(/\n/g, "\n");

            fs.writeFile("dataAsync.txt", dataWithNewLines, function(err) {
                if(err){
                    console.log("Error writing to file: ", err);
                } else {
                    console.log("Data written to file asynchronously succesfully!")
                }
            });
        }
    } catch (error) {
        console.log(error);
    };
};

writeJsonAsyncToFile();