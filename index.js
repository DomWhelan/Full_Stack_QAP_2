// Http module required
const http = require("http");

// The routes.js is required to access functions from the module.exports list
const routes = require("./routes.js");

// Server created using the http module
const server = http.createServer((req, res) => {
  console.log(req.url);
  let path = "./views/";

  // To determine what file to display ussing the URL request
  switch (req.url) {
    case "/":
      path += "index.html";
      console.log("Home Page Requested");
      res.statusCode = 200;
      routes.homePage(path, res);
      break;
    case "/about":
      path += "about.html";
      console.log("About Page Requested");
      res.statusCode = 200;
      routes.aboutPage(path, res);
      break;
    case "/contact":
      path += "contact.html";
      console.log("Contact Page Requested");
      res.statusCode = 200;
      routes.aboutPage(path, res);
      break;
    case "/hobbies":
      path += "hobbies.html";
      console.log("Hobbies Page Requested");
      res.statusCode = 200;
      routes.aboutPage(path, res);
      break;
    case "/family":
      path += "family.html";
      console.log("Family Page Requested");
      res.statusCode = 200;
      routes.aboutPage(path, res);
      break;
    case "/project":
      path += "project.html";
      console.log("Project Page Requested");
      res.statusCode = 200;
      routes.projectPage(path, res);
      break;
    case "/contact-us":
      console.log("Contact Us Page Redirected to Contact Page");
      res.writeHead(301, { Location: "/contact" });
      res.end();
      break;
    case "/join":
      path += "join.html";
      console.log("Cookie Created");
      res.statusCode = 201;
      res.setHeader("Set-cookie", "favorite=Chocolate");
      routes.joinPage(path, res);
      break;
    case "/blank":
      path += "blank.html";
      console.log("BLANK PAGE - NO CONTENT at blank.html");
      res.statusCode = 204;
      routes.blankPage(path, res);
      break;
    case "/coffee":
      path += "coffee.html";
      console.log("Attempted to brew some coffee");
      res.statusCode = 418;
      routes.teapot(path, res);
      break;
    default:
      path += "404.html";
      console.log("Page Requested Not Found");
      res.statusCode = 404;
      routes.errorPage(path, req.url, res);
      break;
  }
});

// This to ensure that the server port is awaiting future requests
server.listen(3000, "localhost", () => {
  console.log("listening on port 3000");
});
