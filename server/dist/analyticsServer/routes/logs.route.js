"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const maintainance_controller_1 = require("../controllers/maintainance.controller");
const router = (0, express_1.Router)();
const Logs = new maintainance_controller_1.MainainanceRecords(); // Create an instance of the Logs class
// Route for creating a new Logs
router.post('/', async (req, res) => {
    try {
        const LogsData = req.body; // Assuming request body contains Logs data
        const newLogs = await Logs.createLogs(LogsData);
        res.json(newLogs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Route for getting all Logss
router.get('/', async (req, res) => {
    try {
        const allLogs = await Logs.getAllMaintainanceRecords();
        res.json(allLogs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Route for getting a single Logs by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const foundLogs = await Logs.getMaintainanceRecordById(id);
        if (foundLogs) {
            res.json(foundLogs);
        }
        else {
            res.status(404).json({ message: 'Logs not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Route for updating a Logs by ID
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedLogsData = req.body; // Assuming request body contains updated Logs data
    try {
        const updatedLogs = await Logs.updateMaintainanceRecordById(id, updatedLogsData);
        res.json(updatedLogs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Route for deleting a Logs by ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Logs.deleteMaintainanceRecordById(id);
        res.json({ message: 'Logs deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=logs.route.js.map