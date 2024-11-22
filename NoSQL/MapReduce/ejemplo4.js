use prueba
db.orders.drop()
d1 = {
    cust_id: "abc123",
    ord_date: new Date("Oct 04, 2012"),
    status: 'A',
    price: 25,
    items: [{ sku: "m1m1", qty: 5, price: 2.5 }, { sku: "n2n4", qty: 5, price: 2.5 }]
}
db.orders.insert(d1)
var mapFun = function () {
    emit(this.cust_id, this.price);
};
var reduceFun = function (keyCust, valuePrice) {
    return Array.sum(valuePrice);
};
db.orders.mapReduce( mapFun, reduceFun, { out: "map_red_01"})

db.map_red_01.find().pretty()










