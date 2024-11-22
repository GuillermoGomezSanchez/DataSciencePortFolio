use agg

db.artists.drop();
db.zips.drop();

db.artists.insertMany([
{ "_id" : 1, "last_name" : "Bernard", "first_name" : "Emil", "year_born" : 1868, "year_died" : 1941, "nationality" : "France" },
{ "_id" : 2, "last_name" : "Rippl-Ronai", "first_name" : "Joszef", "year_born" : 1861, "year_died" : 1927, "nationality" : "Hungary" },
{ "_id" : 3, "last_name" : "Ostroumova", "first_name" : "Anna", "year_born" : 1871, "year_died" : 1955, "nationality" : "Russia" },
{ "_id" : 4, "last_name" : "Van Gogh", "first_name" : "Vincent", "year_born" : 1853, "year_died" : 1890, "nationality" : "Holland" },
{ "_id" : 5, "last_name" : "Maurer", "first_name" : "Alfred", "year_born" : 1868, "year_died" : 1932, "nationality" : "USA" },
{ "_id" : 6, "last_name" : "Munch", "first_name" : "Edvard", "year_born" : 1863, "year_died" : 1944, "nationality" : "Norway" },
{ "_id" : 7, "last_name" : "Redon", "first_name" : "Odilon", "year_born" : 1840, "year_died" : 1916, "nationality" : "France" },
{ "_id" : 8, "last_name" : "Diriks", "first_name" : "Edvard", "year_born" : 1855, "year_died" : 1930, "nationality" : "Norway" }
])
db.artists.aggregate( [
// First Stage
{
$bucket: {
groupBy: "$year_born", // Field to group by
boundaries: [ 1840, 1850, 1860, 1870 ], // Boundaries for the buckets
default: "Other", // Bucket ID for documents which do not fall into a bucket
output: { // Output for each bucket
"count": { $sum: 1 },
"artists" :
{
$push: {
"name": { $concat: [ "$first_name", " ", "$last_name"] },
"year_born": "$year_born"
}
}
}
}
}
] )

db.zips.aggregate( [
{ $match: { totalPop: { $gte: 10*1000*1000 } } },
{ $group: { _id: "$state", totalPop: { $sum: "$pop" } } }

] )

// Promedio de poblacion

db.zips.aggregate( [
{ $group: { _id: { state: "$state", city: "$city" }, pop: { $sum: "$pop" } } },
{ $group: { _id: "$_id.state", avgCityPop: { $avg: "$pop" } } }
] )

let etapa1 ={ $group:
{
_id: { state: "$state", city: "$city" },
pop: { $sum: "$pop" }
}
}

let etapa2 = { $sort: { pop: 1 } }

let etapa3 = { $group:
{
_id : "$_id.state",
biggestCity: { $last: "$_id.city" },
biggestPop: { $last: "$pop" },
smallestCity: { $first: "$_id.city" },
smallestPop: { $first: "$pop" }
}
}


let etapa4 = { $project:
{ _id: 0,
state: "$_id",
biggestCity: { name: "$biggestCity", pop: "$biggestPop" },
smallestCity: { name: "$smallestCity", pop: "$smallestPop" }
}
}

let tuberia = [etapa1, etapa2, etapa3, etapa4]
db.zips.aggregate(tuberia)
/*
db.zips.aggregate( [
{ $group:
{
_id: { state: "$state", city: "$city" },
pop: { $sum: "$pop" }
}
},
{ $sort: { pop: 1 } },
{ $group:
{
_id : "$_id.state",
biggestCity: { $last: "$_id.city" },
biggestPop: { $last: "$pop" },
smallestCity: { $first: "$_id.city" },
smallestPop: { $first: "$pop" }
}
},

// the following $project is optional, and
// modifies the output format.

{ $project:
{ _id: 0,
state: "$_id",
biggestCity: { name: "$biggestCity", pop: "$biggestPop" },
smallestCity: { name: "$smallestCity", pop: "$smallestPop" }
}
}
] )

*/