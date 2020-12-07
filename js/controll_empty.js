const input_name= document.getElementById('nome_pg');
const root = document.getElementById('Inventori_Container');
const root_2 = document.getElementById('end_select_raz');
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
const label_temp = `<div id="label_up" class="wrap-input100 validate-input" data-validate="razza_altro">
<span class="label-input100">Inserire Nome Razza</span>
<input id="razza_altro" style="border: none" class="input100" type="text" name="razza_altro" placeholder="Altra Razza">
<span class="focus-input100"></span>
</div>`

//  Create and Drestroy label input
function label_create() {
    var label_up = document.getElementById('label_up');
    if (!label_up) {
        root_2.insertAdjacentHTML('afterend', label_temp);
    }
}

function label_destroy() {
    var label_up = document.getElementById('label_up');
    if (label_up) {
        label_up.remove();
    } 
}

// Control
function ceck_empy() {
    var nome_pg = document.getElementById('nome_pg').value;
    var razza_pg = document.getElementById('select2-razza_pg-container').title;
    var classe_pg = document.getElementById('select2-classe_pg-container').title;
    var background_pg = document.getElementById('select2-background_pg-container').title;
    if(nome_pg != "") {
        if (razza_pg != "Scegli Razza") {
            if (classe_pg != "Scegli Classe") {
                if(razza_pg == "Altro") {
                    label_create();
                } else {
                    label_destroy();
                }
                if (background_pg != "Scegli Background") {
                    btn_submit_create();   
                } else {
                    btn_submit_destroy()
                }
            } else {
                btn_submit_destroy()
            }
        } else {
            btn_submit_destroy()
        }
    } else {
        btn_submit_destroy()
    }
}

input_name.addEventListener('change', (event) => {
    var nome_pg = document.getElementById('nome_pg').value;
    var razza_pg = document.getElementById('select2-razza_pg-container').title;
    var classe_pg = document.getElementById('select2-classe_pg-container').title;
    var background_pg = document.getElementById('select2-background_pg-container').title;
    if(nome_pg != "") {
        if (razza_pg != "Scegli Razza") {
            if (classe_pg != "Scegli Classe") {
                if (background_pg != "Scegli Background") {
                    btn_submit_create();   
                } else {
                    btn_submit_destroy()
                }
            } else {
                btn_submit_destroy()
            }
        } else {
            btn_submit_destroy()
        }
    } else {
        btn_submit_destroy()
    }
});