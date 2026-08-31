const fs = require('fs');
const sizeOf = require('image-size');
const path = require('path');

const imageDir = path.join(__dirname, 'public/images');
fs.readdirSync(imageDir).forEach(file => {
    if (file.endsWith('.png') || file.endsWith('.jpg')) {
        const dimensions = sizeOf(path.join(imageDir, file));
        console.log(`${file}: ${dimensions.width}x${dimensions.height}`);
    }
});
