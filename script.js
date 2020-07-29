// Milestone 1:Creare un layout base con una searchbar (una input e un button) in cui possiamoscrivere completamente o parzialmente il nome di un film. Possiamo, cliccando ilbottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ognifilm trovato:
// 1.Titolo
// 2.Titolo Originale
// 3.Lingua
// 4.Voto



// Milestone 2:Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così dapermetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5,lasciando le restanti vuote (troviamo le icone in FontAwesome).Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezzepiene (o mezze vuote :P)Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera dellanazione corrispondente, gestendo il caso in cui non abbiamo la bandiera dellanazione ritornata dall’API (le flag non ci sono in FontAwesome).Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricercadovremo prendere sia i film che corrispondono alla query, sia le serie tv, standoattenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON dirisposta diversi, simili ma non sempre identici)Qui un esempio di chiamata per le serie tv:



// MILESTONE 3:
//
// In questa milestone come prima cosa aggiungiamo la copertina del film o della serie al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo perché poi potremo generare da quella porzione di URL tante dimensioni diverse.Dovremo prendere quindi l’URL base delle immagini di TMDB:https://image.tmdb.org/t/p/​ per poi aggiungere la dimensione che vogliamo generare(troviamo tutte le dimensioni possibili a questo link:https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400​) per poi aggiungere laparte finale dell’URL passata dall’API.Esempio di URL che torna la copertina di BORIS:https://image.tmdb.org/t/p/w185/s2VDcsMh9ZhjFUxw77uCFDpTuXp.jpg




function buttonClicked (){
var targetRicerca = $('#input').val()

  $.ajax({
    url:"https://api.themoviedb.org/3/search/movie?api_key=12485dad4e901245b9d438efa6cc3407&query=" + (targetRicerca),
    method:"GET",
    success: function (data){

      var results = data['results'];
      console.log(data);

      var template = $("#template").html()
      var compiled = Handlebars.compile(template);
      var target = $("h2");
      target.html("")

      for (var i = 0; i < results.length; i++) {

        var risultato = results[i];


        risultato.vote_average = perStelline(risultato.vote_average);


        risultato.original_language = '<img id="lan" src="'+ risultato.original_language +'.png" alt="'+risultato.original_language+'">'

        risultato.poster_path = '<img src="https://image.tmdb.org/t/p/w300/'+ risultato.poster_path+'" alt="">'



        var risultatoHTML = compiled(risultato);
        target.append(risultatoHTML)
      }




    },
    error:function(){
      console.log("error");
    }
  })

// AJAX SERIE  TV

  $.ajax({

    url:"https://api.themoviedb.org/3/search/tv?api_key=12485dad4e901245b9d438efa6cc3407&query=" + (targetRicerca),
    method:"GET",
    success: function (data){

      var res = data['results'];
      console.log(data['results'][0]['origin_country']);


      var template = $("#templateSerie").html()
      var compiled = Handlebars.compile(template);
      var target = $("h3");
      target.html("")

      for (var i = 0; i < res.length; i++) {

      var risultati = res[i];

      risultati.vote_average = perStelline(risultati.vote_average);

      risultati.origin_country = '<img id="lan" src="'+ risultati.origin_country +'.png" alt="'+risultati.origin_country+'">'

      risultati.poster_path = '<img src="https://image.tmdb.org/t/p/w300/'+ risultati.poster_path+'" alt="">'


      var risultatiHTML = compiled(risultati);
      target.append(risultatiHTML)
      }

    },
    error:function(){
      console.log("error");
    }
  })

}

function perStelline (vote){
  vote = (vote/2)
  vote = Math.round(vote)


  var prova = "";
  for (var k = 0; k < vote; k++) {
    prova += '<i class="fas fa-star"></i>';

  }
  return prova;
}

function buttonClick (){
  var target = $("#bottone")
  target.click(buttonClicked);
}

function init (){
  buttonClick ()
}

$(document).ready(init)
