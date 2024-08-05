// Funciones para Calculadora de IMC
function calcularIMC() {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const imc = peso / (altura * altura);
    document.getElementById('resultado').value = imc.toFixed(2);
}

// Funciones para Conversor de Divisas
const tasaDeCambio = 4000; // 1 dólar = 4000 pesos colombianos

function convertirADolares() {
    const pesos = parseFloat(document.getElementById('pesos').value);
    const dolares = pesos / tasaDeCambio;
    document.getElementById('dolares').value = dolares.toFixed(2);
}

function convertirAPesos() {
    const dolares = parseFloat(document.getElementById('dolares').value);
    const pesos = dolares * tasaDeCambio;
    document.getElementById('pesos').value = pesos.toFixed(2);
}

// Funciones para Aplicación de Notas
let notas = [];
let idGlobal = 0;

function agregarNota(titulo, texto) {
    const nota = {
        id: idGlobal++,
        titulo: titulo,
        texto: texto,
        realizada: false
    };
    notas.push(nota);
    pintarNotas();
}

function borrarNota(id) {
    notas = notas.filter(nota => nota.id !== id);
    pintarNotas();
}

function marcarRealizada(id) {
    const nota = notas.find(nota => nota.id === id);
    nota.realizada = !nota.realizada;
    pintarNotas();
}

function filtrarPorRealizadas(notas) {
    const filtroRealizadas = document.getElementById('filtroRealizadas').checked;
    if (filtroRealizadas) {
        return notas.filter(nota => nota.realizada);
    }
    return notas;
}

function filtrarPorTexto(notas) {
    const filtroTexto = document.getElementById('filtroTexto').value.toLowerCase();
    if (filtroTexto) {
        return notas.filter(nota => 
            nota.titulo.toLowerCase().includes(filtroTexto) || 
            nota.texto.toLowerCase().includes(filtroTexto)
        );
    }
    return notas;
}

function aplicarFiltros() {
    let notasFiltradas = filtrarPorRealizadas(notas);
    notasFiltradas = filtrarPorTexto(notasFiltradas);
    pintarNotas(notasFiltradas);
}

function pintarNotas(filtradasNotas = notas) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = '';
    if (filtradasNotas.length === 0) {
        contenedor.innerHTML = 'NO HAY NOTAS PARA MOSTRAR';
        return;
    }
    filtradasNotas.forEach(nota => {
        const divNota = document.createElement('div');
        divNota.innerHTML = `
            <h3>${nota.titulo}</h3>
            <p>${nota.texto}</p>
            <button onclick="borrarNota(${nota.id})" class="btn btn-danger btn-sm">Borrar Nota</button>
            <input type="checkbox" onclick="marcarRealizada(${nota.id})" ${nota.realizada ? 'checked' : ''}>
        `;
        contenedor.appendChild(divNota);
    });
}

function guardarNota() {
    const titulo = document.getElementById('titulo').value;
    const texto = document.getElementById('texto').value;
    if (titulo && texto) {
        agregarNota(titulo, texto);
        document.getElementById('titulo').value = '';
        document.getElementById('texto').value = '';
    }
}

function limpiarCampos() {
    document.getElementById('titulo').value = '';
    document.getElementById('texto').value = '';
}
