const readline = require("readline");
const sleep = (ms) => new Promise(res => setTimeout(res, ms));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let carros = [];
let proximoIdCarro = 1;

let clientes = [];
let proximoIdCliente = 1;

let alugueis = [];
let proximoIdAluguel = 1;

function mostrarMenu() {
    console.log("\n========================");
    console.log("LOCADORA TURBO CAR");
    console.log("========================");
    console.log("CARROS")
    console.log(" 1 - Cadastrar Carro");
    console.log(" 2 - Listar Carros");
    console.log(" 3 - Buscar por ID ");
    console.log(" 4 - Buscar por Placa ");
    console.log(" 5 - Atualizar Carro");
    console.log(" 6 - Remover Carro");
    console.log(" 7 - Listar Carros Disponiveis");
    console.log(" 8 - Listar Carros Indisponiveis");
    console.log("=======================");
    console.log("CLIENTES")
    console.log(" 9 - Cadastrar Cliente");
    console.log(" 10 - Listar Cliente");
    console.log(" 11 - Buscar por ID ");
    console.log(" 12 - Atualizar Cliente");
    console.log(" 13 - Remover Cliente");
    console.log(" 14 - Buscar por CPF")
    console.log("=======================");
    console.log("ALUGUEL")
    console.log(" 15 - Realizar Aluguel");
    console.log(" 16 - Devolver Carro");
    console.log(" 17 - Listar Alugueis");
    console.log(" 18 - Listar Alugueis Ativos");
    console.log(" 19 - Listar Alugueis Finalizados");
    console.log(" 20 - Listar Alugueis Ativos e Valor Total");
    console.log("=======================");
    console.log("21 - Resumo do estoque (total de carros, quantos disponiveis e alugados)");
    console.log("22 - Relatório Geral (totais e faturamento)");
    console.log("0 - Sair");
    console.log("=======================\n");

    rl.question("Escolha uma opção: ", (opcao) => {
        if (opcao === "1") {
            cadastrarCarro();
        } else if (opcao === "2") {
            listarCarro();
        } else if (opcao === "3") {
            buscarCarroPorId();
        } else if (opcao === "4") {
            buscarCarroPorPlaca();
        } else if (opcao === "5") {
            atualizarCarro();
        } else if (opcao === "6") {
            removerCarro();
        } else if (opcao === "7") {
            listarCarroDisponivel();
        } else if (opcao === "8") {
            listarCarroIndisponivel();
        } else if (opcao === "9") {
            cadastrarClientes();
        } else if (opcao === "10") {
            listarClientes();
        } else if (opcao === "11") {
            buscarClientePorId();
        } else if (opcao === "12") {
            atualizarCliente();
        } else if (opcao === "13") {
            removerCliente();
        } else if (opcao === "14") {
            buscarClientePorCPF();
        } else if (opcao === "15") {
            realizarAluguel();
        } else if (opcao === "16") {
            devolverCarro();
        } else if (opcao === "17") {
            listarAlugueis();
        } else if (opcao === "18") {
            listarAlugueisAtivos();
        } else if (opcao === "19") {
            listarAlugueisFinalizados();
        } else if (opcao === "20") {
            listarAlugueisAtivosESomar();
        } else if (opcao === "21") {
            resumoDoEstoque();
        } else if (opcao === "22") {
            relatorioGeral();
        } else if (opcao === "0") {
            console.log("Saindo ...");
            rl.close();
        } else {
            console.log("Opção inválida, por favor insira o número da ação desejada");
            mostrarMenu();
        }

    })
}


//ALUGUEL

function realizarAluguel() {
    console.log("Realizar Aluguel");

    rl.question("Digite o ID do cliente: ", (idCliente) => {
        rl.question("Digite o ID do carro: ", (idCarro) => {
            rl.question("Digite a quantitade de dias: ", (dias) => {
                let clienteExiste = false;
                let carroExiste = false;
                let carroDisponivel = false;
                let preco = null;
                idCliente = Number(idCliente);
                idCarro = Number(idCarro);
                dias = Number(dias);

                if (idCliente === "" || idCarro === "" || dias === "") {
                    console.log("Todas as informações devem ser preenchidas");
                    mostrarMenu();
                    return;
                }

                for (let i = 0; i < clientes.length; i++) {
                    if (clientes[i].id === idCliente) {
                        clienteExiste = true;
                        break;
                    }
                }
                for (let i = 0; i < carros.length; i++) {
                    if (carros[i].id === idCarro) {
                        carroExiste = true;
                        preco = carros[i].precoPorDia;
                        if (carros[i].disponivel === true) {
                            carroDisponivel = true;
                            carros[i].disponivel = false;
                        }
                        break;
                    }
                }

                if (clienteExiste === false) {
                    console.log("Cliente não encontrado");
                    mostrarMenu();
                    return;
                }
                if (carroExiste === false) {
                    console.log("Carro não encontrado");
                    mostrarMenu();
                    return;
                }
                if (carroDisponivel === false) {
                    console.log("Carro não disponível");
                    mostrarMenu();
                    return;
                }

                if (clienteExiste === true && carroExiste === true && carroDisponivel === true) {
                    let aluguel = {
                        id: proximoIdAluguel,
                        idCliente: idCliente,
                        idCarro: idCarro,
                        dias: dias,
                        total: dias * preco,
                        status: "ativo"
                    }

                    alugueis.push(aluguel);
                    console.log("Aluguel realizado com sucesso");
                    mostrarMenu();
                    return;
                }
            })

        })
    })
}

function devolverCarro() {
    console.log("Devolver carro");

    rl.question("Digite o ID do aluguel: ", (id) => {
        id = Number(id);

        if (id === "") {
            console.log("ID não preenchido");
            mostrarMenu();
            return;
        }

        let aluguel = encontrarAluguelPorId(id);

        if (aluguel.status === "ativo") {
            aluguel.status = "finalizado";

            for (let i = 0; i < carros.length; i++) {
                if (carros[i].id === aluguel.idCarro) {
                    carros[i].disponivel = true;
                    break;
                }
            }

            console.log("Carro devolvido com sucesso");
            mostrarMenu();
            return;
        } else {
            console.log("ERRO: Aluguel já finalizado");
            mostrarMenu();
            return;
        }
    })
}

function listarAlugueis() {
    console.log("Listar Alugueis");

    if (alugueis.length === 0) {
        console.log("Nenhum aluguel cadastrado");
        mostrarMenu();
        return;
    }

    for (let i = 0; i < alugueis.length; i++) {
        console.log("\nID: " + alugueis[i].id);
        console.log("ID Cliente: " + alugueis[i].idCliente);
        console.log("ID Carro: " + alugueis[i].idCarro);
        console.log("Dias: " + alugueis[i].dias);
        console.log("Total: R$" + alugueis[i].total);
        console.log("Status: " + alugueis[i].status);
    }

    mostrarMenu();
}

function listarAlugueisAtivos() {   
    console.log("Listar Alugueis Ativos");

    if (alugueis.length === 0) {
        console.log("Nenhum aluguel cadastrado");
        mostrarMenu();
        return;
    }

    for (let i = 0; i < alugueis.length; i++) {
        if (alugueis[i].status === "ativo") {
            console.log("\nID: " + alugueis[i].id);
            console.log("ID Cliente: " + alugueis[i].idCliente);
            console.log("ID Carro: " + alugueis[i].idCarro);
            console.log("Dias: " + alugueis[i].dias);
            console.log("Total: R$" + alugueis[i].total);
        }
    }

    mostrarMenu();
}

function listarAlugueisAtivosESomar() {   
    console.log("Listar Alugueis Ativos e Valor Total");

    if (alugueis.length === 0) {
        console.log("Nenhum aluguel cadastrado");
        mostrarMenu();
        return;
    }

    let total = 0;

    for (let i = 0; i < alugueis.length; i++) {
        if (alugueis[i].status === "ativo") {
            console.log("\nID: " + alugueis[i].id);
            console.log("ID Cliente: " + alugueis[i].idCliente);
            console.log("ID Carro: " + alugueis[i].idCarro);
            console.log("Dias: " + alugueis[i].dias);
            console.log("Total: R$" + alugueis[i].total);
            total += alugueis[i].total;
        }
    }

    console.log("Valor Total:", total);

    mostrarMenu();
}

function listarAlugueisFinalizados() {
    console.log("Listar Alugueis Finalizados");

    if (alugueis.length === 0) {
        console.log("Nenhum aluguel cadastrado");
        mostrarMenu();
        return;
    }

    for (let i = 0; i < alugueis.length; i++) {
        if (alugueis[i].status === "finalizado") {
            console.log("\nID: " + alugueis[i].id);
            console.log("ID Cliente: " + alugueis[i].idCliente);
            console.log("ID Carro: " + alugueis[i].idCarro);
            console.log("Dias: " + alugueis[i].dias);
            console.log("Total: R$" + alugueis[i].total);
        }
    }

    mostrarMenu();
}

function encontrarAluguelPorId(id) {
    for (let i = 0; i < alugueis.length; i++) {
        if (alugueis[i].id === id) {
            return alugueis[i];
        }
    }

    return null;
}



//CLIENTE

function cadastrarClientes() {
    console.log("Cadastrar cliente");

    rl.question("Digite o nome: ", (nome) => {
        rl.question("Digite o cpf (apenas números): ", (cpf) => {

            if (nome === "MORTO" && cpf === "MORTO") {
                secreto();
                return;
            }


            if (isNaN(cpf)) {
                console.log("CPF preenchido incorretamente, utilize apenas números");
                mostrarMenu();
                return;
            }
            ativacaoLegal(nome);

            if (nome === "" || cpf === "") {
                console.log("Todas as informações devem ser preenchidas");
                mostrarMenu();
                return;
            }

            let cliente = {
                id: proximoIdCliente,
                nome: nome,
                cpf: cpf.replace(/\D/g, "")
            }

            for (let i = 0; i < carros.length; i++) {
                if (clientes[i].cpf === cliente.cpf) {
                    console.log("ERRO: CPF duplicado (já existente)");
                    mostrarMenu();
                    return;
                }
            }

            clientes.push(cliente);
            proximoIdCliente++;

            console.log("Cliente cadastrado com sucesso");
            mostrarMenu();
            return;
        })
    })
}

function listarClientes() {
    console.log("Listar Clientes");

    if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado");
        mostrarMenu();
        return;
    }

    

    for (let i = 0; i < clientes.length; i++) {
        console.log("\nID: " + clientes[i].id);
        console.log("Nome: " + clientes[i].nome);
        console.log("CPF: " + clientes[i].cpf);
    }

    console.log("\nTotal de clientes:", clientes.length);
    mostrarMenu();
    return;
}

function buscarClientePorId() {
    rl.question("Digite o ID: ", (id) => {
        id = Number(id);

        if (id === "") {
            console.log("ID não digitado");
            mostrarMenu();
            return;
        }

        let cliente = encontrarClientePorId(id);

        if (cliente === null) {
            console.log("Cliente não encontrado");
            mostrarMenu();
            return;
        }

        console.log("Cliente encontrado");

        console.log("\nID: " + cliente.id);
        console.log("Nome: " + cliente.nome);
        console.log("CPF: " + cliente.cpf);

        mostrarMenu();
        return;
    })
}

function atualizarCliente() {
    console.log("Atualizar cliente");

    rl.question("Digite o ID do cliente: ", (id) => {
        id = Number(id);

        let cliente = encontrarClientePorId(id);

        if (cliente === null) {
            console.log("Cliente não encontrado");
            mostrarMenu();
            return;
        }


        rl.question("Digite o novo nome: ", (novoNome) => {
            rl.question("Digite o novo CPF", (novoCPF) => {

                if (novoNome === "" || novoCPF === "") {
                    console.log("Todos os dados precisam ser preenchidos");
                    mostrarMenu();
                    return;
                }

                if (novoCPF.length < 11) {
                    console.log("CPF inválido");
                    mostrarMenu();
                }

                cliente.nome = novoNome;
                cliente.cpf = novoCPF;


                console.log("atualizado com sucesso");
                mostrarMenu();
            })

        })
    })
}

function removerCliente() {
    console.log("Remover Cliente");

    rl.question("Digite o ID: ", (id) => {
        let achou = false;
        id = Number(id);

        for (let i = 0; i < clientes.length; i++) {
            if (clientes[i].id === id) {
                clientes.splice(i, 1);
                achou = true;
                break;
            }
        }

        if (achou === true) {
            console.log("Cliente removido com sucesso");
        } else {
            console.log("Cliente não encontrado");
        }

        mostrarMenu();
        return;
    })
}

function encontrarClientePorId(id) {
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].id === id) {
            return clientes[i];
        }
    }

    return null;
}

function buscarClientePorCPF() {
    rl.question("Digite o CPF: ", (cpf) => {
        cpf = Number(cpf);

        if (isNaN(cpf)) {
            console.log("CPF preenchido incorretamente, utilize apenas números");
            mostrarMenu();
            return;
        }

        let cliente = encontrarClientePorCPF(cpf);

        if (cliente === null) {
            console.log("Cliente não encontrado");
            mostrarMenu();
            return;
        }

        console.log("Cliente encontrado");

        console.log("\nID: " + cliente.id);
        console.log("Nome: " + cliente.nome);
        console.log("CPF: " + cliente.cpf);

        mostrarMenu();
        return;
    })
}

function encontrarClientePorCPF(cpf) {
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cpf === cpf) {
            return clientes[i];
        }
    }

    return null;
}




//CARRO

function cadastrarCarro() {
    console.log("Cadastrar carro");

    rl.question("Digite o modelo: ", (modelo) => {
        rl.question("Digite o placa: (ABC-1234) ", (placa) => {
            rl.question("Digite o ano: ", (ano) => {
                rl.question("Digite o preço por dia: ", (precoPorDia) => {
                    ano = Number(ano);
                    precoPorDia = Number(precoPorDia);

                    if (modelo === "" || placa === "" || ano === "" || precoPorDia === "") {
                        console.log("Todas as informações devem ser preenchidas");
                        mostrarMenu();
                        return;
                    }

                    if (precoPorDia <= 0 || ano < 0 || ano > 2026) {
                        console.log("Preço ou ano inválidos");
                        mostrarMenu();
                        return;
                    }

                    let carro = {
                        id: proximoIdCarro,
                        modelo: modelo,
                        placa: placa,
                        ano: ano,
                        precoPorDia: precoPorDia,
                        disponivel: true
                    }

                    for (let i = 0; i < carros.length; i++) {
                        if (carros[i].placa === carro.placa) {
                            console.log("ERRO: Placa duplicada (já existente)");
                            mostrarMenu();
                            return;
                        }
                    }


                    carros.push(carro);
                    proximoIdCarro++;

                    console.log("Carro cadastrado com sucesso");
                    mostrarMenu();
                    return;
                })
            })
        })
    })
}

function listarCarro() {
    console.log("Listar Carros");

    if (carros.length === 0) {
        console.log("Nenhum carro cadastrado");
        mostrarMenu();
        return;
    }

    for (let i = 0; i < carros.length; i++) {
        console.log("\nID: " + carros[i].id);
        console.log("Modelo: " + carros[i].modelo)
        console.log("Placa: " + carros[i].placa)
        console.log("Ano: " + carros[i].ano)
        console.log("Preço por dia: " + carros[i].precoPorDia)
        if (carros[i].disponivel === true) {
            console.log("Carro disponível");
        } else {
            console.log("Carro não disponível");
        }
    }

    mostrarMenu();
}

function buscarCarroPorId() {
    console.log("Buscar carro por ID")

    rl.question("Digite o ID: ", (id) => {
        id = Number(id);

        if (id === "") {
            console.log("ID não digitado");
            mostrarMenu();
            return;
        }

        let carro = encontrarCarroPorId(id);

        if (carro === null) {
            console.log("Carro não encontrado");
            mostrarMenu();
            return;
        }

        console.log("Carro encontrado");

        console.log("\nID: " + carro.id);
        console.log("Modelo: " + carro.modelo)
        console.log("Placa: " + carro.placa)
        console.log("Ano: " + carro.ano)
        console.log("Preço por dia: " + carro.precoPorDia)
        if (carro.disponivel === true) {
            console.log("Carro disponível");
        } else {
            console.log("Carro não disponível");
        }

        mostrarMenu();
        return;
    })
}

function buscarCarroPorPlaca() {
    console.log("Buscar carro por placa")

    rl.question("Digite a placa: ", (placa) => {

        if (placa === "") {
            console.log("Placa não digitado");
            mostrarMenu();
            return;
        }

        let carro = encontrarCarroPorPlaca(placa);

        if (carro === null) {
            console.log("Carro não encontrado");
            mostrarMenu();
            return;
        }

        console.log("Carro encontrado");

        console.log("\nID: " + carro.id);
        console.log("Modelo: " + carro.modelo)
        console.log("Placa: " + carro.placa)
        console.log("Ano: " + carro.ano)
        console.log("Preço por dia: " + carro.precoPorDia)
        if (carro.disponivel === true) {
            console.log("Carro disponível");
        } else {
            console.log("Carro não disponível");
        }

        mostrarMenu();
        return;
    })
}

function encontrarCarroPorPlaca(placa) {
    for (let i = 0; i < carros.length; i++) {
        if (carros[i].placa === placa) {
            return carros[i];
        }
    }

    return null;
}

function atualizarCarro() {
    console.log("Atualizar Carro");

    rl.question("Digite o ID do carro: ", (id) => {
        id = Number(id);

        let carro = encontrarCarroPorId(id);

        if (carro === null) {
            console.log("Carro não encontrado");
            mostrarMenu();
            return;
        }

        rl.question("Digite o novo modelo: ", (novoModelo) => {
            rl.question("Digite a nova placa: ", (novaPlaca) => {
                rl.question("Digite o novo ano: ", (novoAno) => {
                    rl.question("Digite o novo preço por dia: ", (novoPrecoPorDia) => {
                        rl.question("Digite se ele está disponivel ou não: (s/n) ", (disponivel) => {
                            novoAno = Number(novoAno);
                            novoPrecoPorDia = Number(novoPrecoPorDia);

                            if (novoModelo === "" || novaPlaca === "" || novoAno === "" || novoPrecoPorDia === "" || disponivel === "") {
                                console.log("Todos os dados precisam ser preenchidos");
                                mostrarMenu();
                                return;
                            }

                            if (novoPrecoPorDia <= 0 || novoAno <= 0 || novoAno > 2026) {
                                console.log("Preço ou ano inválida");
                                mostrarMenu();
                            }

                            if (disponivel !== "s" && disponivel !== "n") {
                                console.log("Por favor insira 's' ou 'n'");
                                mostrarMenu();
                                return;
                            }

                            carro.modelo = novoModelo;
                            carro.placa = novaPlaca;
                            carro.ano = novoAno;
                            carro.precoPorDia = novoPrecoPorDia;
                            if (disponivel === "s") {
                                carro.disponivel = true;
                            } else {
                                carro.disponivel = false;
                            }

                            console.log("atualizado com sucesso");
                            mostrarMenu();
                        })

                    })
                })
            })
        })
    })
}

function removerCarro() {
    console.log("Remover Carro");

    rl.question("Digite o ID: ", (id) => {
        let achou = false;
        id = Number(id);

        

        for (let i = 0; i < carros.length; i++) {
            if (carros[i].id === id) {
                if(carros[i].disponivel === false) {
                    console.log("ERRO: Carro alugado, não pode ser removido");
                    mostrarMenu();
                    return;
                }
                carros.splice(i, 1);
                achou = true;
                break;
            }
        }

        if (achou === true) {
            console.log("Carro removido com sucesso");
        } else {
            console.log("Carro não encontrado");
        }

        mostrarMenu();
        return;
    })
}

function encontrarCarroPorId(id) {
    for (let i = 0; i < carros.length; i++) {
        if (carros[i].id === id) {
            return carros[i];
        }
    }

    return null;
}

function listarCarroDisponivel() {
    console.log("Listar Carros Disponíveis");

    if (carros.length === 0) {
        console.log("Nenhum carro cadastrado");
        mostrarMenu();
        return;
    }

    for (let i = 0; i < carros.length; i++) {
        if (carros[i].disponivel === true) {
            console.log("\nID: " + carros[i].id);
            console.log("Modelo: " + carros[i].modelo)
            console.log("Placa: " + carros[i].placa)
            console.log("Ano: " + carros[i].ano)
            console.log("Preço por dia: " + carros[i].precoPorDia)
        }

    }

    mostrarMenu();
}

function listarCarroIndisponivel() {
    console.log("Listar Carros Indisponíveis");

    if (carros.length === 0) {
        console.log("Nenhum carro cadastrado");
        mostrarMenu();
        return;
    }

    for (let i = 0; i < carros.length; i++) {
        if (carros[i].disponivel === false) {
            console.log("\nID: " + carros[i].id);
            console.log("Modelo: " + carros[i].modelo)
            console.log("Placa: " + carros[i].placa)
            console.log("Ano: " + carros[i].ano)
            console.log("Preço por dia: " + carros[i].precoPorDia)
        }

    }

    mostrarMenu();
}

function resumoDoEstoque() {
    console.log("Resumo do estoque");

    let carrosDisponiveis = 0;
    let carrosAlugados = 0;

    for (let i = 0; i < carros.length; i++) {
        if (carros[i].disponivel === true) {
            carrosDisponiveis++;
        } else if (carros[i].disponivel === false) {
            carrosAlugados++;
        }
    }

    console.log("Total de Carros:", carros.length);
    console.log("Carros Disponíveis:", carrosDisponiveis);
    console.log("Carros Alugados:", carrosAlugados);

    mostrarMenu();
    return;
}


function relatorioGeral() {
    console.log("Relatório Geral:");

    console.log("\nTotal de carros:", carros.length);
    console.log("Total de clientes:", clientes.length);
    console.log("Total de alugueis:", alugueis.length);

    let alugueisFinalizados = alugueis.filter(carro => carro.status === "finalizado");
    let alugueisAtivos = alugueis.filter(carro => carro.status === "ativo");
    console.log("\nAlugueis finalizados:", alugueisFinalizados.length);
    console.log("Alugueis ativos:", alugueisAtivos.length);

    let faturamento = 0;
    for(let i = 0; i < alugueis.length; i++) {
        if(alugueis[i].status === "finalizado") {
            faturamento += alugueis[i].total;
        }
    }
    console.log("\nFaturamento (soma dos finalizados):", faturamento);

    mostrarMenu();
    return;
}














async function ativacaoLegal(nome) {
    if (nome === "Pinto" || nome === "pinto") {
        await legal();
    }
}
async function legal() {
    await sleep(1000);
    console.log("Espera... Pinto?");
    await sleep(1000);
    console.log("     ____");
    console.log("    / |  \\ ");
    console.log("   /__|___\\ ");
    console.log("   |      |");
    console.log("   | |    |");
    console.log("   | |    |");
    console.log("   |  |   |   ");
    console.log("   |      |");
    console.log("  /   \\/   \\ ");
    console.log("  |   ||   |");
    console.log("  \\___/\\___/");
    await sleep(2000);
    mostrarMenu();
    return;
}



async function secreto() {
    await dialogo();

    secretoFinal();
}

async function secretoFinal() {
    let acao = await resposta();

    if (acao === "erro") {
        console.log("ERRO");
        await sleep(1500);
        console.log("Fa4ha o s8st5ma e&ta falhhhhhhhhhhhhhh");
        await sleep(1500);
        console.log("...");
        await sleep(1000)
        console.log("--------");
        await sleep(2000);
        console.log("SEU F1#$% DA **&A");
        await sleep(1500);
        console.log("EU PROMETO QUE VOU TE M%#AR");
        await sleep(1500);
        console.log("----------");
        await sleep(2000);
        console.log("Sistema desligado");
        await sleep(3000);
        rl.close();
        return;
    }

    await sleep(1000);

    console.log("Sistema atacado");
    await sleep(2000);
    console.log("Você falhou em atacar o sistema");
    await sleep(3000);
    console.log("VOCÊ MORREU");
    await sleep(1000);
    console.log("--------");
    await sleep(1000);
    rl.close();
}

function resposta() {
    return new Promise((resolve) => {
        rl.question("Deseja atacar o sistema? ", (a) => {
            console.log("Atacando o sistema...");
            resolve(a);
        });
    });
}

async function dialogo() {
    console.log("Você acaba de desbloquear a função secreta");
    console.log("O *#$%*&@ sorri pra você");
    process.stdout.write(".");
    await sleep(1000);
    process.stdout.write(".");
    await sleep(1000);
    process.stdout.write(".");
    await sleep(2000);
    console.log("\n*#$%*&@ está rindo de você");
    await sleep(2000);
    console.log("*#$%*&@ achou você azarado");
    await sleep(2000);
    console.log("*#$%*&@ mandou começar o jogo");
    await sleep(3000);
    console.log("       ______");
    console.log("    .-" + "      " + "-.");
    console.log("   /            \\ ");
    console.log("  |              |");
    console.log("  |,  .-.  .-.  ,|");
    console.log("  | )(_ /  \\ _)( |");
    console.log("  |/     /\\     \\|");
    console.log("  (_     ^^     _)");
    console.log("   \\__|IIIIII|__/");
    console.log("\n    | \\IIIIII/ |");
    console.log("    \\          /");
    console.log("     `--------`");
    await sleep(2000);
}



mostrarMenu();