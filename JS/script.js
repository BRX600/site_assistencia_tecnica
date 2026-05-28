document.addEventListener('DOMContentLoaded', function () {
    
    // Captura os elementos do Simulador de Orçamento
    const checkboxes = document.querySelectorAll('.check-servico');
    const displayValor = document.getElementById('valorEstimado');
    const formOrcamento = document.getElementById('formOrcamento');
    const inputNome = document.getElementById('nomeOrcamento');
    const inputEmail = document.getElementById('emailOrcamento');

    let valorTotal = 0;

    // Função para calcular a soma dos serviços selecionados em tempo real
    function calcularOrcamento() {
        valorTotal = 0;

        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                // Transforma o valor de string para número inteiro e soma
                valorTotal += parseInt(checkbox.value);
            }
        });

        // Atualiza o texto do h3 no ecrã imediatamente
        displayValor.innerText = `Valor Estimado: R$ ${valorTotal},00`;
    }

    // Adiciona o escutador de eventos para quando mudar o estado de qualquer checkbox
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', calcularOrcamento);
    });

    // Validação de Envio do Formulário do Simulador
    formOrcamento.addEventListener('submit', function (event) {
        // Impede o recarregamento da página padrão
        event.preventDefault();

        const nome = inputNome.value.trim();
        const email = inputEmail.value.trim();

        // Validação obrigatória dos campos Nome e E-mail
        if (nome === "" || email === "") {
            alert('Por favor, preencha os campos de Nome e E-mail.');
            return;
        }

        // Regra extra: Evita enviar o pedido com valor zero
        if (valorTotal === 0) {
            alert('Por favor, selecione pelo menos um serviço para simular o seu orçamento!');
            return;
        }

        // Alerta de sucesso exigido nos critérios de avaliação
        alert(`Obrigado, ${nome}! Seu orçamento de R$ ${valorTotal},00 foi enviado com sucesso!`);

        // Limpa o formulário e reinicia o valor estimado para R$ 0,00 após o sucesso
        formOrcamento.reset();
        valorTotal = 0;
        displayValor.innerText = `Valor Estimado: R$ 0,00`;
    });
});