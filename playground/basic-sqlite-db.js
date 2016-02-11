var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	"dialect": "sqlite",
	"storage": __dirname + "/basic-slite-db.sqlite"
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync({}).then(function(){
	console.log("Things are synched!")

	Todo.findById(1).then(function(todo){
		if(todo){
			console.log(todo.toJSON());
		}else{
			console.log("Nothing found!")
		}
	})
});


/*
sequelize.sync({
	force: true
}).then(function() {
	console.log("Everything is synched!");

	Todo.create({
			description: "walking my dog",
			completed: false
		}).then(function(todo) {
			return Todo.create({
				description: 'Clean office'
			});
		}).then(function() {
			return Todo.findAll({
				where: {
					description: {
						$like: "%dog%"
					}
				}
			});
		}).then(function(todos) {
			if (todos) {
				todos.forEach(function(todos) {
					console.log(todos.toJSON());
				})
			} else {
				console.log("No todos found!");
			}
		})
		.catch(function(error) {
			console.log(error);
		});
}); */