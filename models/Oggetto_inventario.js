// Crate Template Object
const oggettoInventario_temp = `
        <p style="width: 110px;float: left;color: black">Nome oggetto:</p>
        <input style="float: left" class="label-input120">
        <p style="width: 60px;float: left;color: black">Quantità:</p>
        <input style="float: left; width: 50px" class="label-input120">
        <p style="width: 60px;color: black">Note:</p>
        <textarea style="min-height: 60px" class="input100" name="message" placeholder="Informazione sull' oggetto."></textarea>
        <div class="container-contact120-form-btn">
            <div style="width: 50px; max-height: 50px" class="wrap-contact100-form-btn">
                <div class="contact120-form-bgbtn"></div>
                <button class="contact120-form-btn" type="button" id="remove_object" name="remove_object" onclick="delete_file(this)">
                        <i class="material-icons">delete_sweep</i>
                </button>
            </div>
        </div>
        <p>----------------------------------------------------------------------------------------------------</p>
    </li>
`;

// Create Object
const add = document.getElementById('add_object');
const ul = document.getElementById('Inventori_list');
var init_id = 0; 
add.addEventListener("click", function(){
    ul.insertAdjacentHTML('beforeend', '<li id="obj_'+init_id+'">');
    var li_temp = document.getElementById('obj_'+init_id);
    li_temp.insertAdjacentHTML('beforeend', oggettoInventario_temp);
    init_id = init_id+1;
});

// Delete Object
function delete_file(nod){
    var ele = nod.parentNode.parentNode.parentNode.id;
    var liElements = document.getElementById(ele);
    liElements.remove();
};
