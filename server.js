//Importações

const express = require("express"); //Framework que cria o servidor e as rotas
const { criarBanco } = require("./database"); //A chave que vai abrir a conexão com o banco de dados

const cors = require("cors");
const app = express(); //Inicialização: Ligando o motor do servidor

app.use(cors()); //"ATIVANDO O CORS" 
app.use(express.json()); //Tradutor: Configura o Express para entender dados enviados no formato JSON

//Criando a Rota Principal /Rota Raiz

app.get("/", (req, res) => {
    //res.send: Envia uma resposta simples (texto, html, json), com crase ao inves de aspas
    res.send(`
        <body>
        <h1> ZelaCidade </h1>
        <h2> Gestão de Problemas Urbanos </h2>
        <p> Endpoint que leva aos incidentes cadastrados: /incidentes </p>
        </body>

        `);
});



//Rota de Listagem - Para buscar todos os problemas registrados

app.get("/incidentes", async (req, res) => {
    const db = await criarBanco() //Chamamos a função do outro arquivo. O await é o "aguarde", pois o banco precissa de tempo para abrir.

    const listaIncidentes = await db.all(`SELECT * FROM incidentes`)

    res.json(listaIncidentes) //Entrega esses dados para o cliente em formato JSON
});

//Rota Especifica
app.get("/incidentes/:id", async (req, res) => {
    const { id } = req.params
    const db = await criarBanco()
    const incidenteEspecifico = await db.all(`SELECT * FROM incidentes WHERE id = ?` , [id])
        //? é um espaço reservado que será preenchido pelo valor da variavel [id]
        // ? SQL injection é usado para segurança

        res.json(incidenteEspecifico)
    
});

//Rota POST - Novos Registros /Endpoints

app.post("/incidentes", async (req,res) => {

    const {tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro} = req.body

    const db = await criarBanco()

    await db.run(`INSERT INTO incidentes(tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro) VALUES (?, ?, ?, ?, ?, ?, ?)`,[tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro])

    //Envie uma resposta de confirmação para o cliente que fez a requisição
    res.send(`Incidente novo registrado: ${tipo_problema} registrado na data ${data_registro} por ${nome_solicitante}` ,

    );

} );

//Rota de Atualização

app.put("/incidentes/:id", async (req, res) => {

    //Pega o ID do incidente que vem pela URL (ex: /incidentes/4)
    const { id } = req.params;

    //Pega os novos dados enviados no corpo da requisição (o que será atualizado)
    const {descricao, prioridade, status_resolucao} = req.body;

    //Abre a conexãocom o banco de dados
    const db = await criarBanco();

    await db.run(`
        UPDATE incidentes 
        SET descricao = ?, prioridade = ?, status_resolucao = ? 
        WHERE id = ?`, [descricao, prioridade, status_resolucao, id]
    );

    //Enviar uma resposta para o cliente
    res.send(` O incidente de ${id} foi atualizada com sucesso `);


} );

//Nota de remoção

app.delete ("/incidentes/:id", async (req, res) => {
    //Pega o ID do incidente que vem pela url (ex: /incidentes/3)
    const {id} = req.params;

    //Abre a conexão com o banco de dados
    const db = await criarBanco()

    await db.run(`
        DELETE FROM incidentes WHERE id = ?
        `, [id]),

        res.send(`O incidente de ${id} foi removido com sucesso!`);
});

//Porta do servidor

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

