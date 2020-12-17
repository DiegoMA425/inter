const express = require('express');
const _ = require('underscore');
const app = express();
const departamento = require('../models/departamento');

app.get('/departamento', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 300;
    
    Categoria.find({})
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

    Categoria.findById({ _id: iddepartamento })
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
        id_jefe_de_area: req.body.id_jefe_de_area,
        nombre: req.body.nombre,
        numero_empleado: req.body.numero_empleado,
        extension_telefonica: req.body.extension_telefonica,
        activo: req.body.activo
      
        
    });

    cat.save((err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un departamento ',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'departamento insertada con exito',
            catDB
        });
    });
});


app.put('/departamento/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['id_jefe_de_area', 'nombre', 'numero_empleados', 'extension_telefonica', 'activo']);

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, catDB) => {
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
                catDB
            });
        });
});


app.delete('/departamento/:id', function(req, res) {

    let id = req.params.id;

    departamento.findByIdAndRemove(id, { context: 'query' }, (err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'departamento eliminada con exito',
            catDB

        });

    });

});


module.exports = app;

