
const Trip = require('../models/trip');
const mongoose = require('mongoose');

exports.trips_get_all = (req, res, next) => {
    Trip.find()
    .select('name price _id tripImage') //qual dado eu quero trazer na consulta
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            trips: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    tripImage: doc.tripImage,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8000/trips/' + doc._id
                    }
                }
            })
        };
        // if (docs.length >= 0) {
            res.status(200).json(response);
        // } else {
        //     res.status(404).json({
        //         message: 'Não encontrei nada'
        //     })
        // }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });

}


exports.trips_create_trip = (req, res, next) => {
    const trip = new Trip({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        tripImage: req.file.path
    });

    trip
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Trip criada com sucesso!",
            createdTrip: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8000/trips/' + result._id 
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });

    res.status(201).json({
        message: 'Trip criada com sucesso!',
        createdTrip: trip
    })
}

exports.trips_get_trip = (req, res, next) => {
    const id = req.params.tripsId;
    Trip.findById(id)
    .select('name price _id tripImage')
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json({
                trip: doc,
                request: {
                    type: 'GET',
                    description: "GET_ALL_TRIPS",
                    url: "http://localhost:300/trips"
                }
            });
        } else {
            res.status(404).json({
                message: "ID inválido"
            });
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

exports.trips_update_trip = (req, res, next) => {
    const id = req.params.tripsId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
                                    
    Trip.update({_id: id}, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            messae: "Trip atualizada",
            request: {
                type: 'GET',
                url: 'http://localhost:8000/trips/'+ id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.trips_delete_trip = (req, res, next) => {
    const id = req.params.tripsId;
    Trip.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Trip deletada',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8000/trips/',
                    body: {name: "string", price: "number"}
                }
            })
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
}