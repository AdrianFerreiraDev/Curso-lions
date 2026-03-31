const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let proximoId = 1;
let alunos = [];

function mostrarMenu() {
    console.log("\n====================");
    console.log("SISTEMA ESCOLAR");
    console.log("====================");
    console.log("1 - Cadastrar Aluno");
    console.log("2 - Listar Aluno");
    console.log("3 - Buscar por ID");
    console.log("4 - Atualizar Aluno");
    console.log("5 - Remover Aluno");
    console.log("6 - Mostrar Alunos Aprovados");
    console.log("7 - Mostrar Alunos Reprovados");
    console.log("0 - Sair");
    console.log("====================");

    rl.question("Escolha uma opção: ", (opcao) => {
        if (opcao === "1") {
            cadastrarAluno();
        } else if (opcao === "2") {
            listarAluno();
        } else if (opcao === "3") {
            buscarAlunoPorId();
        }
    })
}

function listarAluno() {
    console.log("Listar Alunos");

    if (alunos.length === 0) {
        console.log("Nenhum aluno cadastrado");
        mostrarMenu();
        return;
    }

    for (let i = 0; i < alunos.length; i++) {
        console.log("\nID:", alunos[i].id);
        console.log("\nNome:", alunos[i].nome);
        console.log("\nIdade:", alunos[i].idade);
        console.log("\nTurma:", alunos[i].turma);
        console.log("\nNota:", alunos[i].nota);
    }

    mostrarMenu();
}

function cadastrarAluno() {
    console.log("Cadastrar aluno");

    rl.question("Digite o nome do aluno: ", (nome) => {
        rl.question("Digite a idade do aluno: ", (idade) => {
            rl.question("Digite a turma do aluno: ", (turma) => {
                rl.question("Digite a nota do aluno: ", (nota) => {
                    idade = Number(idade);
                    nota = Number(nota);

                    if (nome === "" || idade === "" || turma === "" || nota === "") {
                        console.log("ERRO: Não preencheu todas as informações");
                        mostrarMenu();
                        return;
                    }

                    if (idade <= 0 || nota < 0 || nota > 10) {
                        console.log("ERRO: Idade ou nota inválida");
                        mostrarMenu();
                        return;
                    }

                    let aluno = {
                        id: proximoId,
                        nome: nome,
                        idade: idade,
                        turma: turma,
                        nota: nota
                    };

                    alunos.push(aluno);
                    proximoId++;

                    console.log("ALuno cadastrado com sucesso");
                    mostrarMenu();
                })
            })
        })
    })
}

function buscarAlunoPorId() {
    console.log("Buscar aluno por id");

    rl.question("Digite o ID do aluno: ", (id) => {
        id = Number(id);

        let aluno = encontrarAlunoPorId(id);

        if (aluno === null) {
            console.log("Aluno não encontrado");
            mostrarMenu();
            return;
        } 

        console.log("\nAluno Encontrado");
        console.log("\nID:", aluno.id);
        console.log("\nNome:", aluno.nome);
        console.log("\nIdade:", aluno.idade);
        console.log("\nTurma:", aluno.turma);
        console.log("\nNota:", aluno.nota);

        mostrarMenu();
    })
}

function encontrarAlunoPorId(id) {
    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].id === id) {
            return alunos[i];
        }
    }

    return null;
}

mostrarMenu();

