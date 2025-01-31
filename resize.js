// resize.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Konfigurera in- och utmappar
const inputFolder = path.join(__dirname, 'input');  // Här kan du lägga dina 10 bilder
const outputFolder = path.join(__dirname, 'output'); 

// Önskade dimensioner
const TARGET_WIDTH = 800;
const TARGET_HEIGHT = 600;

// Se till att output-mappen finns, om inte skapas den
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Läs filer från input-mappen
fs.readdir(inputFolder, (err, files) => {
  if (err) {
    return console.error('Kunde inte läsa katalog:', err);
  }

  // Filtrera på bildformat du vill tillåta
  const imageFiles = files.filter(file => {
    // Du kan lägga till fler filändelser om du vill
    return ['.jpg', '.jpeg', '.png', '.webp', '.tiff'].includes(
      path.extname(file).toLowerCase()
    );
  });

  // Loopa igenom varje bild och resiza
  imageFiles.forEach(file => {
    const inputPath = path.join(inputFolder, file);
    const outputPath = path.join(outputFolder, file); // Samma filnamn

    sharp(inputPath)
      .resize(TARGET_WIDTH, TARGET_HEIGHT)
      .toFile(outputPath)
      .then(() => {
        console.log(`Lyckades: ${file} -> ${TARGET_WIDTH}x${TARGET_HEIGHT}`);
      })
      .catch(err => {
        console.error(`Fel vid behandling av ${file}:`, err);
      });
  });
});
