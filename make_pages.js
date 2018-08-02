const path = require('path');
const fs = require('fs');
var request = require('request');
/* Download required markdowns */


function getPage(url, name) {
    console.log("get " + `${url}/${name}`);
    let dest = "./temp/";
    request.get(`${url}/${name}`).pipe(fs.createWriteStream(path.join(dest, name)));    
}

function downloadWebPages() {

    let baseUrl = "https://raw.githubusercontent.com/compartia/Zeitsinn/master";
    getPage(baseUrl, "recipe.md");
    getPage(baseUrl, "zeitsinnism.md");

}



downloadWebPages();