"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicle_controller_1 = require("../controllers/vehicle.controller");
; // Import the Vehicle class
const router = (0, express_1.Router)();
const vehicle = new vehicle_controller_1.Vehicle(); // Create an instance of the Vehicle class
/**
 * @swagger
 * definitions:
 *   Vehicle:
 *     type: object
 *     required:
 *       - regNumber
 *       - vehicleModel
 *       - type
 *       - status
 *       - iotDevice
 *     properties:
 *       regNumber:
 *         type: string
 *         description: The registration number of the vehicle
 *       vehicleModel:
 *         type: string
 *         description: The model of the vehicle
 *       status:
 *         type: string
 *         description: The status of the vehicle. It should be Active, InActive, or Maintenance
 *       iotDevice:
 *         type: string
 *         description: The ID of the linked IoT device
 */
// Route for creating a new vehicle
/**
 * @swagger
 * /api/vehicles:
 *   post:
 *     summary: Register a vehicle
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Vehicle object that needs to be registerd
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Vehicle'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *              $ref: '#/definitions/Vehicle'
 */
router.post('/', async (req, res) => {
    try {
        const vehicleData = req.body; // Assuming request body contains vehicle data
        const newVehicle = await vehicle.createVehicle(vehicleData);
        res.json(newVehicle);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Route for getting all vehicles
/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Get All vehicles
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Vehicle'
 */
router.get('/', async (req, res) => {
    try {
        const allVehicles = await vehicle.getAllVehicles();
        res.json(allVehicles);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Route for getting a single vehicle by ID
/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Get a single Vehicle by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/Vehicle'
 */
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const foundVehicle = await vehicle.getVehicleById(id);
        if (foundVehicle) {
            res.json(foundVehicle);
        }
        else {
            res.status(404).json({ message: 'Vehicle not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Route for getting a single vehicle by ID
/**
 * @swagger
 * /api/vehicles/{id}:
 *   put:
 *     summary: Update single Vehicle by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *       - in: body
 *         name: body
 *         description: Vehicle object that needs to be updates
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Vehicle'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/Vehicle'
 */
// Route for updating a vehicle by ID
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedVehicleData = req.body; // Assuming request body contains updated vehicle data
    try {
        const updatedVehicle = await vehicle.updateVehicleById(id, updatedVehicleData);
        res.json(updatedVehicle);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Route for deleting a vehicle by ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await vehicle.deleteVehicleById(id);
        res.json({ message: 'Vehicle deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=vehicle.routes.js.map