 var count = 0;
 var arrayImmagini = [];
 function prelevaImg(){
    count = 0;
     var param ='photooftheday'; //document.getElementById('your_name').value;
    var url = 'http://www.instagram.com/explore/tags/'+param+'/?__a=1&callback?';
    //  document.getElementById('hideAfterClick').style.display='none';
      var request = new XMLHttpRequest();
      request.open('GET', url, true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
        // Success!
          var data = JSON.parse(request.responseText);
          console.log(data);
          arrayImmagini = data.graphql.hashtag.edge_hashtag_to_media.edges;
          setTimeout(updateDiv, 500)

        } else {
          // We reached our target server, but it returned an error
          console.log('errore nel prelevare il json');
          setTimeout(prelevaImg, 5000);
        }
      };

      request.onerror = function() {
        // There was a connection error of some sort
        console.log('il server non risponde');
      };
        request.send();
  }

  function updateDiv(){
    if (count < arrayImmagini.length ){
      document.getElementById('image' + Math.floor(Math.random()*9)).innerHTML='<img src="'+arrayImmagini[count].node.display_url+'">';
      count++;
      setTimeout(updateDiv, 1000);
    }
    else {
      count=0;
      setTimeout(prelevaImg, 1000);
    }
      
     
  } 
