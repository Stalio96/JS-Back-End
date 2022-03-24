const url = require('url');
const fs = require('fs');
const path = require('path');

function getContentType(url) {

    if (url.endsWith('css')) {
        return 'text/css';
    } else if (url.endsWith('html')) {
        return 'text/html';
    } else if (url.endsWith('js')) {
        return 'text/js';
    } else if (url.endsWith('png')) {
        return 'text/png'
    }
}

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname.startsWith('/content') && req.method == 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../content/styles/site.css')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('Not found!');
                res.end();
                return;
            } 

            res.writeHead(200, {
                'Content-Type': getContentType(pathname)
            });

            res.write(data);
            res.end();
        })

        
    } else {
        return true;
    }
}