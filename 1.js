const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');

// Function to rename files in a directory
function renameFilesInDirectory(dirPath) {
    // Read the directory
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return console.error(`Unable to scan directory: ${err}`);
        }
        let notes_list = ["a0", "a#0", "b0", "c1", "c#1", "d1", "d#1", "e1", "f1", "f#1", "g1", "g#1", "a1", "a#1", "b1", "c2", "c#2", "d2", "d#2", "e2", "f2", "f#2", "g2", "g#2", "a2", "a#2", "b2", "c3", "c#3", "d3", "d#3", "e3", "f3", "f#3", "g3", "g#3", "a3", "a#3", "b3", "c4", "c#4", "d4", "d#4", "e4", "f4", "f#4", "g4", "g#4", "a4", "a#4", "b4", "c5", "c#5", "d5", "d#5", "e5", "f5", "f#5", "g5", "g#5", "a5", "a#5", "b5", "c6", "c#6", "d6", "d#6", "e6", "f6", "f#6", "g6", "g#6", "a6", "a#6", "b6", "c7", "c#7", "d7", "d#7", "e7", "f7", "f#7", "g7", "g#7", "a7", "a#7", "b7", "c8"]

        for (let i in notes_list) {
            let file = files[files.findIndex(file => file.replace(/.ogg/g, "") == notes_list[i])]
            const oldPath = path.join(dirPath, file); // Full path of the old file
            const newFileName = `${i}-${file.replace(/.ogg/g, "")}${path.extname(file)}`; // New name with index
            const newPath = path.join(dirPath, newFileName); // Full path of the new file
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    return console.error(`Error renaming file ${file}: ${err}`);
                }
                console.log(`Renamed: ${file} to ${newFileName}`);
            });
        }
        /* files.forEach((file, index) => {
            
            if (file.match(/.ogg.ogg/g)) {
                const oldPath = path.join(dirPath, file); // Full path of the old file
                let file_str
                file_str = file.substring(0, 3)
                console.log(file_str);
                const newFileName = `${file_str}${path.extname(file)}`; // New name with index
                const newPath = path.join(dirPath, newFileName); // Full path of the new file    
                fs.rename(oldPath, newPath, (err) => {
                    if (err) {
                        return console.error(`Error renaming file ${file}: ${err}`);
                    }
                    console.log(`Renamed: ${file} to ${newFileName}`);
                });
            }
            // Rename the file
        }); */
    });
}

// Usage
const fileUrl = 'file:///C:/Users/estev/Desktop/88%20notes/'; // Use %20 for spaces in URLs
const directoryPath = fileURLToPath(fileUrl); // Convert file URL to path
//renameFilesInDirectory(directoryPath);

/*
a0, a♯0, b0, c1, c#1, d1, d#1, e1, f1, f#1, g1, g#1, a1, a#1, b1, c2, c#2, d2, d#2, e2, f2, f#2, g2, g#2, a2, a#2, b2, c3, c#3, d3, d#3, e3, f3, f#3, g3, g#3, a3, a#3, b3, c4, c#4, d4, d#4, e4, f4, f#4, g4, g#4, a4, a#4, b4, c5, c#5, d5, d#5, e5, f5, f#5, g5, g#5, a5, a#5, b5, c6, c#6, d6, d#6, e6, f6, f#6, g6, g#6, a6, a#6, b6, c7, c#7, d7, d#7, e7, f7, f#7, g7, g#7, a7, a#7, b7
*/

let array1 = ["c1","d1","e1","f1","g1","a1","b1","c2","d2","e2","f2","g2","a2","b2","c3","c%231","d%231","f%231","g%231","a%231","c%232","d%232","f%232","g%232","a%232"]
let array2 = ["a0", "a#0", "b0", "c1", "c#1", "d1", "d#1", "e1", "f1", "f#1", "g1", "g#1", "a1", "a#1", "b1", "c2", "c#2", "d2", "d#2", "e2", "f2", "f#2", "g2", "g#2", "a2", "a#2", "b2", "c3", "c#3", "d3", "d#3", "e3", "f3", "f#3", "g3", "g#3", "a3", "a#3", "b3", "c4", "c#4", "d4", "d#4", "e4", "f4", "f#4", "g4", "g#4", "a4", "a#4", "b4", "c5", "c#5", "d5", "d#5", "e5", "f5", "f#5", "g5", "g#5", "a5", "a#5", "b5", "c6", "c#6", "d6", "d#6", "e6", "f6", "f#6", "g6", "g#6", "a6", "a#6", "b6", "c7", "c#7", "d7", "d#7", "e7", "f7", "f#7", "g7", "g#7", "a7", "a#7", "b7", "c8"]
let array_locations = []
console.log(array2.slice(3, 28));

