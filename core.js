function prelevaImg(){
    var param = document.getElementById('your_name').value;
    var url = 'https://www.instagram.com/explore/tags/'+param+'/?__a=1&callback?';
    document.getElementById('hideAfterClick').style.display='none';
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
      // Success!
        var data = JSON.parse(request.responseText);
        count = (data.graphql.hashtag.edge_hashtag_to_media.count);
        console.log(data);
        for (let i=0; i<72; i++ ){
          var $this = data.graphql.hashtag.edge_hashtag_to_media.edges[i].node;
          document.getElementById('images').innerHTML += '<img src="'+$this.display_url+'">';
        }

        setInterval(function(){
          document.getElementsByTagName('img')[0].remove();
        }, 30000);

      } else {
        // We reached our target server, but it returned an error
        console.log('errore nel prelevare il json');
        setTimeout(prelevaImg, 30000);
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.log('il server non risponde');
    };
      request.send();
}

