var express = require('express');
var bodyParser = require('body-parser');
var path = require('path')
var items = require('../database');

var app = express();

app.use(express.static(path.join(__dirname + '/../react-client/dist')));
app.use(bodyParser.json())
app.use(bodyParser.text())

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/items', function(req, res){
	items.saveItem(req.body, function(err, data){
		if (err){
			res.sendStatus(500)
		} else {
			res.end()
		}
	})
})

app.post('/crossout', function(req, res){
	items.crossout(req.body.id, req.body.bool, function(err, item){
		if (err){
			res.sendStatus(500)
		} else {
			res.end()
		}
	})
})


app.post('/delete', function(req, res){
	items.del(req.body, function(){
			res.end()
	})
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
