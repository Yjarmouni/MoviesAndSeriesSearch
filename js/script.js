function search() {

  var result = document.getElementById('result');
  var query=document.getElementById('inputTitle').value; //get search query
  var type;

  if(document.getElementById("movie").checked) 
    type="movie";
  else
    type="series";

  var url="http://www.omdbapi.com/?s="+query+"&type="+type; 
 
  $(".loader").fadeIn(300); //loading image on

    var xhttp = new XMLHttpRequest(); //ajax for search query
    var imdb = new XMLHttpRequest(); //ajax to get a movie info


      imdb.onreadystatechange = function() {

            if (imdb.readyState == 4 && imdb.status == 200) {

            var resText=imdb.responseText;
            var resJson=JSON.parse(resText);
            print(resJson);

            }


            function print(item){ //clone hidden model (#result), edit it, append it onto the page 

              if(item.Plot=='N/A')
                item.Plot="No description available.";
              if(item.Actors=='N/A')
                item.Actors="Unknown";

              var node=document.getElementById('result').cloneNode(true);
              var url ="http://www.imdb.com/title/";
              var img ="<img src='http://icons.iconarchive.com/icons/cornmanthe3rd/plex-android/48/imdb-icon.png'></img>"
              if(item.Poster=="N/A") node.getElementsByTagName("img")[0].src="http://members.xoom.it/nlc/nlcpics/nopic.gif";
              else node.getElementsByTagName("img")[0].src=item.Poster;


              node.getElementsByTagName("h2")[0].innerHTML=item.Title;
              node.getElementsByTagName("div")[6].innerHTML = "<strong>Year</strong> : " + item.Year+"<br /> <strong>Genre</strong> : "+item.Genre ;
              node.getElementsByTagName("div")[7].innerHTML = "<strong>Actors</strong> : "+item.Actors;
              node.getElementsByTagName("div")[8].innerHTML = "<a id='imdb' href='" + url + item.imdbID +"'>"+ img +"</a>" ;
              node.getElementsByTagName("div")[9].innerHTML = "<p id='description'>"+ item.Plot +"</p>" ;


              node.style.visibility='visible';
              document.getElementById('res').appendChild(node);

            }
     

     };



    xhttp.onreadystatechange = function() {

      if (xhttp.readyState == 4 && xhttp.status == 200) {

      var resText=xhttp.responseText;
      var resJson=JSON.parse(resText);


      document.getElementById('res').innerHTML='';

      if(resJson.Response=="True"){
      for(var i=0;i<resJson.Search.length;i++){
        imdb.open("GET", "http://www.omdbapi.com/?&plot=full&i="+resJson.Search[i].imdbID, false);
        imdb.send();
      }}
      else
        document.getElementById('res').innerHTML="<h2>"+resJson.Error+"</h2>"

      $(".loader").fadeOut(500);
    
      document.querySelector('#res').scrollIntoView();
      
      
      
       
      }
     

    };


    xhttp.open("GET", url, true);

    xhttp.send();
  return false;
}