var imageTags = document.getElementsByTagName("img"); // Returns array of <img> DOM nodes
var sources = [];
for (var i in imageTags) {
   var src = imageTags[i].src;
   sources.push(src);
}

console.log(sources);
console.log("test");

