
$(document).ready(function(){
    
    $("#btn-carregar").click(function(){
        console.log("clicou");

        var url = "http://localhost:3000/estoque/"
        
        $.getJSON(url, function(dados){

            $("#listagem").empty();

            dados.forEach(function(item){

                var linha = "<tr>";

                linha += "<td>" + item._id + "</td>";
                linha += "<td>" + item.nota + "</td>";
                linha += "<td>" + item.destino + "</td>";
                linha += "<td>" + item.produto + "</td>";
                linha += "<td>" + item.quantidade + "</td>";

                linha += "</tr>"

                $("#listagem").append(linha);

            });

        });

    }); // fim do btn-carregar
});

// Instalado um servidor front para rodar via servidor -> serve (npm install -g serve)