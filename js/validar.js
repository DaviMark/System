document.addEventListener('DOMContentLoaded', function () {
    const handleSubmit = (event) => {
        event.preventDefault();

        const name = document.querySelector('input[name=name]').value;
        const senha = document.querySelector('input[name=senha]').value;

        console.log('Nome:', name);
        console.log('Senha:', senha);

        // Verifica os dados na planilha do Google
        fetch('https://api.sheetmonkey.io/form/azamgwqKMRjejfup8ZcJSv')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao acessar os dados da planilha');
                }
                return response.json();
            })
            .then(data => {
                console.log('Dados da planilha:', data); // Exibe os dados retornados

                // Verifica se o nome e senha estão na planilha
                const user = data.find(entry => {
                    // Verifique os nomes dos campos conforme a resposta da sua API
                    console.log('Comparando:', entry.name, 'com', name);
                    console.log('Comparando:', entry.senha, 'com', senha);
                    return entry.name === name && entry.senha === senha;
                });

                console.log('Usuário encontrado:', user); // Verifica se o usuário foi encontrado
                if (user) {
                    // Se existir, redireciona para o index.html
                    window.location.href = '/index.html';
                } else {
                    // Se não existir, mostra um alerta
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Nome ou senha inválidos!',
                        icon: 'error',
                        confirmButtonText: 'Tente novamente'
                    });
                }
            })
            .catch(error => {
                console.error('Erro ao acessar os dados:', error);
                Swal.fire({
                    title: 'Erro!',
                    text: 'Ocorreu um erro ao verificar as credenciais.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            });
    };

    // Adiciona o event listener ao formulário
    const form = document.getElementById('ValidarForm'); // Certifique-se de que o ID está correto
    if (form) {
        form.addEventListener('submit', handleSubmit);
    } else {
        console.error('Formulário não encontrado. Verifique o ID do formulário.');
    }
});
