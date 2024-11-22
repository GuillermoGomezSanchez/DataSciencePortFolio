use prueba
d1 = {
    cust_id: "abc123",
    ord_date: new Date("Oct 04, 2011"),
    status: 'A',
    price: 25,
    items: [{ sku: "mmm", qty: 5, price: 2.5 },
    { sku: "nnn", qty: 5, price: 2.5 }]
}
d2 = {
    cust_id: "abc456",
    ord_date: new Date("Nov 04, 2012"),
    status: 'A',
    price: 45,
    items: [{ sku: "mmm", qty: 10, price: 2.5 },
    { sku: "nnn", qty: 8, price: 2.5 }]
}

db.orders.drop()
db.orders.insertMany([d1, d2])
var mapFunction = function () {
    for (var idx = 0; idx < this.items.length; idx++) {
        var key = this.items[idx].sku;
        var value = {
            count: 1,
            qty: this.items[idx].qty
        };
        emit(key, value);
    }
};
var reduceFunction = function (keySKU, countObjVals) {
    reducedVal = { count: 0, qty: 0 };

    for (var idx = 0; idx < countObjVals.length; idx++) {
        reducedVal.count += countObjVals[idx].count;
        reducedVal.qty += countObjVals[idx].qty;
    }

    return reducedVal;
};

var finalizeFunction = function (key, reducedVal) {

    reducedVal.avg = reducedVal.qty / reducedVal.count;

    return reducedVal;

};

db.orders.mapReduce(mapFunction,
    reduceFunction,
    {
        out: { merge: "totalypromedio" },
        query: {ord_date:{ $gt: new Date('01/01/2012') }
        },
        finalize: finalizeFunction
    }
)
db.totalypromedio.find().pretty()

