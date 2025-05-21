// PainelController.js
        function atualizarUltimoAtendimento() {
            const ultimo = localStorage.getItem('ultimoAtendido');
            if (ultimo) {
                document.getElementById('ultimoAtendimento').textContent = ultimo;
            }
            else {
                document.getElementById('ultimoAtendimento').textContent = "Aguardando...";
            }
        }

        localStorage.removeItem('ultimoAtendido');
        atualizarUltimoAtendimento();

        setInterval(atualizarUltimoAtendimento, 1000);
