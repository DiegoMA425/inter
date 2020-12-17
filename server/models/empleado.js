const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let empleadoSchema = new Schema({
   
    nombre_del_puesto: {
        type: String,
        required: [true, 'necesito el nombre']
    },
    anios_servicio: {
        type: Number,
        required: [true, 'necesito los ']
    },
    hora_entrada: {
        type: Number,
        required: [true, 'necesito la hora']
    },
    hora_salida: {
        type: Number,
        required: [true, 'necesito la hora']
    },
    activo: {
        type: Boolean,
        default: true
    }
});
module.exports = mongoose.model('empleado', empleadoSchema);