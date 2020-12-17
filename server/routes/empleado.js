const express = require('express');
const _ = require('underscore');
const empleado = require('../models/empleado');
const app = express();

app.get('/empleado', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 300;
    
    empleado.find({ disponible: true })
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('usuario', '_id')
        .populate('departamento', 'extension_telefonica')
        .exec((err, empleado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'ha ocurrido error al momento de consultar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: ' empleados obtenidos con exito',
                conteo: empleado.length,
                empleado
            });
        });
});


app.get('/empleado/:id', function(req, res) {

    let idempleado = req.params.id;

    empleado.findById({ _id: idempleado })
    .populate('usuario', '_id')
    .populate('departamento', 'extension_telefonica')
        .exec((err, empleado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'ha ocurrido error al momento de consultar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'empleados obtenidos con exito',
                conteo: empleado.length,
                empleado
            });
        });
});


app.post('/empleado', (req, res) => {
    let pro = new empleado({
        id_usuario : req.body.id_usuario,
        id_departamento : req.body.id_departamento,
        nombre_del_puesto : req.body.nombre_del_puesto,
        anios_servicio : req.body.anios_servicio,
        hora_entrada : req.body.hora_entrada,
        hora_salida : req.body.hora_salida,
        activo: req.body.activo
        
    });

    pro.save((err, proDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un empleado',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'empleado insertado con exito',
            proDB
        });
    });
});


app.put('/empleado/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['id_usuario', 'id_departamento','nombre_del_puesto', 'anios_servicio', 'hora_entrada', 'hora_salida', 'activo']);

    empleado.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, proDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de actualizar',
                    err
                });
            }
            res.json({
                ok: true,
                msg: 'Producto actualizado con exito',
                producto: proDB
            });
        });
});

app.delete('/empleado/:id', function(req, res) {

    let id = req.params.id;

    empleado.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, proDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'empleado eliminado con exito',
            proDB

        });
    });
});


module.exports = app;