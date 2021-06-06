const input_name = document.getElementById('nome_pg');
const root = document.getElementById('container_descrizone');
const root_2 = document.getElementById('razza_pg');
const root_3 = document.getElementById('classe_pg');
const root_4 = document.getElementById('background_pg');
const root_5 = document.getElementById('sot_classe_pg');
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
    var nome_pg = document.getElementById('nome_pg').value;
    var razza_pg = document.getElementById('razza_pg').value;
    var classe_pg = document.getElementById('classe_pg').value;
    var sot_classe_pg = document.getElementById('sot_classe_pg').value;
    var background_pg = document.getElementById('background_pg').value;
    var check_empy_1 = true;
    var check_empy_2 = true;
    var check_empy_3 = true;
    var check_empy_4 = true;
    var check_empy_5 = true;
    var check_empy_6 = true;
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

    if (sot_classe_pg != "Scegli Sotto Classe") {
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

    document.getElementById('img_class').style.backgroundImage = "url('"+Chek_class(classe_pg)+ "')"
    document.getElementById('img_class_2').style.backgroundImage = "url('"+Chek_class(sot_classe_pg)+ "')"
}

input_name.addEventListener('change', (event) => {
    var nome_pg = document.getElementById('nome_pg').value;
    var razza_pg = document.getElementById('razza_pg').value;
    var classe_pg = document.getElementById('classe_pg').value;
    var sot_classe_pg = document.getElementById('sot_classe_pg').value;
    var background_pg = document.getElementById('background_pg').value;
    var check_empy_1 = true;
    var check_empy_2 = true;
    var check_empy_3 = true;
    var check_empy_4 = true;
    var check_empy_5 = true;
    var check_empy_6 = true;
    if (nome_pg != "") {
        check_empy_1 = false;
    } else {
        check_empy_1 = true;
    }

    if (razza_pg != "Scegli Razza") {
        if (razza_pg == "Altro") {
            label_create('label_up_raz', root_2, label_temp)
        } else {
            label_destroy('label_up_raz')
        }
        check_empy_2 = false;
    } else {
        label_destroy('label_up_raz')
        check_empy_2 = true;
    }

    if (classe_pg != "Scegli Classe") {
        if (classe_pg == "Altro") {
            label_create('label_up_cla', root_3, label_temp_2)
        } else {
            label_destroy('label_up_cla');
        }
        check_empy_3 = false;
    } else {
        label_destroy('label_up_cla')
        check_empy_3 = true;
    }

    if (sot_classe_pg != "Scegli Sotto Classe") {
        if (sot_classe_pg == "Altro") {
            label_create('label_up_sot_cla', root_5, label_temp_3)
        } else {
            label_destroy('label_up_sot_cla');
            check_empy_5 = false;
        }
        check_empy_5 = false;
    } else {
        label_destroy('label_up_sot_cla')
        check_empy_5 = false;
    }

    if (background_pg != "Scegli Background") {
        if (background_pg == "Altro") {
            label_create('label_up_bac', root_4, label_temp_4)
        } else {
            label_destroy('label_up_bac')
        }
        check_empy_4 = false;
    } else {
        label_destroy('label_up_bac')
        check_empy_4 = true;
    }

    if (check_empy_1 == true || check_empy_2 == true || check_empy_3 == true || check_empy_4 == true || check_empy_5 == true) {
        btn_submit_destroy()
    } else {
        btn_submit_create()
    }
});

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