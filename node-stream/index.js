import fs  from "fs";
import zlib  from 'zlib';
var data = '';

// Readable Stream

var readerStream = fs.createReadStream('input.txt');


readerStream.setEncoding('UTF8');


readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function() {
   console.log(data);
});

readerStream.on('error', function(err) {
   console.log(err.stack);
});

console.log("Program Ended");


//Writeable Stream


var data = 'Hello This is Ieshan';

    var writerStream = fs.createWriteStream('output.txt');
    
    writerStream.write(data,'UTF8');
    
    writerStream.end();
    
    writerStream.on('finish', function() {
       console.log("Write completed.");
    });
    
    writerStream.on('error', function(err) {
       console.log(err.stack);
    });
    
    console.log("Program Ended");

//Piping Streams


var writerStream = fs.createWriteStream('output.txt');


readerStream.pipe(writerStream);

console.log("Program Ended");

//Chaining Streams


fs.createReadStream('input.txt')
   .pipe(zlib.createGzip())
   .pipe(fs.createWriteStream('input.txt.gz'));
  
console.log("File Compressed.");

//Decompress File

fs.createReadStream('input.txt.gz')
   .pipe(zlib.createGzip())
   .pipe(fs.createWriteStream('input.txt'));
  
console.log("File Decompressed.");