const fs = require('fs');
const svg = fs.readFileSync('/Users/hamzamoustaati/Downloads/FreeSample-Vectorizer-io-high-level-description-a-modern-minimali_kyFl0qdIUmejKCispzAdQQ_.svg', 'utf8');

function getBounds(d) {
    let x = 0, y = 0, minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const parts = d.match(/[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+)/g);
    let i = 0;
    let mode = 'M';
    while (i < parts.length) {
        if (/[a-zA-Z]/.test(parts[i])) {
            mode = parts[i];
            i++;
        }
        if (i >= parts.length) break;
        let dx = parseFloat(parts[i]);
        let dy = parseFloat(parts[i+1]);
        if (mode === 'M' || mode === 'L' || mode === 'C' || mode === 'c' || mode === 'l' || mode === 'm') {
            if (mode === 'm') { x += dx; y += dy; mode = 'l'; i += 2;}
            else if (mode === 'M') { x = dx; y = dy; mode = 'L'; i += 2;}
            else if (mode === 'l') { x += dx; y += dy; i += 2;}
            else if (mode === 'L') { x = dx; y = dy; i += 2;}
            else if (mode === 'c') { x += parseFloat(parts[i+4]); y += parseFloat(parts[i+5]); i += 6;}
            else if (mode === 'C') { x = parseFloat(parts[i+4]); y = parseFloat(parts[i+5]); i += 6;}
            else i++;
        } else {
            i++;
        }
        
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    }
    return {minX, minY, maxX, maxY};
}

const paths = [...svg.matchAll(/<path d="([^"]+)"/g)].map(m => m[1]);
paths.forEach((d, i) => {
    if (i===3 || i===0 || i===4) console.log(`Path ${i} bounds:`, getBounds(d));
});
