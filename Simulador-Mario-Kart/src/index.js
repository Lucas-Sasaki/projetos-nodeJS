const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
}
const player2 = {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
}
async function pista() {
    let blocoDePista = Math.random();
    let resultado;
    switch (true) {
        case blocoDePista < 0.33:
            resultado = "RETA" ;         
            break;
        case blocoDePista < 0.66:
            resultado = "CURVA";
            break;
    
        default:
            resultado = "CONFRONTO";
    }

    return resultado;
}

async function jogarDado() {
    return Math.floor(Math.random() * 6) + 1;
}

async function exibirLogRodadas(player, resultadoDado, bloco, atributo) {
    
    console.log(`${player} 🎲 rolou um dado de ${bloco} ${resultadoDado} + ${atributo} = ${resultadoDado + atributo}`);
}

async function exibirResultado(player, resultado) {
    console.log(`O vencedor é ${player} com a puntuação de ${resultado}\n`);
    console.log("Parabéns!\n");
}

async function corrida(player1, player2) {
    for (let rodada = 1; rodada <= 5; rodada++) {
        console.log(`🏁 Rodada ${rodada}`);

        let valorTotal1 = 0;
        let valorTotal2 = 0;

        let resultadoDado1 = await jogarDado();
        let resultadoDado2 = await jogarDado();

        let blocoDePista = await pista();

        if (blocoDePista === "RETA") {
            console.log("O bloco de pista da rodada é RETA\n");        

            valorTotal1 = resultadoDado1 + player1.VELOCIDADE;
            valorTotal2 = resultadoDado2 + player2.VELOCIDADE;

            await exibirLogRodadas(player1.NOME, resultadoDado1, blocoDePista, player1.VELOCIDADE);
            await exibirLogRodadas(player2.NOME, resultadoDado2, blocoDePista, player2.VELOCIDADE);

        }
        if (blocoDePista === "CURVA") {
            console.log("O bloco de pista da rodada é CURVA\n");

            valorTotal1 = resultadoDado1 + player1.MANOBRABILIDADE;
            valorTotal2 = resultadoDado2 + player2.MANOBRABILIDADE;

            await exibirLogRodadas(player1.NOME, resultadoDado1, blocoDePista, player1.MANOBRABILIDADE);
            await exibirLogRodadas(player2.NOME, resultadoDado2, blocoDePista, player2.MANOBRABILIDADE);
        }
        if (blocoDePista === "CONFRONTO") {
            console.log(`${player1.NOME} desafiou ${player2.NOME} para um confronto!🥊\n`);

            let poderTotal1 = resultadoDado1 + player1.PODER;
            let poderTotal2 = resultadoDado2 + player2.PODER;

            await exibirLogRodadas(player1.NOME, resultadoDado1, blocoDePista, player1.PODER);
            await exibirLogRodadas(player2.NOME, resultadoDado2, blocoDePista, player2.PODER);

            if (poderTotal1 > poderTotal2 && player2.PONTOS > 0) {
                player2.PONTOS--;
                console.log(`${player1.NOME} venceu o confronto! ${player2.NOME} perde 1 ponto 🐢\n`);
            }

            if (poderTotal1 < poderTotal2 && player1.PONTOS > 0) {
                player1.PONTOS--;
                console.log(`${player2.NOME} venceu o confronto! ${player1.NOME} perde 1 ponto 🐢\n`);
            } 
            
            if(poderTotal1 === poderTotal2) {
                console.log("A rodada empatou! Nenhum dos jogadores perdem ponto.\n");
            }

        }
        // verifica vencedor da rodada
        if (valorTotal1 > valorTotal2) {
            player1.PONTOS++;
            console.log(`${player1.NOME} marcou 1 ponto!\n`);
        } else if (valorTotal1 < valorTotal2) {
            player2.PONTOS++;
            console.log(`${player2.NOME} marcou 1 ponto!\n`);
        } else if (valorTotal1 === valorTotal2 && valorTotal1 !== 0) {
            console.log("A rodada empatou! Nenhum dos jogadores ganham ponto.\n");
        }

        console.log("--------------------------------------------------\n");
    }
    
    console.log(`${player1.NOME} atingiu ${player1.PONTOS} pontos!\n`);
    console.log("--------------------------------------------------\n");
    console.log(`${player2.NOME} atingiu ${player2.PONTOS} pontos!\n`);
    console.log("--------------------------------------------------\n");

    if (player1.PONTOS > player2.PONTOS) {
        await exibirResultado(player1.NOME, player1.PONTOS);
    }

    if (player1.PONTOS < player2.PONTOS) {
        await exibirResultado(player2.NOME, player2.PONTOS);
    }

    if (player1.PONTOS === player2.PONTOS) {
        console.log("A corrida empatou!");
    }
}

(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);

    await corrida(player1, player2);
})();

