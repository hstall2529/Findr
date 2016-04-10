var key = "";

$.ajax({
    url: "https://vision.googleapis.com/v1/images:annotate?key=" + key,    
    type: "GET",    
    success: function (data) {
        console.log(data);
        $.cookie('imageTags', JSON.stringify(data));
        result = JSON.stringify(data);
    },
      error: function(data){
        console.log("AJAX error: " + data);
    }
  }); 