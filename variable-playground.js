var person = {
	name: "Jaye",
	age: 21
};

function updatePerson(obj){
	obj.age = 29;
};

updatePerson(person);
console.log(person);

var grades = [1, 2];

function updateArray(arr, newGrade){
	arr.push(newGrade);
}

updateArray(grades, 3);
console.log(grades);