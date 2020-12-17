const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let usuarioSchema = new Schema({
nombre: {
    type: String,
    required: [true, 'necesito el nombre']
},

primer_apellido: {
    type: String,
    required: [true, 'necesito el apellido']
},

segundo_apellido:{
    type: String,
    required: [true, 'necesito el apellido']
},
edad: {
    type: Number,
    required: [true, 'necesito la edad']
},
curp: {
    type: String,
    required: [true, 'necesito la curp']
},
telefono: {
    type: Number,
    required: [true, 'necesito el numero']
},
mail: {
    type: String,
    required: [true, 'necesito el correo'],
    unique:true
},
activo: {
    type: Boolean,
    default: true
}


});
module.exports = mongoose.model('usuario', usuarioSchema);