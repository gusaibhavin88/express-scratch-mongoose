const { error } = require("console");
const fs = require("fs");
const path = require("path");

const content = "dddddddddddd";

const filePath = path.join(__dirname, "fefrefef.txt");

fs.writeFileSync(filePath, content);
fs.readFile(filePath, "utf8", (error, data) => {
  console.log(data, "data");
});
fs.appendFile(filePath, content, (err) => {
  console.log("File updated successfully");
});
fs.unlink(filePath, (err) => {
  console.log("File deleted successfully");
});
fs.mkdir(path.join(__dirname, "dddddddddd.txt"), { recursive: true }, (err) => {
  console.log("Directory created successfully");
});

// Check if the line is not empty

const fileLocation = path.join(__dirname, "example.txt"); // Ensure the file exists
const readStream = fs.createReadStream(fileLocation, { encoding: "utf8" });

let item = 0;

readStream.on("data", (chunk) => {
  const lines = chunk.split("\n");

  lines.forEach((line) => {
    if (line.trim()) {
      item++;
      console.log(`New chunk received: ${item}`);
      console.log(line);
    }
  });
});

readStream.on("error", (error) => {
  console.error("Error reading the file:", error);
});

readStream.on("end", () => {
  console.log("Finished reading the file.");
});

// Write Stream

const writableStreamData = fs.createWriteStream(
  path.join(__dirname, "output.txt")
);

writableStreamData.write("Hello, world!\n");
writableStreamData.write("Writing to a file using streams.\n");
writableStreamData.end(() => {
  console.log("Finished writing to file.");
});

// Pipe Stream

const readableStream = fs.createReadStream(
  path.join(__dirname, "readData.txt")
);
const writableStream = fs.createWriteStream(
  path.join(__dirname, "writeData.txt")
);

readableStream.pipe(writableStream);

writableStream.on("finish", () => {
  console.log("Finished copying file.");
});
