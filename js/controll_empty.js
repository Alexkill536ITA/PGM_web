const input_name = document.getElementById('nome_pg');
const root = document.getElementById('Inventori_Container');
const root_2 = document.getElementById('end_select_raz');
const root_3 = document.getElementById('end_select_cla');
const root_4 = document.getElementById('end_select_bac');
const root_5 = document.getElementById('end_select_sot_cla');
const btn_cancel = document.getElementById('btn_cancel');
var ceck_name = false;

// Template button
const btn_tmp = `<div id="btn_up" class="container-contact100-form-btn">
<div class="wrap-contact100-form-btn">
    <div class="contact100-form-bgbtn"></div>
    <button id="btn_sub" class="contact100-form-btn" submit="submit" >
        <span>
            Crea
            <i class="fa fa-long-arrow-right m-l-7" aria-hidden="true" ></i>
        </span>
    </button>
</div>
</div>`;

// Create and Drestroy Submit Button
function btn_submit_create() {
    var btn_up = document.getElementById('btn_up');
    if (!btn_up) {
        root.insertAdjacentHTML('afterend', btn_tmp);
    }
}

function btn_submit_destroy() {
    var btn_up = document.getElementById('btn_up');
    if (btn_up) {
        btn_up.remove();
    }
}

// Teamplate label input
const label_temp = `<div id="label_up_raz" class="wrap-input100 validate-input" data-validate="razza_altro">
<span class="label-input100">Inserire Nome Razza</span>
<input id="razza_altro" style="border: none" class="input100" type="text" name="razza_altro" placeholder="Altra Razza">
<span class="focus-input100"></span>
</div>`

const label_temp_2 = `<div id="label_up_cla" class="wrap-input100 validate-input" data-validate="razza_altro">
<span class="label-input100">Inserire Nome Classe</span>
<input id="classe_altro" style="border: none" class="input100" type="text" name="classe_altro" placeholder="Altra Classe">
<span class="focus-input100"></span>
</div>`

const label_temp_3 = `<div id="label_up_bac" class="wrap-input100 validate-input" data-validate="razza_altro">
<span class="label-input100">Inserire Background</span>
<input id="Background_altro" style="border: none" class="input100" type="text" name="Background_altro" placeholder="Altro Background">
<span class="focus-input100"></span>
</div>`

const label_temp_4 = `<div id="label_up_sot_cla" class="wrap-input100 validate-input" data-validate="razza_altro">
<span class="label-input100">Inserire Nome Classe</span>
<input id="sot_classe_altro" style="border: none" class="input100" type="text" name="sot_classe_altro" placeholder="Altra Sotto Classe">
<span class="focus-input100"></span>
</div>`

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

    if (sot_classe_pg != "Scegli Classe") {
        if (sot_classe_pg == "Altro") {
            label_create('label_up_cla', root_3, label_temp_2)
        } else {
            label_destroy('label_up_cla');
        }
    } else {
        label_destroy('label_up_cla')
    }

    if (background_pg != "Scegli Background") {
        if (background_pg == "Altro") {
            label_create('label_up_bac', root_4, label_temp_3)
        } else {
            label_destroy('label_up_bac')
        }
        check_empy_4 = false;
    } else {
        label_destroy('label_up_bac')
        check_empy_4 = true;
    }

    if (check_empy_1 == true || check_empy_2 == true || check_empy_3 == true || check_empy_4 == true) {
        btn_submit_destroy()
    } else {
        btn_submit_create()
    }
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

    if (background_pg != "Scegli Background") {
        if (background_pg == "Altro") {
            label_create('label_up_bac', root_4, label_temp_3)
        } else {
            label_destroy('label_up_bac')
        }
        check_empy_4 = false;
    } else {
        label_destroy('label_up_bac')
        check_empy_4 = true;
    }

    if (check_empy_1 == true || check_empy_2 == true || check_empy_3 == true || check_empy_4 == true) {
        btn_submit_destroy()
    } else {
        btn_submit_create()
    }
});