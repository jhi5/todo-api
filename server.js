var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1
	,description: "Ate lunch"
	,completed: false
},{
	id: 2
	,description: "Buy food"
	,completed: false
}];

app.get("/", function(req, res){
	res.send("Todo API Route");
});

app.listen(PORT, function(){
	console.log("Express is listening on port " + PORT + "!");
});