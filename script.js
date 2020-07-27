// Milestone 1:Creare un layout base con una searchbar (una input e un button) in cui possiamoscrivere completamente o parzialmente il nome di un film. Possiamo, cliccando ilbottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ognifilm trovato:
// 1.Titolo
// 2.Titolo Originale
// 3.Lingua
// 4.Voto
//


function buttonClicked (){
  $.ajax({
    url:"https://api.themoviedb.org/3/search/movie?api_key=12485dad4e901245b9d438efa6cc3407&query=ritorno+al+futuro",
    method:"GET",
    success: function (data){
      var results = data['results'];
      console.log(data);

      var target = $("h2");
      var compiled = Handlebars.compile(template);
      var template = $("#template").html()

      for (var i = 0; i < results.length; i++) {
        var risulato = results[i]
        var risultatoHTML = compiled(risultato);
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
