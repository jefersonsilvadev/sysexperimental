

$(document).ready(function (){

    // Bloqueio na tela inicial -> redirecionando para o login
    var usuario = sessionStorage.getItem("usuario");
    
    if (usuario == null)
    {
        location.href = "login.html";
    }

    function exibeData()
    {
        var dia = new Date();
        var mes = dia.getMonth() + 1;

        var dataFormatada = dia.getDate() + "/" + mes + "/" + dia.getFullYear() + " " +
                            dia.getHours() + ":" + dia.getMinutes() + ":" + dia.getSeconds();
        
        
        // equivalente ao innerHTML
        $("#data-hora").html(dataFormatada);

    }

    setInterval(exibeData, 500);

});