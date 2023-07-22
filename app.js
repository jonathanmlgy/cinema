// get the http module:
var http = require('http');
// fs module allows us to read and write content for responses!!
var fs = require('fs');
// creating a server using http module:
var server = http.createServer(function (request, response){
    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:
    if(request.url === '/movies') {
        fs.readFile('./views/movies.html', 'utf8', function (errors, contents){
            if (errors) {
                response.writeHead(500);
                response.end();
                return;
            }

            fs.readFile('./stylesheets/movies_style.css', 'utf8', function (errors, cssContents){
                if (errors) {
                    response.writeHead(500);
                    response.end();
                    return;
                }

                // Serve both files in the same response
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write('<style>' + cssContents + '</style>');
                response.write(contents);
                response.end();
            });
        });
    } else if (request.url.startsWith('/images/')) { // handle requests for image files
        const imageName = request.url.substring(8); // remove '/images/' prefix
        const imageType = imageName.endsWith('.jpg') ? 'image/jpg' : 'image/png'; // determine image type based on file extension
        fs.readFile(`./images/${imageName}`, function(errors, contents){
            if (errors) {
                response.writeHead(500);
                response.end();
                return;
            }
            response.writeHead(200, {'Content-type': imageType});
            response.write(contents);
            response.end();
        });
    }  else if(request.url === '/theaters') {
        fs.readFile('./views/theaters.html', 'utf8', function (errors, contents){
            if (errors) {
                response.writeHead(500);
                response.end();
                return;
            }

            fs.readFile('./stylesheets/theaters_style.css', 'utf8', function (errors, cssContents){
                if (errors) {
                    response.writeHead(500);
                    response.end();
                    return;
                }

                // Serve both files in the same response
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write('<style>' + cssContents + '</style>');
                response.write(contents);
                response.end();
            });
        });
    } else if(request.url === '/movies/new') {
        fs.readFile('./views/new.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents); 
            response.end();
        });
    } else if (request.url.startsWith('/cinema/')) { // handle requests for image files
        const imageName = request.url.substring(8); // remove '/cinema/' prefix
        const imageType = imageName.endsWith('.jpg') ? 'image/jpg' : 'image/png'; // determine image type based on file extension
        fs.readFile(`./images/${imageName}`, function(errors, contents){
            if (errors) {
                response.writeHead(500);
                response.end();
                return;
            }
            response.writeHead(200, {'Content-type': imageType});
            response.write(contents);
            response.end();
        });
    }

});
// tell your server which port to run on
server.listen(7890);
// print to terminal window
console.log("Running in localhost at port 7890");