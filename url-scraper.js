var imageTags = document.getElementsByTagName("img"); // Returns array of <img> DOM nodes
//var $imageTags = $('img');
var authCode = "7bvWk1SFf2CBBn9R8c6KJ1P3ne0zre";
var sources = [];
var result;
var results = [];

if($.cookie("imageTags") != undefined){		
	result = $.cookie("imageTags");
}else{		
	for (var i = 0; i < imageTags.length; i++) {

	   var srcURL = imageTags[i]; 
	   srcURLWidth = srcURL.clientWidth;
	   srcURLHeight = srcURL.clientHeight;

	   var src = imageTags[i].src;

	   var LIMITING_SIZE = 10;
	   if (typeof(srcURLWidth) != "undefined" && srcURLWidth > LIMITING_SIZE && srcURLHeight > LIMITING_SIZE) {
	   	  sources.push(src);
	   }

	}
  console.log("runs");
	// function getMeta(url){
	//     $("<img/>",{
	//         load : function(){ console.log(this.width+' '+this.height); },
	//         src  : url
	//     });
	// }

	setTimeout(function(){
		console.log(sources);
	}, 3000);
	console.log("test");

  for (var i = 0; i < imageTags.length; i++) {
    if (imageTags[i].clientWidth > LIMITING_SIZE && imageTags[i].clientHeight > LIMITING_SIZE) {
      query_api(imageTags[i], appendResult);
    }
  }


	
}

function appendResult(res) {
  results.push(res);
  console.log(results);
}



function query_api(url, callback) {

  $.ajax({
    url: "https://api.clarifai.com/v1/tag/?url=http://media.mydogspace.com.s3.amazonaws.com/wp-content/uploads/2013/08/puppy-500x350.jpg",
    'headers': {
      'Authorization': 'Bearer ' + authCode
      },
      type: "GET",    
      success: function (data) {
        console.log(data);
        $.cookie('imageTags', JSON.stringify(data));
        result = JSON.stringify(data);
        callback(result);
      },
      error: function(data){
        console.log("AJAX error: " + data);
      }
  }); 

}

result