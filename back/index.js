
//Configurando o servidor Node.js com o modulo Express
const express = require('express')
const app = express()
const port = 3000
var csv = require('node-csv').createParser();

// Instalação do modulo CORS via npm (npm install cors --save) -> um bloqueio de segurança nativo dos navegadores
var cors = require("cors");
app.use(cors());


//Conexão da API com o banco de dados
const mongodb = require("mongodb");
const url_mongo = "mongodb+srv://jeferson:abc123456789@cluster0.iefdjfb.mongodb.net/?retryWrites=true&w=majority"
const conexao = new mongodb.MongoClient(url_mongo);

//Selecionando o banco de dados e a collection
const estoque = conexao.db("sysexperimental").collection("estoque");

//Importando o módulo do ObjectId -> BSON
const ObjectId = mongodb.ObjectId;

//CRUD
// Create -> Criar -> .post
// Read -> Ler -> .get
// Update -> Atualizar
// Delete -> Apagar

app.post("/entradas", function(req, res){

})

//Lendo dados de um arquivo CSV
app.get("/entradas", function(req, res){

    csv.parseFile('estoque.csv', function(erro, valores) {
        res.json(valores);
    });
})

//route -> rota
app.get("/estoque", async function(req, res){
    
    const resultado = await estoque.find({}).toArray();
    res.json(resultado);
});

//Rota dinâmica
app.get("/estoque/:id", async function(req, res){
    const id = new ObjectId(req.params.id);

    const resultado = await estoque.find({ _id: id}).toArray();
    res.json(resultado);
});



app.listen(port, () => {
    console.log(`Rodando o servidor na porta ${port}`)
  })