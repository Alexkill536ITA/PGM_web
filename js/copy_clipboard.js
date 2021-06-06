function copiy_text(testo, ars) {
    var input = document.createElement('input');
    input.setAttribute('value', testo);
    document.body.appendChild(input);
    input.select();
    var risultato = document.execCommand('copy');
    document.body.removeChild(input);
    alert('ID Scheda PG Copitato Nella ClipBoard: ' + ars);
    return risultato;
}