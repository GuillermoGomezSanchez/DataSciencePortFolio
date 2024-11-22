use db

var mapFunction2 = function() {
for (var idx = 0; idx < this.items.length; idx++) {
var key = this.items[idx].sku;
var value = { count: 1, qty: this.items[idx].qty };
emit(key, value);
}
};
var reduceFunction2 = function(keySKU, countObjVals) {
reducedVal = { count: 0, qty: 0 };
for (var idx = 0; idx < countObjVals.length; idx++) {
reducedVal.count += countObjVals[idx].count;
reducedVal.qty += countObjVals[idx].qty;
}
return reducedVal;
};
var finalizeFunction2 = function (key, reducedVal) {
reducedVal.avg = reducedVal.qty/reducedVal.count;
return reducedVal;
};

db.norders.mapReduce(
mapFunction2,
reduceFunction2,
{
out: { merge: "map_reduce_example2" },
query: { ord_date: { $gte: new Date("2020-03-01") } },
finalize: finalizeFunction2
}
);

db.map_reduce_example2.find().sort( { _id: 1 } )

db.norders.aggregate( [
{ $match: { ord_date: { $gte: new Date("2020-03-01") } } },
{ $unwind: "$items" },
{ $group: { _id: "$items.sku", qty: { $sum: "$items.qty" }, orders_ids:
{ $addToSet: "$_id" } } },
{ $project: { value: { count: { $size: "$orders_ids" }, qty: "$qty", avg:
{ $divide: [ "$qty", { $size: "$orders_ids" } ] } } } },
{ $merge: { into: "agg_alternative_3", on: "_id", whenMatched: "replace",
whenNotMatched: "insert" } }
] )

db.agg_alternative_3.find().sort( { _id: 1 } )
