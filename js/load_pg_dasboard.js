const { MongoClient } = require("mongodb");
const jwt = require('jsonwebtoken');

// Crate Template Object
const PG_temp = `
            <td>
                <p style="width: 280px; margin-right: 10px;">Id_Scheda</p>
            </td>
            <td>
                <p style="width: 255px; margin-right: 10px;">Nome_PG</p>
            </td>
            <td>
            <button class="button_opt">
                <i class="fa fa-pencil-square-o m-l-7" aria-hidden="true"></i>
            </button>
        </td>
        <td>
            <button style="margin-right: 0px;" class="button_del">
                <i class="fa fa-trash m-l-7" aria-hidden="true"></i>
            </button>
        </td>
    </tr>
`;

// Create Object
const root_table = document.getElementById('list_PG');
window.onload = function(req, res) {
    const token = req.cookies['jwt'];
    jwt.verify(token,process.env.JWT_SECRET, function(err, decoded)  {
        if (!err) {
            console.log(decoded.user);
        }
    });
}