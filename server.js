var http = require("http");
var fs = require("fs");

var PORT = 8085;

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var path = req.url;

    // Depending on the URL, display a different HTML file.
    switch (path) {
  
    case "/": 
        return handleHome(res);
    case "/test":
      return handlePOST(req, res);
    default:
      return display404(path, res);
    }
   
}
function handleHome(res) {
     // Here we use the fs package to read our index.html file
     fs.readFile(__dirname + "/index.html", function(err, data) {
        if (err) throw err;
        // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
        // an html file.
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
}
function handlePOST(req, res) {
    var requestData = "";

  req.on("data", function(data) {

    requestData += data;
  });

  req.on("end", function() {

    console.log("You did a", req.method, "with the data:\n", requestData);
    res.end();
  });
}
function display404(url, res) {
    var myHTML = "<html>" +
      "<body><h1>404 Not Found </h1>" +
      "<p>The page you were looking for: " + url + " can not be found</p>" +
      "</body></html>";
  
    // Configure the response to return a status code of 404 (meaning the page/resource asked for couldn't be found), and to be an HTML document
    res.writeHead(404, { "Content-Type": "text/html" });
  
    // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
    res.end(myHTML);
}
// Start our server
server.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
