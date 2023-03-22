
//Configurando o servidor Node.js com o modulo Express
const express = require('express')
const app = express()
const port = 3000
var csv = require('node-csv').createParser();


//Conexão da API com o banco de dados
const mongodb = require("mongodb");
const url_mongo = "mongodb+srv://jeferson:abc123456789@cluster0.iefdjfb.mongodb.net/?retryWrites=true&w=majority"
const conexao = new mongodb.MongoClient(url_mongo);

//CRUD
// Create -> Criar -> .post
// Read -> Ler -> .get
// Update -> Atualizar
// Delete -> Apagar

app.post("/entradas", function(req, res){

})

app.get("/entradas", function(req, res){

    csv.parseFile('estoque.csv', function(erro, valores) {
        res.json(valores);
    });
})

//route -> rota
app.get("/estoque", async function(req, res){
    const estoque = conexao.db("sysexperimental").collection("estoque");

    const resultado = await estoque.find({}).toArray();
    res.json(resultado);
});

//Rota dinâmica
app.get("/estoque/:id", function(req, res){
    res.json(req.params);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })