const fs = require('fs');
const svg = fs.readFileSync('public/geqo-logo.svg', 'utf8');

// A very naive parser just to find min/max coordinates
let currentX = 0, currentY = 0;
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

function update(x, y) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
}

const paths = [...svg.matchAll(/d="([^"]+)"/g)].map(m => m[1]);
for (const d of paths) {
    const tokens = d.match(/[a-zA-Z]+|[-+]?[0-9]*\.?[0-9]+/g);
    let command = '';
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (/[a-zA-Z]/.test(token)) {
            command = token;
        } else {
            let x, y;
            if (command === 'M' || command === 'L') {
                x = parseFloat(token);
                y = parseFloat(tokens[++i]);
                currentX = x; currentY = y;
            } else if (command === 'm' || command === 'l') {
                x = currentX + parseFloat(token);
                y = currentY + parseFloat(tokens[++i]);
                currentX = x; currentY = y;
            } else if (command === 'C') {
                x = parseFloat(tokens[i+4]);
                y = parseFloat(tokens[i+5]);
                i += 5;
                currentX = x; currentY = y;
            } else if (command === 'c') {
                x = currentX + parseFloat(tokens[i+4]);
                y = currentY + parseFloat(tokens[i+5]);
                i += 5;
                currentX = x; currentY = y;
            }
            update(currentX, currentY);
        }
    }
}
console.log(`minX: ${minX}, minY: ${minY}, maxX: ${maxX}, maxY: ${maxY}`);
