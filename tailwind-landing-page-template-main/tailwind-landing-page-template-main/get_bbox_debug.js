const fs = require('fs');
const svg = fs.readFileSync('public/geqo-logo.svg', 'utf8');

const paths = [...svg.matchAll(/d="([^"]+)"/g)].map(m => m[1]);
for (const d of paths) {
    const tokens = d.match(/[a-zA-Z]+|[-+]?[0-9]*\.?[0-9]+/g);
    let command = '';
    let currentX = 0, currentY = 0;
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (/[a-zA-Z]/.test(token)) {
            command = token;
        } else {
            let x, y;
            if (command === 'M' || command === 'L') {
                x = parseFloat(token);
                y = parseFloat(tokens[++i]);
            } else if (command === 'm' || command === 'l') {
                x = currentX + parseFloat(token);
                y = currentY + parseFloat(tokens[++i]);
            } else if (command === 'C') {
                x = parseFloat(tokens[i+4]);
                y = parseFloat(tokens[i+5]);
                i += 5;
            } else if (command === 'c') {
                x = currentX + parseFloat(tokens[i+4]);
                y = currentY + parseFloat(tokens[i+5]);
                i += 5;
            }
            currentX = x; currentY = y;
            if (currentY < 300) {
                console.log(`Low Y detected: ${currentY} from command ${command}`);
            }
            if (command === 'M') command = 'L';
            if (command === 'm') command = 'l';
        }
    }
}
