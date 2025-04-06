const deviceModel = require("../models/deviceModel");

const getAllDevices = (req, res) => {
    res.json(deviceModel.devices);
};

const getDeviceById = (req, res) => {
    const device = deviceModel.devices.find(d => d.id == req.params.id);
    if (device) res.json(device);
    else res.status(404).json({ message: "Device not found" });
};


module.exports = {
    getAllDevices,
    getDeviceById
};


