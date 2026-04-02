const readline = require("readline");

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
    console.log(" 4 - Atualizar Carro");
    console.log(" 5 - Remover Carro");
    console.log("=======================");
    console.log("CLIENTES")
    console.log(" 6 - Cadastrar Cliente");
    console.log(" 7 - Listar Cliente");
    console.log(" 8 - Buscar por ID ");
    console.log(" 9 - Atualizar Cliente");
    console.log(" 10 - Remover Cliente");
    console.log("=======================");
    console.log("ALUGUEL")
    console.log(" 11 - Realizar Aluguel");
    console.log(" 12 - Devolver Carro");
    console.log(" 13 - Listar Alugueis");
    console.log(" 14 - Listar Alugueis Ativos");
    console.log(" 15 - Listar Alugueis Finalizados");
    console.log("=======================");
    console.log("0 - Sair");

    rl.question("Escolha uma opção: ", (opcao) => {
        if (opcao === "1") {
            cadastrarCarro();
        } else if (opcao === "2") {
            listarCarro();
        } else if (opcao === "3") {
            buscarCarroPorId();
        } else if (opcao === "4") {
            atualizarCarro();
        } else if (opcao === "5") {
            removerCarro();
        } else if (opcao === "6") {
            cadastrarClientes();
        } else if (opcao === "7") {
            listarClientes();
        } else if (opcao === "8") {
            buscarClientePorId();
        } else if (opcao === "9") {
            atualizarCliente();
        } else if (opcao === "10") {
            removerCliente();
        } else if (opcao === "11") {
            realizarAluguel();
        } else if (opcao === "12") {
            devolverCarro();
        } else if (opcao === "13") {
            listarAlugueis();
        } else if (opcao === "14") {
            listarAlugueisAtivos();
        } else if (opcao === "15") {
            listarAlugueisFinalizados();
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

                if(clienteExiste === false) {
                    console.log("Cliente não encontrado");
                    mostrarMenu();
                    return;
                }
                if(carroExiste === false) {
                    console.log("Carro não encontrado");
                    mostrarMenu();
                    return;
                }
                if(carroDisponivel === false) {
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
                        total: dias*preco,
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

        if(aluguel.status === "ativo") {
            aluguel.status = "finalizado";
            
            for(let i = 0; i < carros.length; i++) {
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
        rl.question("Digite o cpf: ", (cpf) => {

            if (nome === "" || cpf === "") {
                console.log("Todas as informações devem ser preenchidas");
                mostrarMenu();
                return;
            }

            if (cpf.length < 11) {
                console.log("CPF inválido");
                mostrarMenu();
                return;
            }

            let cliente = {
                id: proximoIdCliente,
                nome: nome,
                cpf: cpf
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
    mostrarMenu();
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

                            if (disponivel !== "s" || disponivel !== "n") {
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

mostrarMenu();