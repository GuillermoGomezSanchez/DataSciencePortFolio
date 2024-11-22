use db

db.norders.drop();

db.norders.insertMany([
{ _id: 1, cust_id: "Ant O. Knee", ord_date: new Date("2020-03-01"), price:
25, items: [ { sku: "oranges", qty: 5, price: 2.5 }, { sku: "apples", qty:
5, price: 2.5 } ], status: "A" },
{ _id: 2, cust_id: "Ant O. Knee", ord_date: new Date("2020-03-08"), price:
70, items: [ { sku: "oranges", qty: 8, price: 2.5 }, { sku: "chocolates",
qty: 5, price: 10 } ], status: "A" },
{ _id: 3, cust_id: "Busby Bee", ord_date: new Date("2020-03-08"), price:
50, items: [ { sku: "oranges", qty: 10, price: 2.5 }, { sku: "pears", qty:
10, price: 2.5 } ], status: "A" },
{ _id: 4, cust_id: "Busby Bee", ord_date: new Date("2020-03-18"), price:
25, items: [ { sku: "oranges", qty: 10, price: 2.5 } ], status: "A" },
{ _id: 5, cust_id: "Busby Bee", ord_date: new Date("2020-03-19"), price:
50, items: [ { sku: "chocolates", qty: 5, price: 10 } ], status: "A"},
{ _id: 6, cust_id: "Cam Elot", ord_date: new Date("2020-03-19"), price:
35, items: [ { sku: "carrots", qty: 10, price: 1.0 }, { sku: "apples", qty:
10, price: 2.5 } ], status: "A" },
{ _id: 7, cust_id: "Cam Elot", ord_date: new Date("2020-03-20"), price:
25, items: [ { sku: "oranges", qty: 10, price: 2.5 } ], status: "A" },
{ _id: 8, cust_id: "Don Quis", ord_date: new Date("2020-03-20"), price:
75, items: [ { sku: "chocolates", qty: 5, price: 10 }, { sku: "apples", qty:
10, price: 2.5 } ], status: "A" },
{ _id: 9, cust_id: "Don Quis", ord_date: new Date("2020-03-20"), price:
55, items: [ { sku: "carrots", qty: 5, price: 1.0 }, { sku: "apples", qty:
10, price: 2.5 }, { sku: "oranges", qty: 10, price: 2.5 } ], status: "A" },
{ _id: 10, cust_id: "Don Quis", ord_date: new Date("2020-03-23"), price:
25, items: [ { sku: "oranges", qty: 10, price: 2.5 } ], status: "A" }
])

var mapFunction1 = function() {
emit(this.cust_id, this.price);
};
var reduceFunction1 = function(keyCustId, valuesPrices) {
return Array.sum(valuesPrices);
};

db.norders.mapReduce(
mapFunction1,
reduceFunction1,
{ out: "map_reduce_example" }
)

db.map_reduce_example.find().sort({_id:1})

db.norders.aggregate([
{ $group: { _id: "$cust_id", value: { $sum: "$price" } } },
{ $out: "agg_alternative_1" }
])


db.agg_alternative_1.find().sort({_id:1})