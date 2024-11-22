use "video"

let movies = db.getCollection("movieDetails")

movies.find({},{title:1,_id:0})

movies.findOne({runtime:{"$ne":null}},{runtime:1,_id:0})  //1 significa devuelve ese valor y 0 no lo devuelvas

  movies.find({}).projection({runtime:1})
   .sort({_id:-1})
   .limit(20)
   
  let arr = Object.keys({atr1:1,atr2:2})
  print(arr)
  

movies.find({}).projection({})
  .sort({_id:-1})
  .limit(100)
   
 

/*movies.find({},{})         SAME AS PREVIOUS ONE
   .sort({_id:-1})
   .limit(100)*/
db.movieDetails.find({})
   .projection({})
   .sort({_id:-1})
   .limit(100)