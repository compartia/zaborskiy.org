const path = require('path');
const fs = require('fs');
var request = require('sync-request');
/* Download required markdowns */


function getPage(url, name) {
    console.log("get " + `${url}/${name}`);
    let dest = "./temp/";
    let body = request('GET', `${url}/${name}`);//
    fs.writeFileSync(path.join(dest, name), body.getBody());
}

function downloadWebPages() {

    let baseUrl = "https://raw.githubusercontent.com/compartia/Zeitsinn/master";
    getPage(baseUrl, "recipe.md");
    getPage(baseUrl, "zeitsinnism.md");

}



downloadWebPages();