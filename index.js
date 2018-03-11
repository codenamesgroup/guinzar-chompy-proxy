var path = require('path');
var proxy = require('express-http-proxy');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname + '/'));

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/title-bar/restaurant/:id', proxy('http://54.241.166.39/title-bar/restaurant/:id', {
  proxyReqPathResolver: function(req) {
    return `http://54.241.166.39/title-bar/restaurant/` + req.params.id;
  }
}));
app.use('/highlights/reviews/:id', proxy('http://54.241.166.39/highlights/reviews/:id', {
  proxyReqPathResolver: function(req) {
    return `http://54.241.166.39/highlights/reviews/` + req.params.id;
  }
}));
app.use('/highlights/photos/:id', proxy('http://54.241.166.39/highlights/photos/:id', {
  proxyReqPathResolver: function(req) {
    return `http://54.241.166.39/highlights/photos/` + req.params.id;
  }
}));
app.use('/reviews/reviews/:id', proxy('http://13.57.136.163/reviews/reviews/:id', {
  proxyReqPathResolver: function(req) {
    return `http://13.57.136.163/reviews/reviews/` + req.params.id;
  }
}));
app.use('/reviews/user/:id', proxy('http://13.57.136.163/reviews/user/:id', {
  proxyReqPathResolver: function(req) {
    return `http://13.57.136.163/reviews/user/` + req.params.id;
  }
}));
app.use(
  "/sidebar/business/:id",
  proxy("http://13.56.34.255/sidebar/business/:id", {
    proxyReqPathResolver: function(req) {
      return "http://52.53.200.182/sidebar/business/" + req.params.id;
    }
  })
);
app.use(
  "/sidebar/postalCode/:code",
  proxy("http://13.56.34.255/sidebar/postalCode/:code", {
    proxyReqPathResolver: function(req) {
      return "http://52.53.200.182/sidebar/postalCode/" + req.params.code;
    }
  })
);
app.use(
  "/sidebar/businessTips/:id",
  proxy("http://13.56.34.255/sidebar/businessTips/:id", {
    proxyReqPathResolver: function(req) {
      return "http://52.53.200.182/sidebar/businessTips/" + req.params.id;
    }
  })
);
app.use(
  "/sidebar/photos/:id",
  proxy("http://13.56.34.255/sidebar/photos/:id", {
    proxyReqPathResolver: function(req) {
      return "http://52.53.200.182/sidebar/photos/" + req.params.id;
    }
  })
);
app.get('/map-and-images/business/:id', proxy('http://34.216.201.147/map-and-images/business/:id', {
  proxyReqPathResolver: function(req) {
    return 'http://34.216.201.147/map-and-images/business/' + req.params.id;
  }
}));
app.get('/map-and-images/business/:id/photos', proxy('http://34.216.201.147/map-and-images/business/:id/photos', {
  proxyReqPathResolver: function(req) {
    return 'http://34.216.201.147/map-and-images/business/' + req.params.id + '/photos';
  }
}));
app.listen(3000, function() {
  console.log('listening on port 3000');
});
