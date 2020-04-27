var count = 0;
var test = 0;
function prelevaImg(){
    count = 0;
    var param = document.getElementById('your_name').value;
    var url = 'https://www.instagram.com/explore/tags/'+param+'/?__a=1&callback?';
    document.getElementById('hideAfterClick').style.display='none';
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
      // Success!
        var data = JSON.parse(request.responseText);
        console.log(data);
        test=data.graphql.hashtag.edge_hashtag_to_media.edges.length;
        for (let i=0; i<data.graphql.hashtag.edge_hashtag_to_media.edges.length; i++ ){
          var $this = data.graphql.hashtag.edge_hashtag_to_media.edges[i].node;
          document.getElementById('images').innerHTML += '<img src="'+$this.display_url+'">';
        }

        setTimeout(deleteDiv, 10000)

      } else {
        // We reached our target server, but it returned an error
        console.log('errore nel prelevare il json');
        setTimeout(prelevaImg, 1000);
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.log('il server non risponde');
    };
      request.send();
}

function deleteDiv(){
  document.getElementsByTagName('img')[0].remove();
  if(count>=test){
    prelevaImg();
  } else{
    count++;
    setTimeout(deleteDiv, 1000);
  }
}