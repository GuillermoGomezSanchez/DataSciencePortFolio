// Create Operations
use unir
let inventory = db.getCollection('inventory') // db.inventory
inventory.drop()
let doc = { 'item': "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }

// Insertar un documento
inventory.insertOne(doc)

//Obtener el documento insertado
let cur = inventory.find( { item: "canvas" } )
//Recorrer el cursor
while(cur.hasNext()){
print(cur.next())
}


// Insertar varios documentos
let docs = [
{ item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
{ item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
{ item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
]
inventory.insertMany(docs)

// Obtener todos los documentos
let cursor = inventory.find()
while (cursor.hasNext()){
print(cursor.next())
}

// Consultas de documentos
inventory.drop()
docs = [
{ item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, estado: "B" },
{ item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, estado: "A" },
{ item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, estado: "B" },
{ item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, estado: "D" },
{ item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, estado: "A" }
]
inventory.insertMany(docs)

// Especificar condición de igualdad (predicado)
inventory.find( { estado: "D" } )

/************************************************************************************************
Especificar condiciones mediante operadores de consulta
Aunque se puede expresar esta consulta mediante el operador $or, utilizamos el operador $in en
lugar del operador $or cuando realice comprobaciones de igualdad en el mismo campo.
*************************************************************************************************/

inventory.find( { estado: { $in: [ "A", "D" ] } } )

/**********************************************************************************************************
Especificar condiciones OR
Con el operador $or, puede especificar una consulta compuesta que une cada cláusula con una conjunción
lógica OR para que la consulta seleccione los documentos de la colección que cumplan al menos una condición.
************************************************************************************************************/

inventory.find( { $or: [ { estado: "A" }, { qty: { $lt: 30 } } ] } )

/*******************************************************************************************************
* Especificar condiciones AND
Una consulta compuesta puede especificar condiciones para más de un campo en los documentos de la colección.
Implícitamente, una conjunción AND lógica conecta las cláusulas de una consulta compuesta para que la
consulta seleccione los documentos de la colección que coincidan con todas las condiciones
********************************************************************************************************* */

inventory.find( { estado: "A", qty: { $lte: 45 } } )
inventory.find( {$and: [ {estado: "A"}, {qty: { $lte: 45 }}]})

/*********************************************************************************************************
* Especificar condiciones AND y OR en un predicado compuesto
* En la consulta se utiliza una expresión regular:que item comience con el caracter p
*
**********************************************************************************************************/
inventory.find( {
estado: "A",
$or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
} )

/****************************************************************++
* Consultas de los documentos embebidos o anidados
* Seguimos los ejemplos del tutorial
* **************************************************************/

inventory.drop()
docs = [
{ item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, estado: "A" },
{ item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, estado: "A" },
{ item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, estado: "D" },
{ item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, estado: "D" },
{ item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, estado: "A" }
]

inventory.insertMany(docs)
/******************************************************************************
* Consulta de igualdad de todo el documento embebido
* ***************************************************************************/

db.inventory.find( { size: { h: 14, w: 21, uom: "cm" } } ) //No record found

/******************************************************************************
* Consulta de igualdad de un campo del documento embebido
* ***************************************************************************/

inventory.find( { "size.uom": "in" } ) // Dos documentos

/******************************************************************************
* Consultar los campos de un arreglo. No vacío
*****************************************************************************/
docs = [
{ item: "journal", qty: 25, tags: ["blank", "red"], dim_cm: [ 14, 21 ] },
{ item: "notebook", qty: 50, tags: ["red", "blank"], dim_cm: [ 14, 21 ] },
{ item: "paper", qty: 100, tags: ["red", "blank", "plain"], dim_cm: [ 14, 21 ] },
{ item: "planner", qty: 75, tags: ["blank", "red"], dim_cm: [ 22.5, 30 ] },
{ item: "postcard", qty: 45, tags: ["blue"], dim_cm: [ 10, 15.25 ] }
]

inventory.drop()
inventory.insertMany(docs)
inventory.find( { tags: ["red", "blank"] } ) // Comparación de igualdad de todo el arreglo

//Qué piensan lo que realiza esta búsqueda?

inventory.find( { tags: { $all: ["red", "blank"] } } ) //todos los tags dentro del arreglo en la busqueda se encuentran en los registros

// Y esta búsqueda?
inventory.find( { tags: "red" } ) //al menos tiene el tag red

//Y esta búsqueda?
inventory.find( { dim_cm: { $gt: 15, $lt: 20 } } ) //dim-cm tiene valores mayores a 15 y valores menores a 20

// Y esta búsqueda?
/****************************************************************
* El arreglo dim_cm contiene al menos un elemento que es mayor
* de 22 y menor de 30
* *************************************************************/
inventory.find( { dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } } } )

//Consultar los elementos de un arreglo por la posición que ocupan. Las posiciones inician desde 0

inventory.find( { "dim_cm.1": { $gt: 25 } } )

//Consultar un arreglo por su longitud
inventory.find( { "tags": { $size: 3 } } )


/********************************************************************
* Consultar arreglos con documentos embebidos
* *****************************************************************/
inventory.drop()
docs = [
{ item: "journal", instock: [ { warehouse: "A", qty: 5 }, { warehouse: "C", qty: 15 } ] },
{ item: "notebook", instock: [ { warehouse: "C", qty: 5 } ] },
{ item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 15 } ] },
{ item: "planner", instock: [ { warehouse: "A", qty: 40 }, { warehouse: "B", qty: 5 } ] },
{ item: "postcard", instock: [ { warehouse: "B", qty: 15 }, { warehouse: "C", qty: 35 } ] }
]
inventory.insertMany(docs)

inventory.find( { "instock": { warehouse: "A", qty: 5 } } ) //toma en cuenta el orden de los valores
inventory.find( { "instock": { qty: 5, warehouse: "A" } } ) // No records

//Especificar una condición de búsqueda en un campo de un arreglo de documentos
inventory.find( { 'instock.qty': { $lte: 20 } } ) // Todos los documentos cumplen

// Utilizar el índice del arreglo para una consulta
inventory.find( { 'instock.0.qty': { $lte: 20 } } ) // Tres documentos cumplen la condición

// Especificar predicados compuestos en un arreglo con documentos
inventory.find( { "instock": { $elemMatch: { qty: 5, warehouse: "A" } } } ) // 1 documento AL MENOS UN ELEMENTO CUMPLE TODO ESO (elemmatch), NO IMPORTA EL ORDEN
inventory.find( { "instock": { $elemMatch: { qty: { $gt: 10, $lte: 20 } } } } ) // 3 documentos AL MENOS UN QTY DEL ARREGLO LO CUMPLE AMBAS

// Analice esta consulta y compárela con la anterior
inventory.find( { "instock.qty": { $gt: 10, $lte: 20 } } ) //4 documentos. No necesariamente el mismo documento
//aunque sean diferentes qty, la combinacion de ellas cumplen los parametros establecidos