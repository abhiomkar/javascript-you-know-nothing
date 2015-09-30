let _ = {};

_.isObject = function(value) {
	return value === Object(value);
};

_.new = function(Constructor, args) {
	var object = Object.create(Constructor.prototype);

	var returnValue = Constructor.apply(object, args);

	if (_.isObject(returnValue)) {
		return returnValue;
	}
	else {
		return object;
	}
};

// Examples

var Person = function(name) {
	this.name = name;
}

Person.prototype.getName = function() {
	return this.name;
};

Person.prototype.talk = function(message) {
	console.log(this.name + ' says ' + message);
}

var john = new Person('John Snow');
john.talk('I know nothing!'); // John Snow says I know nothing!

var jaqen = _.new(Person, ["Jaqen H'ghar"]);
jaqen.talk('Valar Morghulis!'); // Jaqen H'ghar says Valar Morghulis!
