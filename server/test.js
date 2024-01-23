import Dicer from "dicer";
import fs from "fs/promises";
import { Readable } from "stream";

const boundary = "------------------------c26e1ad6378c0515";
const buffer = await fs.readFile("./multipart.bin");

const dicer = new Dicer({ boundary: `${boundary}` });

dicer.on("part", (part) => {
  console.log("a part");

  part.on("header", (header) => {
    console.log("a header");
  });

  part.on("data", (data) => {
    console.log("some data");
  });

  part.on("end", () => {
    console.log("End of part\n");
  });
});

dicer.on("finish", () => {
  console.log("All parts processed");
});

dicer.on("error", (error) => {
  console.error("Dicer error:", error);
});

const bufferStream = new Readable({
  read() {},
});
bufferStream.push(buffer);
bufferStream.push(null);
bufferStream.pipe(dicer);

bufferStream.on("error", (error) => {
  console.error("Stream error:", error);
});
