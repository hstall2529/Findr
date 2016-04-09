var imageTags = document.getElementsByTagName("img"); // Returns array of <img> DOM nodes
var authCode = "7bvWk1SFf2CBBn9R8c6KJ1P3ne0zre";
var sources = [];
for (var i in imageTags) {
   var src = imageTags[i].src;
   sources.push(src);
}

console.log(sources);
console.log("test");

$.ajax({
	url: "https://api.clarifai.com/v1/tag/",
	beforeSend: function(xhr) { 
      xhr.setRequestHeader("Authorization", "Bearer " + authCode); 
    },
    type: "POST",
    dataType: 'json',
    contentType: 'application/json',
    data: {url: sources[0]},
    success: function (data) {
      $.cookie('imageTags', data, {expires: 7});
    },
    error: function(){
      console.log("AJAX error");
    }
})