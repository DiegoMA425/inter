const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let departamentoSchema = new Schema({
    id_jefe_de_area: {
        type: Schema.Types.ObjectId,
        required: true
    },
    
    nombre_del_puesto: {
        type: String,
        required: [true, 'necesito el nombre']
    },
    numero_empleados: {
        type: Number,
        required: [true, 'necesito el numero ']
    },
    extension_telefonica: {
        type: Number,
        required: [true, 'necesito la extension']
    },
   
    activo: {
        type: Boolean,
        default: true
    }
});
module.exports = mongoose.model('departamento', departamentoSchema);