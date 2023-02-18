
function Animal(in_name, in_age)
{
	this.name = in_name;
	this.age = in_age;
}

function Dog(name, age)
{
	Animal.call(this, name, age);
}

function addBookToLibrary(book, ...library)
{
	library.push(book);
	console.log("library size is " + library.length);
}

function Book()
{
	//...

	this.addToLibrary = function(...library)
	{
		addBookToLibrary(this, ...library);
	}
}

//===============================
var library = [];

var myBook = new Book();
myBook.addToLibrary(library);

var bookNumber2 = Object.create(myBook);

addBookToLibrary(myBook, library);

console.log("library size is " + library.length);

//debugger;

var samDog = new Dog("Sam", 29);

if(0 == false)
{
	//it will get executed
	console.log(samDog.age);
}

if(0 === false)
{
	//it won't
	console.log(samDog.age);
}



//========LAMBDA FUNCTION==========//

var globalMy = 30;

var errorMessage = () => 
{
	console.log("You've got an error");

	console.log("Global is " + globalMy);
}

errorMessage();

// errorMessage = () =>
// {
// 	console.log("New error message");
// }

// errorMessage();

//=========PROTOTYPE============//

function Fruit() {
	this.name = "fruit generic";
}

var fruit = new Fruit();
Object.keys(fruit).forEach(prop => console.log(prop));

console.log(fruit);

