const input_name = document.getElementById('nome_pg');
var root = document.getElementById('container_descrizone');
var root_2 = document.getElementById('razza_pg');
var root_3 = document.getElementById('classe_pg');
var root_4 = document.getElementById('background_pg');
var root_5 = document.getElementById('sot_classe_pg');
var root_6 = document.getElementById('classe_multi');
var root_7 = document.getElementById('sot_classe_multi');
var root_8 = document.getElementById('root_sot_classe_pg');
var root_9 = document.getElementById('root_sot_classe_multi');
var old_select_pg = "";
var old_select_multi_pg = "";
const btn_cancel = document.getElementById('btn_cancel');
var ceck_name = false;

// Template button
const btn_tmp = `<button id='btn_up' class="custom_button_cre" submit="submit">CREA SCHEDA <i class="fa fa-pencil-square-o m-l-7" aria-hidden="true"></i></button>`;

// Create and Drestroy Submit Button
function btn_submit_create() {
    var btn_up = document.getElementById('btn_up');
    if (!btn_up) {
        root.insertAdjacentHTML('beforebegin', btn_tmp);
    }
}

function btn_submit_destroy() {
    var btn_up = document.getElementById('btn_up');
    if (btn_up) {
        btn_up.remove();
    }
}

// Teamplate label input
const label_temp = `<input id="razza_altro"" class="u-text u-text-3" style="margin-top: 10px;" type="text" name="razza_altro" placeholder="Altra Razza">`

const label_temp_2 = `<input id="classe_altro"" class="u-text u-text-3" style="margin-top: 10px;" type="text" name="classe_altro" placeholder="Altra Classe">`

const label_temp_3 = `<input id="sot_classe_altro" class="u-text u-text-3" style="margin-top: 10px;" type="text" name="sot_classe_altro" placeholder="Altra Sotto Classe">`

const label_temp_4 = `<input id="Background_altro" class="u-text u-text-3" style="margin-top: 10px;" type="text" name="Background_altro" placeholder="Altro Background">`

const label_temp_5 = `<input id="classe_multi_altro"" class="u-text u-text-3" style="margin-top: 10px;" type="text" name="classe_multi_altro" placeholder="Altra Multi Classe">`

const label_temp_6 = `<input id="sot_classe_muti_altro" class="u-text u-text-3" style="margin-top: 10px;" type="text" name="sot_classe_muti_altro" placeholder="Altra Sotto Multi Classe">`

//  Create and Drestroy label input
function label_create(elemt, root_elemet, template) {
    var label_up = document.getElementById(elemt);
    if (!label_up) {
        root_elemet.insertAdjacentHTML('afterend', template);
    }
}

function label_destroy(elemt) {
    var label_up = document.getElementById(elemt);
    if (label_up) {
        label_up.remove();
    }
}

// Control
function ceck_empy() {
    root_2 = document.getElementById('razza_pg');
    root_3 = document.getElementById('classe_pg');
    root_4 = document.getElementById('background_pg');
    root_5 = document.getElementById('sot_classe_pg');
    root_6 = document.getElementById('classe_multi');
    root_7 = document.getElementById('sot_classe_multi');
    var root_8 = document.getElementById('root_sot_classe_pg');
    var root_9 = document.getElementById('root_sot_classe_multi');
    var nome_pg = document.getElementById('nome_pg').value;
    var razza_pg = document.getElementById('razza_pg').value;
    var classe_pg = document.getElementById('classe_pg').value;
    var sot_classe_pg = document.getElementById('sot_classe_pg').value;
    var classe_multi = document.getElementById('classe_multi').value;
    var sot_classe_multi = document.getElementById('sot_classe_multi').value;
    var background_pg = document.getElementById('background_pg').value;
    var check_empy_1 = true;
    var check_empy_2 = true;
    var check_empy_3 = true;
    var check_empy_4 = true;
    var check_empy_5 = true;
    var check_empy_6 = true;
    var check_empy_7 = true;
    if (nome_pg != "") {
        check_empy_1 = false;
    } else {
        check_empy_1 = true;
    }

    if (razza_pg != "Scegli Razza") {
        if (razza_pg == "Altro") {
            label_create('razza_altro', root_2, label_temp)
        } else {
            label_destroy('razza_altro')
        }
        check_empy_2 = false;
    } else {
        label_destroy('razza_altro')
        check_empy_2 = true;
    }

    if (classe_pg != "Scegli Classe") {
        if (classe_pg == "Altro") {
            label_create('classe_altro', root_3, label_temp_2)
        } else {
            label_destroy('classe_altro');
        }
        check_empy_3 = false;
    } else {
        label_destroy('classe_altro')
        check_empy_3 = true;
    }

    if (sot_classe_pg != "Scegli Sottoclasse") {
        if (sot_classe_pg == "Altro") {
            label_create('sot_classe_altro', root_5, label_temp_3)
        } else {
            label_destroy('sot_classe_altro');
            check_empy_5 = false;
        }
        check_empy_5 = false;
    } else {
        label_destroy('sot_classe_altro')
        check_empy_5 = false;
    }

    if (classe_multi != "Scegli Multiclasse") {
        if (classe_multi == "Altro") {
            label_create('classe_multi_altro', root_6, label_temp_5)
        } else {
            label_destroy('classe_multi_altro');
        }
        check_empy_6 = false;
    } else {
        label_destroy('classe_multi_altro')
        check_empy_6 = true;
    }

    if (sot_classe_multi != "Scegli Sotto Multiclasse") {
        if (sot_classe_multi == "Altro") {
            label_create('sot_classe_muti_altro', root_7, label_temp_6)
        } else {
            label_destroy('sot_classe_muti_altro');
            check_empy_7 = false;
        }
        check_empy_7 = false;
    } else {
        label_destroy('sot_classe_muti_altro')
        check_empy_7 = false;
    }

    if (background_pg != "Scegli Background") {
        if (background_pg == "Altro") {
            label_create('Background_altro', root_4, label_temp_4)
        } else {
            label_destroy('Background_altro')
        }
        check_empy_4 = false;
    } else {
        label_destroy('Background_altro')
        check_empy_4 = true;
    }

    if (check_empy_1 == true || check_empy_2 == true || check_empy_3 == true || check_empy_4 == true || check_empy_5 == true) {
        btn_submit_destroy()
    } else {
        btn_submit_create()
    }

    document.getElementById('img_class').style.backgroundImage = "url('" + Chek_class(classe_pg) + "')"
    document.getElementById('img_class_2').style.backgroundImage = "url('" + Chek_class(sot_classe_pg) + "')"
    document.getElementById('img_class_multi').style.backgroundImage = "url('" + Chek_class(classe_multi) + "')"
    document.getElementById('img_class_multi_2').style.backgroundImage = "url('" + Chek_class(sot_classe_multi) + "')"

    if (old_select_pg != classe_pg) {
        set_sottoclasse(false, root_8, classe_pg);
        old_select_pg = classe_pg;
    }

    if (old_select_multi_pg != classe_multi) {
        set_sottoclasse(true, root_9, classe_multi);
        old_select_multi_pg = classe_multi;
    }
}

// input_name.addEventListener('change', (event) => {
//     var nome_pg = document.getElementById('nome_pg').value;
//     var razza_pg = document.getElementById('razza_pg').value;
//     var classe_pg = document.getElementById('classe_pg').value;
//     var sot_classe_pg = document.getElementById('sot_classe_pg').value;
//     var background_pg = document.getElementById('background_pg').value;
//     var check_empy_1 = true;
//     var check_empy_2 = true;
//     var check_empy_3 = true;
//     var check_empy_4 = true;
//     var check_empy_5 = true;
//     var check_empy_6 = true;
//     if (nome_pg != "") {
//         check_empy_1 = false;
//     } else {
//         check_empy_1 = true;
//     }

//     if (razza_pg != "Scegli Razza") {
//         if (razza_pg == "Altro") {
//             label_create('label_up_raz', root_2, label_temp)
//         } else {
//             label_destroy('label_up_raz')
//         }
//         check_empy_2 = false;
//     } else {
//         label_destroy('label_up_raz')
//         check_empy_2 = true;
//     }

//     if (classe_pg != "Scegli Classe") {
//         if (classe_pg == "Altro") {
//             label_create('label_up_cla', root_3, label_temp_2)
//         } else {
//             label_destroy('label_up_cla');
//         }
//         check_empy_3 = false;
//     } else {
//         label_destroy('label_up_cla')
//         check_empy_3 = true;
//     }

//     if (sot_classe_pg != "Scegli Sotto Classe") {
//         if (sot_classe_pg == "Altro") {
//             label_create('label_up_sot_cla', root_5, label_temp_3)
//         } else {
//             label_destroy('label_up_sot_cla');
//             check_empy_5 = false;
//         }
//         check_empy_5 = false;
//     } else {
//         label_destroy('label_up_sot_cla')
//         check_empy_5 = false;
//     }

//     if (background_pg != "Scegli Background") {
//         if (background_pg == "Altro") {
//             label_create('label_up_bac', root_4, label_temp_4)
//         } else {
//             label_destroy('label_up_bac')
//         }
//         check_empy_4 = false;
//     } else {
//         label_destroy('label_up_bac')
//         check_empy_4 = true;
//     }

//     if (check_empy_1 == true || check_empy_2 == true || check_empy_3 == true || check_empy_4 == true || check_empy_5 == true) {
//         btn_submit_destroy()
//     } else {
//         btn_submit_create()
//     }
// });

function Chek_class(classe) {
    if (classe == "Barbaro") {
        return "/images/Barbaro.png"
    } else if (classe == "Bardo") {
        return "/images/Bardo.png"
    } else if (classe == "Chierico") {
        return "/images/Chierico.png"
    } else if (classe == "Druido") {
        return "/images/Druido.png"
    } else if (classe == "Guerriero") {
        return "/images/Combatente.png"
    } else if (classe == "Ladro") {
        return "/images/Ladro.png"
    } else if (classe == "Mago") {
        return "/images/Mago.png"
    } else if (classe == "Monaco") {
        return "/images/Monaco.png"
    } else if (classe == "Paladino") {
        return "/images/Paladino.png"
    } else if (classe == "Ranger") {
        return "/images/Ranger.png"
    } else if (classe == "Stregone") {
        return "/images/Altro.png"
    } else if (classe == "Warlock") {
        return "/images/Warlock.png"
    } else if (classe == "Artefice") {
        return "/images/Altro.png"
    } else {
        return "/images/Altro.png"
    }
}

function set_sottoclasse(type, root, classe) {
    if (type == true) {
        var template = `<select id="sot_classe_multi" class="u-text u-text-13" name="sot_classe_multi" onchange="ceck_empy()">
        <option>Scegli Sotto Multiclasse</option>`
    } else {
        var template = `<select id="sot_classe_pg" class="u-text u-text-13" name="sot_classe" onchange="ceck_empy()">
        <option>Scegli Sottoclasse</option>`
    }

    if (classe == "Barbaro") {
        template = template + `
        <option>Cammino del Patto degli Abissi</option>
        <option>Cammino della Cometa</option>
        <option>Cammino dell'Estrazione Esplosiva</option>
        <option>Cammino della Sete di Sangue</option>
        <option>Cammino del Berseker</option>
        <option>Cammino del Combattente Totemico</option>
        <option>Cammino della Magia Selvaggia</option>
        <option>Cammino del Guardiano Ancestrale</option>
        <option>Cammino della Bestia</option>
        <option>Cammino dello Zelota</option>
        <option>Cammino dell'Araldo della Tempesta</option>
        <option>Cammino della Furia Combattente</option>
        <option>Altro</option>`
    }

    if (classe == "Bardo") {
        template = template + `
        <option>Collegio della Sapienza</option>
        <option>Collegio del Valore</option>
        <option>Collegio dell'Incanto</option>
        <option>Collegio dei Sussurri</option>
        <option>Collegio delle Spade</option>
        <option>Collegio delle Tradizioni</option>
        <option>Collegio della Creazione</option>
        <option>Collegio dell'Eloquenza</option>
        <option>Collegio degli Spiriti</option>
        <option>Altro</option>`
    }

    if (classe == "Chierico") {
        template = template + `
        <option>Dominio della Conoscenza</option>
        <option>Dominio della Guerra</option>
        <option>Dominio dell'Inganno</option>
        <option>Dominio della Luce</option>
        <option>Dominio della Natura</option>
        <option>Dominio della Morte</option>
        <option>Dominio della Tomba</option>
        <option>Dominio dell'Arcano</option>
        <option>Dominio della Vita</option>
        <option>Dominio della Pace</option>
        <option>Dominio del Crepuscolo</option>
        <option>Dominio della Forgia</option>
        <option>Dominio dell'Ordine</option>
        <option>Altro</option>`
    }

    if (classe == "Artefice") {
        template = template + `
        <option>Alchimista</option>
        <option>Armaiolo</option>
        <option>Artigliere</option>
        <option>Fabbro da Battaglia</option>
        <option>Altro</option>`
    }

    if (classe == "Druido") {
        template = template + `
        <option>Circolo della Terra</option>
        <option>Circolo della Luna</option>
        <option>Circolo dei Sogni</option>
        <option>Circolo dei Pastori</option>
        <option>Circolo delle Spore</option>
        <option>Circolo del Fuoco Selvaggio</option>
        <option>Circolo delle Stelle</option>
        <option>Altro</option>`
    }

    if (classe == "Guerriero") {
        template = template + `
        <option>Campione</option>
        <option>Maestro di Battaglia</option>
        <option>Cavaliere Mistico</option>
        <option>Arciere Arcano</option>
        <option>Cavaliere Errante</option>
        <option>Samurai</option>
        <option>Guerriero Psi</option>
        <option>Cavaliere Runico</option>
        <option>Cavaliere dell'Eco</option>
        <option>Altro</option>`
    }

    if (classe == "Ladro") {
        template = template + `
        <option>Furfante</option>
        <option>Assassino</option>
        <option>Mistificatore Arcano</option>
        <option>Spadaccino</option>
        <option>Indagatore</option>
        <option>Esploratore</option>
        <option>Fantasma</option>
        <option>Lama dell'Anima</option>
        <option>Altro</option>`
    }

    if (classe == "Monaco") {
        template = template + `
        <option>Via della Mano Aperta</option>
        <option>Via dei Quattro Elementi</option>
        <option>Via della Lunga Morte</option>
        <option>Via dell'Anima Solare</option>
        <option>Via dell'Ombra</option>
        <option>Via del Kensei</option>
        <option>Via del Maestro Ubriaco</option>
        <option>Via della Misericordia</option>
        <option>Via dell'Astralizzazione</option>
        <option>Via del Drago Ascendente</option>
        <option>Via del Vuoto</option>
        <option>Altro</option>`
    }

    if (classe == "Paladino") {
        template = template + `
        <option>Giuramento di Vendetta</option>
        <option>Giuramento della Devozione</option>
        <option>Giuramento della Corona</option>
        <option>Giuramento degli Osservatori</option>
        <option>Giuramento degli Antichi</option>
        <option>Giuramento della Gloria</option>
        <option>Giuramento della Conquista</option>
        <option>Giuramento della Redenzione</option>
        <option>Apostata</option>
        <option>Altro</option>`
    }

    if (classe == "Mago") {
        template = template + `
        <option>Scuola di Abiurazione</option>
        <option>Scuola di Invocazione</option>
        <option>Scuola di Evocazione</option>
        <option>Scuola di Illusione</option>
        <option>Scuola di Divinazione</option>
        <option>Scuola di Necromanzia</option>
        <option>Scuola di Trasmutazione</option>
        <option>Scuola di Cronomanzia</option>
        <option>Scuola di Gravimanzia</option>
        <option>Scuola della Magia della Guerra</option>
        <option>Scuola dell'Ordine degli Scribi</option>
        <option>Cantore della Lama</option>
        <option>Scuola di Astronomia</option>
        <option>Altro</option>`
    }

    if (classe == "Ranger") {
        template = template + `
        <option>Cacciatore</option>
        <option>Signore delle Bestie</option>
        <option>Viandante Fatato</option>
        <option>Cacciatore delle Tenebre</option>
        <option>Uccisore di Mostri</option>
        <option>Viandante dell'Orizzonte</option>
        <option>Custode degli Sciami</option>
        <option>Guardiano Draconico</option>
        <option>Altro</option>`
    }

    if (classe == "Stregone") {
        template = template + `
        <option>Discendenza Draconica</option>
        <option>Anima Divina</option>
        <option>Magia delle Ombre</option>
        <option>Stregoneria della Tempesta</option>
        <option>Mente Aberrante</option>
        <option>Anima Clockwork</option>
        <option>Altro</option>`
    }

    if (classe == "Warlock") {
        template = template + `
        <option>Il Signore Fatato</option>
        <option>L'Immondo</option>
        <option>Il Grande Antico</option>
        <option>Il Celestiale</option>
        <option>La Lama del Sortilegio</option>
        <option>L'Imperituro</option>
        <option>L'Insondabile</option>
        <option>Il Genio</option>
        <option>Il Non Morto</option>
        <option>Altro</option>`
    }

    if (classe == "Altro") {
        if (type == true) {
            label_destroy('sot_classe_multi');
            label_create('sot_classe_muti_altro', root, template + `<option>Altro</option></select>` + label_temp_6);
            document.getElementById('sot_classe_multi').value = 'Altro';
        } else {
            label_destroy('sot_classe_pg');
            label_create('sot_classe_altro', root, template + `<option>Altro</option></select>` + label_temp_3);
            document.getElementById('sot_classe_pg').value = 'Altro';
        }
    } else {
        if (type == true) {
            label_destroy('sot_classe_multi');
            label_destroy('sot_classe_muti_altro');
            label_create('sot_classe_muti_altro', root, template);
        } else {
            label_destroy('sot_classe_pg');
            label_destroy('sot_classe_altro');
            label_create('sot_classe_altro', root, template);
        }
    }
}