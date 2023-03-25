
// evento quando carregado
$(document).ready(function(){
    

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
            linha += "<button codigo='"+ item._id +"' class = 'btn-editar btn btn-primary btn-sm' > E </button>";
            linha += " </td>";

                
            linha += "</tr>"

            //Coloca os novos dados na nova linha criada acima
            $("#listagem").append(linha);

        }); //fim do forEach

        // Abrir modal
        $(".btn-editar").click(function(){


            const id = $(this).attr("codigo");


            // carregado o modal
            const modalEditar = new bootstrap.Modal('#modal-editar');
            modalEditar.show()
            


            $.getJSON(url + "/" + id , function (dados){
                
                $("#nota").val(dados.nota)
                $("#produto").val(dados.produto)
                $("#quantidade").val(dados.quantidade)
                $("#destino").val(dados.destino)

            }); // fim do getJson

        });// fim do btn-editar

    }); // fim do getJson


});

// Instalado um servidor front para rodar via servidor -> serve (npm install -g serve)