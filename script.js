const fs = require('fs'); // Import the fs module to read and write files

// Read the current directory
const dir = fs.readdirSync('.');

// Create an empty array to store the parsed JSON data
let jsonData = [];

// Loop through the files in the directory
for (let file of dir) {
  // Check if the file is a JSON file
  if (file.endsWith('.json')) {
    // Extract the numerical order from the file name
    let match = file.match(/(\d+)/);
    if (match) {
      // Add the file name and the parsed JSON data to an object
      let obj = {
        file: file,
        order: parseInt(match[1]),
        data: JSON.parse(fs.readFileSync(file, 'utf8'))
      };

      // Add the object to the jsonData array
      jsonData.push(obj);
    }
  }
}

// Sort the jsonData array by the 'order' property
jsonData.sort((a, b) => a.order - b.order);

// Extract the parsed JSON data from the sorted jsonData array
jsonData = jsonData.map(obj => obj.data);

// Convert the JSON data to a string
let jsonString = JSON.stringify(jsonData, null, 2);

// Write the JSON string to a file named '_metadata.json' in the current directory
fs.writeFileSync('_metadata.json', jsonString);

// Print a message
