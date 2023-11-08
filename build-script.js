const fs = require('fs');
const path = require('path');
var compressor = require('node-minify');
const packageJson = require('./package.json');

// se diretório public não existe, cria
const distPath = path.join(__dirname, 'public');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}

// imprime versão
const version = packageJson.version;
const source = fs.readFileSync('./src/rhino.js', 'utf-8');
const output = source.replace('%VERSION%', version);
fs.writeFileSync('./public/rhino.js', output);

//gera rhino.min.js
compressor.minify({
  compressor: 'gcc',
  input: './public/rhino.js',
  output: './public/rhino.min.js',
  callback: function(err, min) {}
});