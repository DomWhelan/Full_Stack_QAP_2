// File System required for file manipulation
const fs = require("fs");
// Event module required
const EventEmitter = require("events");

// Event module extended using the Class method
class MyEmitter extends EventEmitter {}

// Object creatd to give ability call various methods
const myEmitter = new MyEmitter();

// New date object created globally for logging purposes
const d = new Date();

// Event created (reqUrl) to log the requested URLs by the user
myEmitter.addListener("reqUrl", (route, level, msg) => {
  console.log("File path: " + route);
  fs.appendFile(
    "./logs/reqUrllog.txt",
    `${d.toLocaleString()} Request URL: ${route}  *  ${level.toUpperCase()}  *  ${msg}\n`,
    function (err) {
      if (err) {
        console.log(err);
      } else {
        // Get the file contents after the append operation
        console.log("Requested URL,See Request Log for details");
      }
    }
  );
});

// Event created to make a log entry on successful file reads
myEmitter.addListener("readSuccess", (path) => {
  fs.appendFile(
    "./logs/filelog.txt",
    `${d.toLocaleString()} File read: ${path} SUCCESS\n`,
    function (err) {
      if (err) {
        console.log(err);
      } else {
        // Get the file contents after the append operation
        console.log(
          "\nFile Contents of filelog.txt after append:\n",
          fs.readFileSync("./logs/filelog.txt", "utf8")
        );
      }
    }
  );
  console.log("File Called: " + path);
});

// Event created to make a log entry on failed file reads
myEmitter.addListener("readFailure", (path) => {
  fs.appendFile(
    "./logs/filelog.txt",
    `${d.toLocaleString()} File read: ${path} FAILED\n`,
    function (err) {
      if (err) {
        console.log(err);
      } else {
        // Get the file contents after the append operation
        console.log(
          "\nFile Contents of file after append:\n",
          fs.readFileSync("./logs/filelog.txt", "utf8")
        );
      }
    }
  );
  console.log("File Called: " + path);
  console.log("File read FAILED");
});

// Functions to direct the response in the desired path
function homePage(path, res) {
  myEmitter.emit("reqUrl", path, "info", "the home page was requested");
  readFile(path, res);
}

function aboutPage(path, res) {
  myEmitter.emit("reqUrl", path, "info", "the about page was requested");
  readFile(path, res);
}

function contactPage(path, res) {
  myEmitter.emit("reqUrl", path, "info", "the contact page was requested");
  readFile(path, res);
}

function hobbiesPage(path, res) {
  myEmitter.emit("reqUrl", path, "info", "the hobbies page was requested");
  readFile(path, res);
}

function familyPage(path, res) {
  myEmitter.emit("reqUrl", path, "info", "the family page was requested");
  readFile(path, res);
}

function projectPage(path, res) {
  myEmitter.emit("reqUrl", path, "info", "the project page was requested");
  readFile(path, res);
}

function joinPage(path, res) {
  myEmitter.emit("reqUrl", path, "info", "the join page was requested");
  readFile(path, res);
}

function errorPage(path, url, res) {
  myEmitter.emit("reqUrl", path, "error", "the page requested was not found");
  myEmitter.emit("readFailure", url);
  readFile(path, res);
}

function blankPage(path, res) {
  myEmitter.emit("reqUrl", path, "alert", "the page requested had no content");
  readFile(path, res);
}

function teapot(path, res) {
  myEmitter.emit(
    "reqUrl",
    path,
    "info",
    "there was a request to make some coffee"
  );
  readFile(path, res);
}

function readFile(path, res) {
  fs.readFile(path, function (err, data) {
    if (err) {
      console.log(err);
      myEmitter.emit("readFailure", path);
      res.end();
    } else {
      myEmitter.emit("readSuccess", path);
      console.log("file read successfully");
      res.writeHead(res.statusCode, { Content_Type: "text/html" });
      res.end(data);
    }
  });
}

// This is a list that is passed through
// the require or import of this js file elsewhere
module.exports = {
  homePage,
  aboutPage,
  contactPage,
  hobbiesPage,
  familyPage,
  projectPage,
  errorPage,
  joinPage,
  blankPage,
  teapot,
};
