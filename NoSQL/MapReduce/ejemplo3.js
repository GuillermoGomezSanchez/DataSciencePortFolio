use prueba
db.orders.drop()
d1 = { cust_id: "A123", amount: 500, status: "A" }
d2 = { cust_id: "A123", amount: 250, status: "A" }
d3 = { cust_id: "B212", amount: 200, status: "A" }
d4 = { cust_id: "A123", amount: 300, status: "D" }
db.orders.insertMany([d1, d2, d3, d4])

db.orders.mapReduce(
    function () { emit(this.cust_id, this.amount); },
    function (key, values) { return Array.sum(values) },
    {
        query: { status: "A" }, out: "order_totals" //regresa solo los que tienen status A
    }
)
db.order_totals.find().pretty()

