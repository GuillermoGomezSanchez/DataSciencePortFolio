use db

db.usersessions.drop();

db.usersessions.insertMany([
{ userid: "a", start: ISODate('2020-03-03 14:17:00'), length: 95 },
{ userid: "b", start: ISODate('2020-03-03 14:23:00'), length: 110},
{ userid: "c", start: ISODate('2020-03-03 15:02:00'), length: 120},
{ userid: "d", start: ISODate('2020-03-03 16:45:00'), length: 45 },
{ userid: "a", start: ISODate('2020-03-04 11:05:00'), length: 105},
{ userid: "b", start: ISODate('2020-03-04 13:14:00'), length: 120},
{ userid: "c", start: ISODate('2020-03-04 17:00:00'), length: 130},
{ userid: "d", start: ISODate('2020-03-04 15:37:00'), length: 65 }
])
db.usersessions.insertMany([
{ userid: "a", ts: ISODate('2020-03-05 14:17:00'), length: 130 },
{ userid: "b", ts: ISODate('2020-03-05 14:23:00'), length: 40 },
{ userid: "c", ts: ISODate('2020-03-05 15:02:00'), length: 110 },
{ userid: "d", ts: ISODate('2020-03-05 16:45:00'), length: 100 }
])

var mapFunction = function() {
var key = this.userid;
var value = { total_time: this.length, count: 1, avg_time: 0 };
emit( key, value );
};
var reduceFunction = function(key, values) {
var reducedObject = { total_time: 0, count:0, avg_time:0 };
values.forEach(function(value) {
reducedObject.total_time += value.total_time;
reducedObject.count += value.count;
});
return reducedObject;
};
var finalizeFunction = function(key, reducedValue) {
if (reducedValue.count > 0)
reducedValue.avg_time = reducedValue.total_time / reducedValue.count;
return reducedValue;
};

db.usersessions.mapReduce(
mapFunction,
reduceFunction,
{
out: "session_stats",
finalize: finalizeFunction
}
)
db.session_stats.find().sort( { _id: 1 } )

db.usersessions.mapReduce(mapFunction,
reduceFunction,
{
query: { ts: { $gte: ISODate('2020-03-05 00:00:00') } },
out: { reduce: "session_stats" },
finalize: finalizeFunction
}
)

db.usersessions.drop();
db.usersessions.insertMany([
{ userid: "a", start:ISODate('2020-03-03 14:17:00'), length: 95 },
{ userid: "b", start:ISODate('2020-03-03 14:23:00'), length: 110 },
{ userid: "c", start:ISODate('2020-03-03 15:02:00'), length: 120 },
{ userid: "d", start:ISODate('2020-03-03 16:45:00'), length: 45 },
{ userid: "a", start:ISODate('2020-03-04 11:05:00'), length: 105 },
{ userid: "b", start:ISODate('2020-03-04 13:14:00'), length: 120 },
{ userid: "c", start:ISODate('2020-03-04 17:00:00'), length: 130 },
{ userid: "d", start:ISODate('2020-03-04 15:37:00'), length: 65 }
])


db.usersessions.aggregate([
{ $group: {_id: "$userid", total_time: {$sum: "$length" }, count: {$sum:
1 }, avg_time: {$avg: "$length" }}},
{ $project: { value: { total_time: "$total_time", count: "$count",
avg_time: "$avg_time" } } },
{ $merge: {
into: "session_stats_agg",
whenMatched: [ { $set: {
"value.total_time": {$add: ["$value.total_time",
"$$new.value.total_time" ] },
"value.count": {$add: ["$value.count", "$$new.value.count" ] },
"value.avg": {$divide: [{$add: ["$value.total_time",
"$$new.value.total_time"]},
{$add: ["$value.count", "$$new.value.count" ] } ] }
} } ],
whenNotMatched: "insert"
}}
])

db.session_stats_agg.find().sort( { _id: 1 })