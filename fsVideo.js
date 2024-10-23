const fs = require("fs");

// Create a readable stream from the input video file
const readableStream = fs.createReadStream("input.mp4", {
  highWaterMark: 1 * (1024 * 1024),
});

// Create a writable stream to the output video file
const writableStream = fs.createWriteStream("output.mp4");

// Pipe the readable stream to the writable stream
readableStream.pipe(writableStream);

// Event listeners to handle completion and errors
readableStream.on("data", (chunk) => {
  console.log("Reading chunk of video data...");
  console.log(chunk.length);
});

readableStream.on("end", () => {
  console.log("Finished reading video file.");
});

writableStream.on("finish", () => {
  console.log("Finished writing video file.");
});

readableStream.on("error", (err) => {
  console.error("Error reading video file:", err);
});

writableStream.on("error", (err) => {
  console.error("Error writing video file:", err);
});
