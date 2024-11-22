textos =[{ text: "Peter Piper picked a peck of pickled peppers" },
{ text: "A peck of pickled peppers Peter Piper picked" },
{ text: "If Peter Piper picked a peck of pickled peppers" },
{ text: "Where's the peck of pickled peppers Peter Piper picked?" }]
db.borrame.drop()
db.borrame.insertMany(textos)
function wordMap() {
    // Genera un arreglo de palabras para cada documento
    var words = this.text.match(/\w+/g); //globally any word character + matchesprevious token between one and unlimited times
    if (words === null) 
        return;
    for (var i = 0; i < words.length; i++) {
        //emite cada palabra con count 1
        emit(words[i], { count : 1 });
    }
}
function wordReduce(key, values) {
    var total = 0;
    for (var i = 0; i < values.length; i++) {
        total += values[i].count;
    }
    return { count : total };
}
db.borrame.mapReduce(wordMap, wordReduce,{out: 'Stats'})
db.Stats.find().pretty()







