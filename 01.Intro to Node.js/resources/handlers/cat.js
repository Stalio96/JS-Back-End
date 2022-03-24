const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
//const formidable = require('formidable');
const breeds = require('../data/breeds.json');
const cats = require('../data/cats.json');


module.exports = (req, res) => {

    const pathname = url.parse(req.url).pathname;

    if (pathname == '/cats/add-cat' && req.method == 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/addCat.html')
        );

        fs.readFile(filePath, (err, data) => {

            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('Not found!');
                res.end();
            }


            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(data);
            res.end();
        })
    } else if (pathname == '/cats/add-breed' && req.method == 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/addBreed.html')
        );

        fs.readFile(filePath, (err, data) => {

            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/html'
                });

                res.write('Not found!');
                res.end();
            }

            res.write(data);
            res.end();
        })
    } else if (pathname == '/cats/add-breed' && req.method == 'POST') {
        let body = '';

        let filePath = path.normalize(
            path.join(__dirname, '../data/breeds.html')
        );


        //fs.readFile(filePath, (err, data) => {
        //    console.log(err)
        //    console.log(data.toString());
        //})

        req.on('data', chunk => {
            body += chunk.toString()
        });
        req.on('end', () => {
            //const formData = body.split('=')
            //.reduce((r, v) => Object.assign({[r]: v}))
            //fs.writeFile('../data/breeds.json', JSON.stringify(formData, null, 2))

            body = body.split('=');

            const formData = body[1];

            let filePath = path.normalize(
                path.join(__dirname, '../data/breeds.json')
            );

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404, {
                        'Content-Type': 'text/html'
                    });

                    res.write('Not found!');
                    res.end();
                }

                fs.writeFile(filePath, JSON.stringify(formData), (err) => {
                    if (err)
                        console.log(err);
                    else {
                        console.log("File written successfully\n");
                        console.log("The written has the following contents:");
                        console.log(fs.readFileSync("../data/breeds.json", "utf8"));
                    }
                });
                res.end()
            })
        })
    } else if (pathname == '/cats/add-cat' && req.method == 'POST') {

    } else {
        return true;
    }
}