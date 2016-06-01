var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

function startDevServer () {
  new WebpackDevServer(webpack(config), {
    contentBase: './www',
    publicPath: config.output.publicPath,
    hot: true,
    colors: true,
    historyApiFallback: true
  }).listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      return console.log(err);
    }

    console.log(`Public address: http://${ip}:3000/`);
  });
}

var fs = require('fs'), ip = require('ip').address(), indexHtml = './www/index.html';

//Replace HTML's hot script area;
fs.readFile(indexHtml, 'utf8', function (err,data) {
  if (err) return console.log(err);

  var result = data.replace(/<!--hot script start-->[\s\S]*?<!--hot script end-->/,
    `<!--hot script start-->
    <script type="text/javascript" src="http://${ip}:3000/bundle.js"></script>
    <!--hot script end-->`
  );

  fs.writeFile(indexHtml, result, 'utf8', function (err) {
    if (err) return console.log(err);
    startDevServer(); //If update Index HTML success, start the server.
  });
});