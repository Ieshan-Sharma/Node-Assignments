import express from "express";
import fs from 'fs';
import  path from "path";
const app = express();
const __dirname = path.resolve();
const port=5000;

app.get("/",function(req,res){
    res.sendFile('index.html', { root: __dirname });
});
app.get("/video",function(req,res){
const range = req.headers.range;
if(!range){
    res.status(400).send("Requires range header");
}
const videoPath = "cartoon.mp4";
const videoSize = fs.statSync("cartoon.mp4").size;

const CHUNK_SIZE = 10 ** 6;
const start = Number(range.replace(/\D/g,""));
const end = Math.min(start + CHUNK_SIZE, videoSize-1);

const contentLength = end- start + 1;
const headers={
    "Content-Range":`bytes ${start} - ${end}/${videoSize}`,
    "Accept-Range":"bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
};
res.writeHead(206,headers);

const videoStream = fs.createReadStream(videoPath,{start , end});

videoStream.pipe(res);
});


app.listen(port,function(){
    console.log("Server running on port 5000");
});