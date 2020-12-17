const express = require('express');
const _ = require('underscore');
const app = express();
const departamento = require('../models/departamento');

app.get('/departamento', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 300;
    
    departamento.find({activo: true})
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('usuario', '_id')
        .exec((err, departamento) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al listar los departamentos',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'departamentos listados con exito',
                conteo: departamento.length,
                departamento
            });
        });

});


app.get('/departamento/:id', (req, res) => {

    let iddepartamento = req.params.id;

    departamento.findById({ _id: iddepartamento })
    .populate('usuario', '_id')
        .exec((err, departamento) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al listar los departamentos ',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'departamento listado con exito',
                conteo: departamento.length,
                departamento
            });
        });

});


app.post('/departamento', (req, res) => {
    let cat = new departamento({

        nombre: req.body.nombre,
        numero_empleados: req.body.numero_empleados,
        extension_telefonica: req.body.extension_telefonica
       

    });

    cat.save((err, depDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un departamento ',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'departamento insertado con exito',
            depDB
        });
    });
});


app.put('/departamento/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, [ 'nombre', 'numero_empleados', 'extension_telefonica']);

    departamento.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, depDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de actualizar',
                    err
                });
            }
            res.json({
                ok: true,
                msg: 'departamento actualizado con exito',
                depDB
            });
        });
});


app.delete('/departamento/:id', function(req, res) {

    let id = req.params.id;

    departamento.findByIdAndRemove(id, { context: 'query' }, (err, depDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'departamento eliminado con exito',
            depDB

        });

    });

});


module.exports = app;

