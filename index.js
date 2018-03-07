var path = require('path');
var proxy = require('express-http-proxy');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// app.use(express.static(__dirname + '/../dist'));

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.use('/reviews/reviews/:id', proxy('http://localhost:3004/reviews/:id', {
  proxyReqPathResolver: function(req) {
    return 'http://localhost:3004/reviews/reviews/' + req.params.id;
  }
}));
app.use('/reviews/user/:id', proxy('http://localhost:3004/user/:id', {
  proxyReqPathResolver: function(req) {
    return 'http://localhost:3004/reviews/user/' + req.params.id;
  }
}));
app.use('/highlights/reviews/:id', proxy('http://localhost:3003/highlights/reviews/:id', {
  proxyReqPathResolver: function(req) {
    return 'http://localhost:3004/highlights/reviews/' + req.params.id;
  }
}));
app.use('/highlights/photos/:id', proxy('http://localhost:3003/highlights/photos/:id', {
  proxyReqPathResolver: function(req) {
    return 'http://localhost:3004/highlights/photos/' + req.params.id;
  }
}));
app.get('/map-and-images/business/:id', proxy('http://localhost:3001/map-and-images/business/:id', {
  proxyReqPathResolver: function(req) {
    return 'http://localhost:3001/map-and-images/business/' + req.params.id;
  }
}));

app.get('/map-and-images/business/:id/photos', proxy('http://localhost:3001/map-and-images/business/:id/photos', {
  proxyReqPathResolver: function(req) {
    return 'http://localhost:3001/map-and-images/business/' + req.params.id + '/photos';
  }
}));
app.use("/sidebar/business/:id", proxy("http://localhost:3002/sidebar/business/:id", {
  proxyReqPathResolver: function(req) {
    return "http://localhost:3002/sidebar/business/" + req.params.id;
  }
}));
app.use("/sidebar/postalCode/:code", proxy("http://localhost:3002/sidebar/postalCode/:code", {
  proxyReqPathResolver: function(req) {
    return "http://localhost:3002/sidebar/postalCode/" + req.params.code;
  }
}));
app.use("/sidebar/businessTips/:id", proxy("http://localhost:3002/sidebar/businessTips/:id", {
  proxyReqPathResolver: function(req) {
    return "http://localhost:3002/sidebar/businessTips/" + req.params.id;
  }
}));
// app.get('/reviews/:id', controller.reviews.get);
// app.get('/user/:id', controller.user.get);
app.listen(3000, function() {
  console.log('listening on port 3000');
});
