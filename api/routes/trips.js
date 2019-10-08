// Products or Trips API

const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const TripsController = require('../controllers/trips');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
        },

    fileFilter: fileFilter

});

const Trip = require('../models/trip');

router.get('/', TripsController.trips_get_all);

router.post('/', checkAuth, upload.single('tripImage'), TripsController.trips_create_trip);

router.get('/:tripsId', TripsController.trips_get_trip);

router.patch('/:tripsId', checkAuth, TripsController.trips_update_trip);

router.delete('/:tripsId', checkAuth, TripsController.trips_delete_trip);



module.exports = router;