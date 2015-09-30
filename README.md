# JavaScript: You Know Nothing

**Copy Object**

    let _ = {};

    _.copy = function(source) {
      // copy has the same prototype as source
      let copy = Object.create(Object.getPrototypeOf(source));

      // also iterate over the kyes which are not enumerable
      Object.getOwnPropertyNames(source).forEach(function(key) {
        let desc = Object.getOwnPropertyDescriptor(source, key);
        // each property in the target has the same descriptors as the source
        Object.defineProperty(copy, key, desc);
      });

      return copy;
    }

    let a = {'one': 1, 'two': 2, 'three': 3};

    let b = Object.create(a);
    b.four = 4;
    b.five = 5;

    let c = Object.create(b);
    c.six = 6;
    c.seven = 7;
    c.eight = 8;

    // same as lodash's _.extend() or jQuery's $.extend()
    // NOTE: Object.assign() is introduced in ES6
    let C1 = Object.assign({}, c);

    console.log('Object.assign = C1: ', C1); // {'six': 6, 'seven': 7, 'eight': 8}
    console.log('Object.assign = C1.one: ', C1.one); // undefined

    let C2 = _.copy(c);

    console.log('Object.assign = C2: ', C2); // {'six': 6, 'seven': 7, 'eight': 8} with same prototype chain as 'c'
    console.log('Object.assign = C2.one: ', C2.one); // 1

**New Constructor**

    _.isObject = function(value) {
      // also works if the value is 'null'
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
    jaqen.talk('Valar Morghulis!');
