document.addEventListener('DOMContentLoaded', function() {
    const botoesFiltro = document.querySelectorAll('.filtro-btn');
    const produtos = document.querySelectorAll('.produto-card');

    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            // Remove a classe 'ativo' de todos os botões
            botoesFiltro.forEach(b => b.classList.remove('ativo'));
            // Adiciona a classe 'ativo' ao botão clicado
            botao.classList.add('ativo');

            const plataformaSelecionada = botao.textContent.trim();

            produtos.forEach(produto => {
                if (plataformaSelecionada === 'Todos') {
                    produto.style.display = 'flex';
                    return;
                }

                const plataformas = produto.querySelector('.produto-plataformas').textContent;
                if (plataformas.includes(plataformaSelecionada)) {
                    produto.style.display = 'flex';
                } else {
                    produto.style.display = 'none';
                }
            });
        });
    });
});

// Scroll suave para o contato
document.querySelector('a[href="#contacto"]').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Se estiver na página de produtos, redireciona para a página inicial com âncora
    if (window.location.pathname.includes('produtos.html')) {
        window.location.href = 'index.html#contacto';
    } else {
        // Se já estiver na página inicial, faz o scroll suave
        document.querySelector('#contacto').scrollIntoView({
            behavior: 'smooth'
        });
    }
});

// Inicialização do EmailJS com sua chave pública
(function(){
    emailjs.init("m6FWKVmmxRxV2xdQo");
})();

function sendEmail(event) {
    event.preventDefault();
    
    // Validação básica dos campos
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !subject || !message) {
        alert('Por favor, preencha todos os campos');
        return false;
    }
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('Por favor, insira um email válido');
        return false;
    }
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        to_name: 'Juice Luqi',
        to_email: 'juiceluqi@gmail.com',
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    emailjs.send('service_accrjij', 'template_l5y2zng', templateParams)
        .then(function(response) {
            alert('Mensagem enviada com sucesso!');
            document.getElementById('contactForm').reset();
        }, function(error) {
            alert('Erro ao enviar mensagem. Por favor, tente novamente.');
            console.error('Erro:', error);
        })
        .finally(function() {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });

    return false;
} 