var imageTags = document.getElementsByTagName("img"); // Returns array of <img> DOM nodes
//var $imageTags = $('img');
var authCode = "7bvWk1SFf2CBBn9R8c6KJ1P3ne0zre";
var sources = [];
var result;
var results = {};

if($.cookie("imageTags") != undefined){		
	result = $.cookie("imageTags");
}else{		
	getResult(finish);	
}

function getResult(){
	for (var i = 0; i < imageTags.length; i++) {

	   var srcURL = imageTags[i]; 
	   srcURLWidth = srcURL.clientWidth;
	   srcURLHeight = srcURL.clientHeight;

	   var src = imageTags[i].src;

	   var LIMITING_SIZE_MIN = 40;
     var LIMITING_SIZE_MAX = 3200;
	   if (typeof(srcURLWidth) != "undefined" && srcURLWidth > LIMITING_SIZE_MIN && srcURLHeight > LIMITING_SIZE_MIN
                                            && srcURLWidth < LIMITING_SIZE_MAX && srcURLHeight < LIMITING_SIZE_MAX) {
	   	  sources.push(src);
	   }	   
	}  

  	for (var i = 0; i < sources.length; i++) {      		
  		query_api(sources[i], makeHashmap);  		
  	} 

  	finish();
}

function makeHashmap(url, hash) {			
	//console.log(hash);
	for (var i = 0; i < hash.length; i++) {
		if(results[hash[i]] === undefined)
			results[hash[i]] = [];
		results[hash[i]].push(url);
	}  	
  	//console.log(results);	
}


function finish(){	
	if(result == undefined)
		result = JSON.stringify(results);
	console.log("finish");
	//console.log(result);
	$.cookie("imageTags", result);
}



function query_api(url, callback) {
  $.ajax({
    url: "https://api.clarifai.com/v1/tag/?url="+url,
    'headers': {
      'Authorization': 'Bearer ' + authCode
      },
      type: "GET",  
      async: false,  
      success: function (data) {
      	var hash = data.results[0].result.tag.classes;      	              
        callback(url, hash);
      },
      error: function(data){
        console.log("AJAX error: " + data);        
      }
  }); 

}

result