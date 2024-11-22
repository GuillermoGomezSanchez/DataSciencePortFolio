use prueba
base = [
{"name" : "Tim",     "country" : "USA",      "age" : 15},
{"name" : "Sandra",  "country" : "USA",      "age" : 18},
{"name" : "Alex",    "country" : "France",   "age" : 19},
{"name" : "Zhong",   "country" : "Taiwan",   "age" : 19},
{"name" : "Tom",     "country" : "USA",      "age" : 20},
{"name" : "Marc",    "country" : "France",   "age" : 20},
{"name" : "Hao",     "country" : "Taiwan",   "age" : 12},
{"name" : "Jennifer","country" : "USA",      "age" : 15},
{"name" : "Jean",    "country" : "France",   "age" : 17},
{"name" : "James",   "country" : "USA",      "age" : 17},
{"name" : "Peter",   "country" : "USA",      "age" : 20},
{"name" : "Jorge",   "country" : "Portugal", "age" : 20},]
db.students.drop()
db.students.insertMany(base)

function mr() {
    return db.students.mapReduce(

        // Función MAP
        function () {
            emit(this.age, { count: 1 });
        },

        // Función REDUCE
        function (key, values) {
            var reduced = { count: 0 };
            values.forEach(function (val) {
                reduced.count += val.count;
            });
            return reduced;
        },

        // Configurations
        {
            out: 'Stats'
        });
}
mr()
db.Stats.find().pretty()
