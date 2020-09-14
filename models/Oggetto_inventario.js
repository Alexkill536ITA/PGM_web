// Crate Template Object
const oggettoInventario_temp = `
    <li>
        <p style="width: 110px;float: left;color: black">Nome oggetto:</p>
        <input style="float: left" class="label-input120">
        <p style="width: 60px;float: left;color: black">Quantità:</p>
        <input style="float: left; width: 50px" class="label-input120">
        <p style="width: 60px;color: black">Note:</p>
        <textarea style="min-height: 60px" class="input100" name="message" placeholder="Informazione sull' oggetto."></textarea>
        <div class="container-contact120-form-btn">
            <div style="width: 50px; max-height: 50px" class="wrap-contact100-form-btn">
                <div class="contact120-form-bgbtn"></div>
                <button class="contact120-form-btn" id="remove_object">
                        <i class="material-icons">delete_sweep</i>
                </button>
            </div>
        </div>
        <p>----------------------------------------------------------------------------------------------------</p>
    </li>
`;

const add = document.getElementById('add_object');
const ul = document.getElementById('Inventori_list');
add.addEventListener("click", function(){
    ul.insertAdjacentHTML('beforeend', oggettoInventario_temp);
});

const rem = document.getElementById('remove_object');
if (!rem) {
    rem.addEventListener("click", function(){
        //this.parentElement.remove();
        console.log(this.parentElement);
    });
}