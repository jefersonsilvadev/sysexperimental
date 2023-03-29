
//Configurando o servidor Node.js com o modulo Express
const express = require('express');
const app = express();
const port = 3000;
var csv = require('node-csv').createParser();

// Instalação do modulo CORS via npm (npm install cors --save) -> um bloqueio de segurança nativo dos navegadores
var cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Conexão da API com o banco de dados
const mongodb = require("mongodb");
const url_mongo = "mongodb+srv://jeferson:abc123456789@cluster0.iefdjfb.mongodb.net/?retryWrites=true&w=majority"
const conexao = new mongodb.MongoClient(url_mongo);

//Selecionando o banco de dados e a collection
const estoque = conexao.db("sysexperimental").collection("estoque");

//Importando o módulo do ObjectId -> BSON
const ObjectId = mongodb.ObjectId;

//Importando criptografia
const sha1 = require('sha1');

//CRUD
// Create -> Criar -> .post
// Read -> Ler -> .get
// Update -> Atualizar
// Delete -> Apagar

app.post("/entradas", function(req, res){

});

//Lendo dados de um arquivo CSV
app.get("/entradas", function(req, res){

    csv.parseFile('estoque.csv', function(erro, valores) {
        res.json(valores);
    });
});


//route -> rota
app.get("/estoque", async function(req, res){
    
    const resultado = await estoque.find({}).toArray();
    res.json(resultado);

});


//Exportar arquivo csv
app.get("/estoque-csv", async function(req, res){

    const resultado = await estoque.find({}).toArray();

    let arquivoCSV = "id,nota,destino,produto,quantidade\n";

    resultado.forEach(function(item){
        arquivoCSV += 
            item._id + "," +
            item.nota + "," +
            item.destino + "," + 
            item.produto + "," +
            item.quantidade + "\n";

    })

    res.append("content-type" , "text/csv");
    res.send(arquivoCSV)

});


//Rota dinâmica
app.get("/estoque/:id", async function(req, res){

    const id = new ObjectId(req.params.id);
    const resultado = await estoque.findOne({ _id: id});
    res.json(resultado);

});



//Cadastrar novo item no estoque
app.post("/estoque-add", async function(req, res) {

    const resultado = await estoque.insertOne(req.body);
    const origem = req.get("Referer");
    res.redirect(origem);

});


// atualiza um registro
app.post("/estoque-up" , async function(req , res) {

    const codigo = new ObjectId (req.body.codigo);

    const dados = {
        $set: {
            nota: req.body.nota,
            produto: req.body.produto,
            quantidade: req.body.quantidade,
            destino: req.body.destino
        }
    }

    const resultado = await estoque.updateOne({ _id: codigo} , dados);

    const origem = req.get("Referer");
    res.redirect(origem);
    
});


// Deletar item
app.get("/estoque-del/:id", async function(req, res){
    const id = new ObjectId( req.params.id );

    const resultado = await estoque.deleteOne({ _id: id });
    
    const origem = req.get("Referer");
    res.redirect(origem);
});


// Rota de login
app.post("/login" , async function(req, res){

    var usuario = req.body.email;
    var senha = req.body.senha;

    var hash = sha1(senha);

    const usuarios = conexao.db("sysexperimental").collection("usuarios");

    var logado = await usuarios.findOne({ _id:usuario, senha:hash})

       
    if(logado != null) {
        res.send({ status: "ok"});
    } else {
        res.send({ status: "erro" , "mensagem": "Usuário ou senha não encontrados"});
    }
});

app.listen(port, () => {
    console.log(`Rodando o servidor na porta ${port}`)
}); 