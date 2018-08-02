 
import * as fs from 'fs';
import * as path from 'path';
import * as request from 'request';
// const  request = require('request');
 
/* Download required markdowns */


export function getPage(url, name) {
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