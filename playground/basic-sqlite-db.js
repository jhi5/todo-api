var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	"dialect": "sqlite",
	"storage": __dirname + "/basic-sqlite-db.sqlite"
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

var user = sequelize.define('user', {
	email: Sequelize.STRING
});

Todo.belongsTo(user);
user.hasMany(Todo);

sequelize.sync({
	//force: true
}).then(function() {
	console.log("Things are synched!")

	user.findById(1).then(function(user){
		user.getTodos({
			where: {
				completed: !true
			}
		}).then(function(todos){
			todos.forEach(function(todos){
				console.log(todos.toJSON());
			})
		})
	})

	/* find item by owner
	user.findById(1).then(function(user) {
		user.getTodos().then(function(todos) {
			todos.forEach(function(todos) {
				console.log(todos.toJSON());
			})
		})
	});
	*/

	/* create a user
	user.create({
		email: "email@email.com"
	}).then(function() {
		return Todo.create({
			description: "Clean yard"
		})
	}).then(function(todo) {
		user.findById(1).then(function(user) {
			user.addTodo(todo);
		})
	});
	*/
});