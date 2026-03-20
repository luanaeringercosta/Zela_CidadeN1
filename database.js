const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const criarBanco = async () => {
    const db = await open({
        filename: "./database.db",
        driver: sqlite3.Database, 
    });

    //Criando a tabela de incidentes

    await db.exec(`
        CREATE TABLE IF NOT EXISTS incidentes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo_problema TEXT,         --O que aconteceu (buraco, assalto)
        localizacao TEXT,           --Onde aconteceu (Rua, Bairro)
        descricao TEXT,              --Detalhes da reclamação
        prioridade TEXT,            --Baixa, Média ou Alta
        nome_solicitante TEXT,      --Quem está avisando
        data_registro TEXT,         --Data em formato (ex: 16/03 16.03)
        hora_registro TEXT,         --Hora que foi registrado
        status_resolucao TEXT DEFAULT 'Pendente'    -- O banco define automaticamente como 'Pendente'
        )
        `);

        console.log(
            "Banco de dados configurado: A tabela de registros urbanos está pronta",
        );


        //===========================
        // Insert -C de CRUD - CREATE
        //===========================



    const checagem = await db.get(`SELECT COUNT(*) As total FROM incidentes`);

    if(checagem.total === 0) {
        await db.exec(`
            INSERT INTO incidentes(tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro) VALUES
            ("iluminacao", "Rua da Flores, 123, Bairro das Margaridas", "Poste queimado há dias", "Média", "Ana Clara", "16/03/2026", "10:30"),

            ("Falta de energia", "Hospital JP2", "Local na escuridão", "Alta", "Antonio Perna Quebrada", "16/03/2026", "22:15"),

            ("Iluminação", "São Paulo (SP)", "Poste Queimado", "Média", "Ana Clara", "16/03/2026", "18:00"),

            ("Galho de arvore na rede eletrica", "Tamoios", "Rua sem energia", "Alta", "José Bonifácio", "16/03/2026", "13:00")


            `);
} else {
    console.log(`Banco pronto com ${checagem.total} de incidentes`);
}




        
    // =======================
    // SELECT -R DO CRUD - READ
    // =========================

    const todosOsIncidentes = await db.all("SELECT * FROM incidentes");
  console.table(todosOsIncidentes);


  //Exemplo de SELECT especifico

  const chamadosAna = await db.all(`SELECT * FROM incidentes WHERE nome_solicitante = "Ana Clara" `,

  );
  console.table(chamadosAna);

  //UPDATE

  await db.run(`
    UPDATE incidentes 
    SET status_resolucao = "Em Análise"
    WHERE data_registro = "16/03/2026"
    `)

    console.log("Todas as reclamações do dia 16/03/2016 tiveram uma atualização");

//UPDATE
await db.run(`
    UPDATE incidentes
    SET status_resolucao = "Resolvido"
    WHERE tipo_problema = "Falta de energia"
    `)
    console.log("Problema resolvido");

    //DELETE!!!!!!!
    await db.run(`DELETE FROM incidentes WHERE id = 2`);
    console.log("Registro do ID 2 removido");

    //Relatorio/SELECT final
    console.log("Relatório Atualizado(FINAL)");

    const resultadoFinal = await db.all(`SELECT * FROM incidentes`);
    console.table(resultadoFinal);
return db
};
module.exports = { criarBanco }
criarBanco()