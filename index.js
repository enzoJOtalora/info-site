const http = require('http')
const fs = require('fs')

const port = process.env.PORT || 3000
const myFiles = fs.readdir("./",{withFileTypes: true}).map(file=>file.name);

let homepage = '/';

fs.readFile('404.html', (err, data) => {
  page404 = data;
});


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html')
  let filename = req.url;
  filename = filename === homepage ? 'index' : filename.substr(1);
  console.log(`\n`, '--loading page--', `\n`)
  filename += '.html'

  fs.readFile(filename,(err,data)=>{
    if (err) {
      console.log(`--${filename} not found--`)
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write(page404);
      res.end();
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      }
  })
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})