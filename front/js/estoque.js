
// evento quando carregado
$(document).ready(function(){
    


    // carregar o botão click
    //$("#btn-carregar").click(function(){
        //console.log("clicou");

        var url = "http://localhost:3000/estoque/"

        // Limpando a tabela
        $("#listagem").empty();
        
        //faz a chamada AJAX para a api do backend
        $.getJSON(url, function(dados){


            // Exibição para cada item da tabela 
            dados.forEach(function(item){

                var linha = "<tr>";

                linha += "<td>" + item._id + "</td>";
                linha += "<td>" + item.nota + "</td>";
                linha += "<td>" + item.destino + "</td>";
                linha += "<td>" + item.produto + "</td>";
                linha += "<td>" + item.quantidade + "</td>";

                linha += "<td> ";
                linha += "<a href='http://localhost:3000/estoque-del/"+ item._id +"' class='btn btn-danger btn-sm' >X</a>";
                linha += " </td>";

                //Insere uma nova linha na tabela
                linha += "</tr>"

                //Coloca os novos dados na nova linha criada acima
                $("#listagem").append(linha);

            });

        });

    //}); // fim do btn-carregar
});

// Instalado um servidor front para rodar via servidor -> serve (npm install -g serve)