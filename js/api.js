document.addEventListener('DOMContentLoaded', function () {
    const handleSubmit = (event) => {
        event.preventDefault();

        const name = document.querySelector('input[name=name]').value;
        const senha = document.querySelector('input[name=senha]').value;

        fetch('https://api.sheetmonkey.io/form/azamgwqKMRjejfup8ZcJSv', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, senha }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar dados');
            }
            return response.json();
        })
        .then(data => {
            // Sucesso - recarregar a página
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
        })
        .finally(() => {
            alert('Registrado com Sucesso!')
            // Recarregar a página
            window.location.reload();
        });
    };

    // Adiciona o event listener ao formulário
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});