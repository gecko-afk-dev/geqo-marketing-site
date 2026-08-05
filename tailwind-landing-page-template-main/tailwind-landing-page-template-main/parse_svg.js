const fs = require('fs');
const svg = fs.readFileSync('public/geqo-logo.svg', 'utf8');

const paths = [...svg.matchAll(/d="([^"]+)"/g)].map(m => m[1]);
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

for (let d of paths) {
    // split into tokens
    let tokens = d.match(/[a-zA-Z]+|[-+]?[0-9]*\.?[0-9]+/g);
    let currentX = 0, currentY = 0;
    let command = '';
    
    let i = 0;
    while (i < tokens.length) {
        let token = tokens[i];
        if (/[a-zA-Z]/.test(token)) {
            command = token;
            i++;
        }
        
        let args = [];
        // gather numbers until next command
        while (i < tokens.length && !/[a-zA-Z]/.test(tokens[i])) {
            args.push(parseFloat(tokens[i]));
            i++;
        }
        
        // process args based on command
        let c = command;
        for (let j = 0; j < args.length; ) {
            if (c === 'M' || c === 'L') {
                currentX = args[j++];
                currentY = args[j++];
            } else if (c === 'm' || c === 'l') {
                currentX += args[j++];
                currentY += args[j++];
            } else if (c === 'H') {
                currentX = args[j++];
            } else if (c === 'h') {
                currentX += args[j++];
            } else if (c === 'V') {
                currentY = args[j++];
            } else if (c === 'v') {
                currentY += args[j++];
            } else if (c === 'C') {
                j += 4;
                currentX = args[j++];
                currentY = args[j++];
            } else if (c === 'c') {
                j += 4;
                currentX += args[j++];
                currentY += args[j++];
            } else if (c === 'S') {
                j += 2;
                currentX = args[j++];
                currentY = args[j++];
            } else if (c === 's') {
                j += 2;
                currentX += args[j++];
                currentY += args[j++];
            } else if (c === 'Q') {
                j += 2;
                currentX = args[j++];
                currentY = args[j++];
            } else if (c === 'q') {
                j += 2;
                currentX += args[j++];
                currentY += args[j++];
            } else if (c === 'T') {
                currentX = args[j++];
                currentY = args[j++];
            } else if (c === 't') {
                currentX += args[j++];
                currentY += args[j++];
            } else if (c === 'A') {
                j += 5;
                currentX = args[j++];
                currentY = args[j++];
            } else if (c === 'a') {
                j += 5;
                currentX += args[j++];
                currentY += args[j++];
            } else if (c === 'Z' || c === 'z') {
                break;
            }
            
            if (currentX < minX) minX = currentX;
            if (currentX > maxX) maxX = currentX;
            if (currentY < minY) minY = currentY;
            if (currentY > maxY) maxY = currentY;
            
            if (c === 'M') c = 'L';
            if (c === 'm') c = 'l';
        }
    }
}

console.log(`minX: ${minX}, minY: ${minY}, maxX: ${maxX}, maxY: ${maxY}`);
