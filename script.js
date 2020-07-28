// Milestone 1:Creare un layout base con una searchbar (una input e un button) in cui possiamoscrivere completamente o parzialmente il nome di un film. Possiamo, cliccando ilbottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ognifilm trovato:
// 1.Titolo
// 2.Titolo Originale
// 3.Lingua
// 4.Voto



// Milestone 2:Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così dapermetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5,lasciando le restanti vuote (troviamo le icone in FontAwesome).Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezzepiene (o mezze vuote :P)Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera dellanazione corrispondente, gestendo il caso in cui non abbiamo la bandiera dellanazione ritornata dall’API (le flag non ci sono in FontAwesome).Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricercadovremo prendere sia i film che corrispondono alla query, sia le serie tv, standoattenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON dirisposta diversi, simili ma non sempre identici)Qui un esempio di chiamata per le serie tv:

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

        var risulato = results[i]
        risulato.vote_average = (risulato.vote_average/2)
        risulato.vote_average = Math.round(risulato.vote_average)
        console.log(risulato.vote_average);

        for (var i = 0; i < risulato.vote_average; i++) {
          var targetStella = $('#targetStella')
          targetStella.append('<i class="fas fa-star"></i>');

        }

        var risultatoHTML = compiled(risulato);
        target.append(risultatoHTML)
      }

    },
    error:function(){
      console.log("error");
    }
  })
}


function buttonClick (){
  var target = $("#bottone")
  target.click(buttonClicked);
}

function init (){
  buttonClick ()
}

$(document).ready(init)
