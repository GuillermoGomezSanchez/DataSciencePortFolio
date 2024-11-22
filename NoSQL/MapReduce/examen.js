use prueba;
docs =[{ "title" : "Carmencita", "year" : 1894, "imdbId" : "tt0000001", "mpaaRating" : "NOT RATED", "genre" : "Documentary, Short", "viewerRating" : 5.9, "viewerVotes" : 1032, "runtime" : 1, "director" : "William K.L. Dickson", "cast" : [ "Carmencita" ] }
,{ "title" : "Un bon bock", "year" : 1892, "imdbId" : "tt0000004", "genre" : "Animation, Short", "viewerRating" : 6.6, "viewerVotes" : 78, "director" : "èmile Reynaud" }
,{ "title" : "Edison Kinetoscopic Record of a Sneeze", "year" : 1894, "imdbId" : "tt0000008", "genre" : "Documentary, Short", "viewerRating" : 5.9, "viewerVotes" : 988, "runtime" : 1, "director" : "William K.L. Dickson", "cast" : [ "Fred Ott" ] }
,{ "title" : "Chinese Opium Den", "year" : 1894, "imdbId" : "tt0000006", "genre" : "Short", "viewerRating" : 6, "viewerVotes" : 56, "runtime" : 1, "director" : "William K.L. Dickson", "language" : "English" }
,{ "title" : "Corbett and Courtney Before the Kinetograph", "year" : 1894, "imdbId" : "tt0000007", "mpaaRating" : "NOT RATED", "genre" : "Short, Sport", "viewerRating" : 5.5, "viewerVotes" : 390, "runtime" : 1, "director" : "William K.L. Dickson, William Heise", "cast" : [ "James J. Corbett", "Peter Courtney" ] }
,{ "title" : "Autour d'une cabine", "year" : 1894, "imdbId" : "tt0000015", "genre" : "Animation, Short", "viewerRating" : 6.3, "viewerVotes" : 377, "runtime" : 2, "director" : "èmile Reynaud" }
,{ "title" : "Akrobatisches Potpourri", "year" : 1895, "imdbId" : "tt0000011", "genre" : "Documentary, Short", "viewerRating" : 5.5, "viewerVotes" : 111, "runtime" : 1, "director" : "Max Skladanowsky", "cast" : [ "Grunato" ] }
,{ "title" : "Blacksmith Scene", "year" : 1893, "imdbId" : "tt0000005", "mpaaRating" : "UNRATED", "genre" : "Short", "viewerRating" : 6.2, "viewerVotes" : 1189, "runtime" : 1, "director" : "William K.L. Dickson", "cast" : [ "Charles Kayser", "John Ott" ] }
,{ "title" : "Pauvre Pierrot", "year" : 1892, "imdbId" : "tt0000003", "genre" : "Animation, Comedy, Short", "viewerRating" : 6.7, "viewerVotes" : 566, "runtime" : 4, "director" : "èmile Reynaud" }
,{ "title" : "The Derby 1895", "year" : 1895, "imdbId" : "tt0000020", "genre" : "Documentary, Short, Sport", "viewerRating" : 5.2, "viewerVotes" : 145, "runtime" : 1, "director" : "Birt Acres" }
,{ "title" : "The Photographical Congress Arrives in Lyon", "year" : 1895, "imdbId" : "tt0000013", "mpaaRating" : "NOT RATED", "genre" : "Documentary, Short", "viewerRating" : 5.6, "viewerVotes" : 872, "runtime" : 1, "director" : "Louis Lumière", "cast" : [ "Auguste Lumiere" ] }
,{ "title" : "Jumping the Blanket", "year" : 1895, "imdbId" : "tt0000031", "genre" : "Documentary, Short", "viewerRating" : 5.5, "viewerVotes" : 435, "runtime" : 1, "director" : "Louis Lumière" }
,{ "title" : "Blacksmith Scene", "year" : 1895, "imdbId" : "tt0000022", "genre" : "Documentary, Short", "viewerRating" : 5.1, "viewerVotes" : 468, "runtime" : 1, "director" : "Louis Lumière" }
,{ "title" : "Opening of the Kiel Canal", "year" : 1895, "imdbId" : "tt0000024", "genre" : "Short, News", "viewerRating" : 5.2, "viewerVotes" : 19, "director" : "Birt Acres", "cast" : [ "Empress Augusta Victoria", "Kaiser Wilhelm II" ] }
,{ "title" : "The Sea", "year" : 1895, "imdbId" : "tt0000023", "genre" : "Documentary, Short", "viewerRating" : 5.5, "viewerVotes" : 599, "runtime" : 1, "director" : "Louis Lumière" }
,{ "title" : "Das boxende Kènguruh", "year" : 1895, "imdbId" : "tt0000018", "genre" : "Short", "viewerRating" : 5.5, "viewerVotes" : 253, "runtime" : 1, "director" : "Max Skladanowsky", "cast" : [ "Delaware" ] }
,{ "title" : "Arrivèe d'un train gare de Vincennes", "year" : 1896, "imdbId" : "tt0000034", "genre" : "Documentary, Short", "viewerRating" : 6, "viewerVotes" : 44, "director" : "Georges Mèliès" }
,{ "title" : "Italienischer Bauerntanz", "year" : 1895, "imdbId" : "tt0000017", "genre" : "Documentary, Short", "viewerRating" : 5.2, "viewerVotes" : 103, "runtime" : 1, "director" : "Emil Skladanowsky, Max Skladanowsky", "cast" : [ "Ploetz", "Larella" ] }
,{ "title" : "Die Serpentintènzerin", "year" : 1895, "imdbId" : "tt0000032", "genre" : "Short", "viewerRating" : 5.4, "viewerVotes" : 183, "runtime" : 1, "director" : "Max Skladanowsky", "cast" : [ "Ancion" ] }
,{ "title" : "Bataille de neige", "year" : 1897, "imdbId" : "tt0000041", "genre" : "Short, Documentary", "viewerRating" : 6.8, "viewerVotes" : 804, "runtime" : 1, "director" : "Louis Lumiere" }
]

print(docs.length)
db.examen.drop()
db.examen.insertMany(docs);

