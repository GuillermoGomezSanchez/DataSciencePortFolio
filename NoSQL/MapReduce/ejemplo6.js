use prueba
base = [
    { "_id": ObjectId("5b3d366fa040bab1fff5ca3d"), "class": "Philosophy 101", "startDate": ISODate("2016-02-10T06:00:00Z"), "students": [{ "fName": "Dale", "lName": "Cooper", "age": 42 }, { "fName": "Lucy", "lName": "Moran", "age": 35 }, { "fName": "Tommy", "lName": "Hill", "age": 44 }], "cost": 1600, "professor": "Paul Slugman", "topics": "Socrates,Plato,Aristotle,Francis Bacon", "book": { "isbn": "1133612105", "title": "Philosophy : A Text With Readings", "price": 165.42 } },
    { "_id": ObjectId("5b3d3691a040bab1fff5ca3e"), "class": "College Algebra", "startDate": ISODate("2016-02-11T06:00:00Z"), "students": [{ "fName": "Dale", "lName": "Cooper", "age": 42 }, { "fName": "Laura", "lName": "Palmer", "age": 22 }, { "fName": "Donna", "lName": "Hayward", "age": 21 }, { "fName": "Shelly", "lName": "Johnson", "age": 24 }], "cost": 1500, "professor": "Rhonda Smith", "topics": "Rational Expressions,Linear Equations,Quadratic Equations", "book": { "isbn": "0321671791", "title": "College Algebra", "price": 179.4 } },
    { "_id": ObjectId("5b3d36aba040bab1fff5ca3f"), "class": "Astronomy 101", "startDate": ISODate("2016-02-11T06:00:00Z"), "students": [{ "fName": "Bobby", "lName": "Briggs", "age": 21 }, { "fName": "Laura", "lName": "Palmer", "age": 22 }, { "fName": "Audrey", "lName": "Horne", "age": 20 }], "cost": 1650, "professor": "Paul Slugman", "topics": "Sun,Mercury,Venus,Earth,Moon,Mars", "book": { "isbn": "0321815351", "title": "Astronomy: Beginning Guide to Univ", "price": 129.45 } },
    { "_id": ObjectId("5b3d36c1a040bab1fff5ca40"), "class": "Geology 101", "startDate": ISODate("2016-02-12T06:00:00Z"), "students": [{ "fName": "Andy", "lName": "Brennan", "age": 36 }, { "fName": "Laura", "lName": "Palmer", "age": 22 }, { "fName": "Audrey", "lName": "Horne", "age": 20 }], "cost": 1450, "professor": "Alice Jones", "topics": "Earth,Moon,Elements,Minerals", "book": { "isbn": "0321814061", "title": "Earth : An Introduction to Physical Geology", "price": 130.65 } },
    { "_id": ObjectId("5b3d36dca040bab1fff5ca41"), "class": "Biology 101", "startDate": ISODate("2016-02-11T06:00:00Z"), "students": [{ "fName": "Andy", "lName": "Brennan", "age": 36 }, { "fName": "James", "lName": "Hurley", "age": 25 }, { "fName": "Harry", "lName": "Truman", "age": 41 }], "cost": 1550, "professor": "Alice Jones", "topics": "Earth,Cell,Energy,Genetics,DNA", "book": { "isbn": "0547219474", "title": "Holt McDougal Biology", "price": 104.3 } },
    { "_id": ObjectId("5b3d3703a040bab1fff5ca42"), "class": "Chemistry 101", "startDate": ISODate("2016-02-13T06:00:00Z"), "students": [{ "fName": "Bobby", "lName": "Briggs", "age": 21 }, { "fName": "Donna", "lName": "Hayward", "age": 21 }, { "fName": "Audrey", "lName": "Horne", "age": 20 }, { "fName": "James", "lName": "Hurley", "age": 25 }], "cost": 1600, "professor": "Alice Jones", "topics": "Matter,Energy,Atom,Periodic Table", "book": { "isbn": "0547219474", "title": "Chemistry : Matter and Change", "price": 104.3 } }]

db.classes.drop()
db.classes.insertMany(base)

var mapFunc = function () {
    emit(this.professor, 1);
}
var redFunc = function (pro, cta) {
    return Array.sum(cta);
}
db.classes.mapReduce(mapFunc, redFunc,
    { query: { professor: "Alice Jones" }, out: "result" })

db.result.find().pretty()
