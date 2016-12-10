var fs = require('fs');
var userInp = process.argv;
var InpLength = userInp.length;
var inpTxt = userInp[3];
console.log("length is:" + InpLength);
var command = process.argv[2];
console.log(command);
switch (command) {
  case 'help':
  default:
    showHelp();
    break;
  case 'list':
    listTodos();
    break;
  case 'add':
    addNew() ;
    break;
  case 'remove':
    remove();
    break;
  case 'reset':
    reset();
    break;
};

function showHelp() {
  fs.readFile('help.txt','UTF-8', function (err, data) {
  if (err) throw err;
});
};

function listTodos() {
  fs.readFile('todos.json','UTF-8', function(err, data){
    var obj = JSON.parse(data);
    console.log(obj.todos);
  });
};

function addNew() {
  fs.readFile('todos.json','UTF-8', function(err, data){
    var obj = JSON.parse(data);
    var todosArr = obj.todos;
  for (var i = 0; i < todosArr.length; i++) {
    if (todosArr[i].toLowerCase() === inpTxt.toLowerCase()) {
      console.log("Item is already in your list")
    }
    else {
      todosArr.push(inpTxt);
      obj = JSON.stringify(obj);
      fs.writeFile('todos.json',obj, function(err){
        if (err) throw err;
      });
      console.log("Item was added successfully");
    }
  }
  });
};

function reset() {
  fs.readFile('todos.json','UTF-8', function(err, data){
    var obj = JSON.parse(data);
    obj.todos = [];
    obj = JSON.stringify(obj);
    fs.writeFile('todos.json',obj, function(err){
      if (err) throw err;
    });
  });
}

function remove() {
  fs.readFile('todos.json','UTF-8', function(err, data){
    var obj = JSON.parse(data);
    var todosArr = obj.todos;
    inpTxt = inpTxt - 1;
    todosArr.splice(inpTxt,1);
    obj = JSON.stringify(obj);
    fs.writeFile('todos.json',obj, function(err){
      if (err) throw err;
    });
  });
}
