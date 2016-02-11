var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('underscore');
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

//for middleware
app.use(bodyParser.json());

app.get("/", function(req, res){
	res.send("Todo API Route");
});

app.get("/todos", function(req, res){
	var queryParams = req.query;
	var filteredTodos = todos;
	if(queryParams.hasOwnProperty("completed") && queryParams.completed === 'true'){
		filteredTodos = _.where(filteredTodos, {completed: true})
	}else if(queryParams.hasOwnProperty("completed") && queryParams.completed === 'false'){
		filteredTodos = _.where(filteredTodos, {completed: false});
	}
	res.json(filteredTodos);
});

app.get("/todos/:id", function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if(matchedTodo){
		res.json(matchedTodo);
	}else{
		res.status(404);
	}

	res.send("Asking for todo with id of " + req.params.id);

});

app.post("/todos", function(req, res){
	var body = _.pick(req.body, "description", "completed");
	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		res.status(400);
		return res.end();
	}
	body.description = body.description.trim();
	body.id = todoNextId++;
	todos.push(body);
	res.json(body);
});

app.delete("/todos/:id", function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	if(!matchedTodo){
		res.status(400).json("Error: No todo with that id");
		return res.end();
	}else{
		todos = _.without(todos, matchedTodo);	
		res.json(matchedTodo);
	}	
});

app.put("/todos/:id", function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	var body = _.pick(req.body, "description", "completed");
	var validAttr = {};

	if(!matchedTodo){
		res.status(404);
		return res.end();
	}

	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttr.completed = body.completed;
	}else if(body.hasOwnProperty("completed")){
		res.status(400);
		return res.end();
	}

	if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trin().length > 0){
		validAttr.description = body.description;
	}else if(body.hasOwnProperty("description")){
		res.status(400);
		return res.end();
	}

	_.extend(matchedTodo, validAttr);
	res.json(matchedTodo);	
});

app.listen(PORT, function(){
	console.log("Express is listening on port " + PORT + "!");
});