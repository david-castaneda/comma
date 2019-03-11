const fs = require("fs");
const path = require("path");

const dir = "../trips";

function walk() {
  const files = fs.readdirSync(path.resolve(dir));

  const json = JSON.stringify({ files: files });

  fs.writeFile(
    path.resolve("./files.json"),
    json,
    err => err && console.log({ err })
  );
}

walk();
