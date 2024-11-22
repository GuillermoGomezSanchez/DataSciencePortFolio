db.books.find({})
   .projection({})
   .sort({_id:-1})
   .limit(100)
   
db.books.find({}, {thumbnailUrl: 0, longDescription: 0, shortDescription:
0 }).limit(3)

db.books.distinct("authors")

db.books.distinct("title", {authors: "Vlad Landres"})

db.books.find({authors:"Vlad Landres"},{_id:0, isbn:1, author:1, title:1})

db.books.find({pageCount: {$gt:100} }, {_id:0, isbn:1, author:1, title:1,
pageCount:1}).limit(3)

//titulos que tengan palabra internet
db.books.find({title: {$regex: ".*Internet"} }, {_id:0, isbn:1, author:1,
title:1})

db.books.find({title: {$regex: ".*Internet"}}).count()

db.books.update({title: {$regex: ".*Internet"}}, {$addToSet: {tags:
"Internet"}}, {multi: true})
db.books.find({title: {$regex: ".*Internet"} }, {_id:0, isbn:1, author:1,title:1, tags:1}

db.books.update({}, {$unset: {tags: ""}}, {multi: true})

db.books.find({title: {$regex: ".*Internet"} }, {_id:0, isbn:1, author:1,
title:1, tags:1})
//libro de 2 categorias diferentes
db.books.find({$or: [ {categories: "PowerBuilder"}, {categories: "Client-Server"}]}, {_id:0, title:1, isbn:1, categories:1})