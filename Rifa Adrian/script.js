document.addEventListener("DOMContentLoaded", function () {
    const rifaContainer = document.getElementById("rifa-container");
    const compradoresContainer = document.getElementById("compradores-container");
    const loginForm = document.getElementById("login-form");
    const confirmarPagamento = document.getElementById("confirmar-pagamento");
    const copiarChave = document.getElementById("copiar-chave");

    let numeroSelecionado = null;
    let comprador = {};

    // Gerar botões da rifa
    if (rifaContainer) {
        for (let i = 1; i <= 5000; i++) {
            let botao = document.createElement("button");
            botao.innerText = i;
            botao.classList.add("numero-rifa");

            if (localStorage.getItem(`comprado-${i}`)) {
                botao.classList.add("comprado");
            }

            botao.onclick = function () {
                numeroSelecionado = i;
                localStorage.setItem("numeroSelecionado", i);
                window.location.href = "login.html";
            };

            rifaContainer.appendChild(botao);
        }
        atualizarCompradores();
    }

    // Capturar dados do login
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            comprador.nome = document.getElementById("nome").value;
            comprador.telefone = document.getElementById("telefone").value;
            numeroSelecionado = localStorage.getItem("numeroSelecionado");

            if (numeroSelecionado) {
                localStorage.setItem("comprador-" + numeroSelecionado, JSON.stringify(comprador));
                localStorage.setItem(`comprado-${numeroSelecionado}`, "true");
                window.location.href = "pagamento.html";
            }
        });
    }

    // Confirmar pagamento
    if (confirmarPagamento) {
        confirmarPagamento.addEventListener("click", function () {
            alert(`Pagamento confirmado para o número ${numeroSelecionado}`);
            window.location.href = "rifa.html";
        });
    }

    // Copiar chave PIX
    if (copiarChave) {
        copiarChave.addEventListener("click", function () {
            navigator.clipboard.writeText("123.456.789-00").then(() => {
                alert("Chave PIX copiada!");
            });
        });
    }

    // Atualizar lista de compradores
    function atualizarCompradores() {
        compradoresContainer.innerHTML = "";
        for (let i = 1; i <= 5000; i++) {
            let compradorSalvo = localStorage.getItem("comprador-" + i);
            if (compradorSalvo) {
                let compradorData = JSON.parse(compradorSalvo);
                let divComprador = document.createElement("div");
                divComprador.classList.add("comprador");
                divComprador.innerHTML = `
                    <p><strong>Número:</strong> ${i}</p>
                    <p><strong>Nome:</strong> ${compradorData.nome}</p>
                    <p><strong>Telefone:</strong> ${compradorData.telefone}</p>
                `;
                compradoresContainer.appendChild(divComprador);
                
            }
        }
    }
});