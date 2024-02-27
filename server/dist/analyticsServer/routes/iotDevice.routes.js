"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const iotDevice_contoller_1 = require("../controllers/iotDevice.contoller"); // Import the IoTDevice class
const router = (0, express_1.Router)();
const ioTDevice = new iotDevice_contoller_1.IoTDevice(); // Create an instance of the IoTDevice class
// Route for creating a new IoTDevice
router.post('/', async (req, res) => {
    try {
        const IoTDeviceData = req.body; // Assuming request body contains IoTDevice data
        const newIoTDevice = await ioTDevice.createIoTDevice(IoTDeviceData);
        res.json(newIoTDevice);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Route for getting all IoTDevices
router.get('/', async (req, res) => {
    try {
        const allIoTDevice = await ioTDevice.getAllIoTDevices();
        res.json(allIoTDevice);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Route for getting a single IoTDevice by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const foundIoTDevice = await ioTDevice.getIoTDeviceById(id);
        if (foundIoTDevice) {
            res.json(foundIoTDevice);
        }
        else {
            res.status(404).json({ message: 'IoTDevice not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Route for updating a IoTDevice by ID
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedIoTDeviceData = req.body; // Assuming request body contains updated IoTDevice data
    try {
        const updatedIoTDevice = await ioTDevice.updateIoTDeviceById(id, updatedIoTDeviceData);
        res.json(updatedIoTDevice);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Route for deleting a IoTDevice by ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await ioTDevice.deleteIoTDeviceById(id);
        res.json({ message: 'IoTDevice deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=iotDevice.routes.js.map