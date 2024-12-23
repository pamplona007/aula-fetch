const input = document.getElementById('cep');
const streetInput = document.getElementById('street');
const cityInput = document.getElementById('city');
const stateInput = document.getElementById('state');
const complementInput = document.getElementById('complement');

const handleInputChange = async (event) => {
    const { value } = event.target;

    if (value.length !== 8) {
        return;
    }

    const requestViaCep = await fetch(`https://viacep.com.br/ws/${value}/json/`);
    const data = await requestViaCep.json();

    streetInput.value = data.logradouro;
    cityInput.value = data.localidade;
    stateInput.value = data.uf;
    complementInput.value = data.complemento;
}

// Agora fazer a pesquisa de cep
// https://viacep.com.br/ws/CE/Fortaleza/Mario+Alencar/json/

const cityInputPesquisa = document.getElementById('cityPesquisa');
const stateInputPesquisa = document.getElementById('statePesquisa');
const complementInputPesquisa = document.getElementById('complementPesquisa');

input.addEventListener('input', handleInputChange);

const handlePesquisa = async () => {
    const valueCidade = cityInputPesquisa.value;
    const valueEstado = stateInputPesquisa.value;
    const valueComplemento = complementInputPesquisa.value;

    if (valueCidade.length === 0 || valueEstado.length < 2 || valueComplemento.length === 0) {
        return;
    }

    const requestViaCep = await fetch(`https://viacep.com.br/ws/${valueEstado}/${valueCidade}/${valueComplemento}/json/`);
    const data = await requestViaCep.json();

    const table = document.getElementById('corpoTabela');

    table.innerHTML = '';

    data.forEach((item) => {
        const row = document.createElement('tr');

        const logradouro = document.createElement('td');
        logradouro.textContent = item.logradouro;

        const complemento = document.createElement('td');
        complemento.textContent = item.complemento;

        const cep = document.createElement('td');
        cep.textContent = item.cep;


        row.appendChild(logradouro);
        row.appendChild(complemento);
        row.appendChild(cep);

        table.appendChild(row);
    });
}

cityInputPesquisa.addEventListener('input', handlePesquisa);
stateInputPesquisa.addEventListener('input', handlePesquisa);
complementInputPesquisa.addEventListener('input', handlePesquisa);