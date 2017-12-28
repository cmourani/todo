
var mongoose = require('mongoose');
mongoose.connect('mongodb://cmourani:cocoa@ds059938.mlab.com:59938/todo-list-');

var db = mongoose.connection;


var itemSchema = mongoose.Schema({
  task: String, 
  done: Boolean
});

var Item = mongoose.model('Item', itemSchema);

var saveItem = function(string, cb){
  var li = new Item({task: string, done: false})
  li.save(function(err, result){
    cb(err, result)
  })
}

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var crossout = function(id, bool, cb){
  Item.update({_id: id}, { $set: { done: bool }}, function (err, item){
   if(err) {
      cb(err, null);
    } else {
      cb(null, item);
    }
  })
}

//check this
var del = function(array, cb){

  for (var i = 0; i < array.length; i++){
    Item.remove({ _id: array[i] }, function(err) {
      if (err) {
        console.log('delete err', err)
      }
    })
  }

  cb()
}

module.exports.selectAll = selectAll;
module.exports.saveItem = saveItem;
module.exports.crossout = crossout;
module.exports.del = del