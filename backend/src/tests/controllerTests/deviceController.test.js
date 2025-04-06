const { getAllDevices, getDeviceById } = require("../../controllers/deviceController");
const deviceModel = require("../../models/deviceModel");

jest.mock("../../models/deviceModel", () => ({
  devices: [
    {
      id: "1",
      temperature: "23 c",
      humidity: "90%",
      lat: 25.243143273449427,
      lng: 55.32663345336914,
      name: "sensor-1",
      status: "on",
      totalPowerConsumption: "23 kw",
      monthlyPowerConsumption: {
        jan: "24 kw",
        feb: "21 kw",
        march: "22 kw",
        april: "28 kw",
        may: "29 kw",
        june: "31 kw",
        july: "34 kw",
        august: "23 kw",
        september: "44 kw",
        october: "41 kw",
        november: "24 kw",
        december: "21 kw",
      },
    },
    {
      id: "2",
      temperature: "21 c",
      humidity: "92%",
      lat: 25.12235,
      lng: 55.37482,
      name: "sensor-2",
      status: "off",
      totalPowerConsumption: "22 kw",
      monthlyPowerConsumption: {
        jan: "18 kw",
        feb: "19 kw",
        march: "20 kw",
        april: "21 kw",
        may: "22 kw",
        june: "23 kw",
        july: "25 kw",
        august: "24 kw",
        september: "26 kw",
        october: "27 kw",
        november: "22 kw",
        december: "20 kw",
      },
    },
  ]
}));

describe("Device Controller", () => {

  test("should return all devices", () => {
    const req = {};
    const res = {
      json: jest.fn(),
    };

    getAllDevices(req, res);

    expect(res.json).toHaveBeenCalledWith(deviceModel.devices);
  });

  test("should return device by id", () => {
    const req = { params: { id: "1" } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    getDeviceById(req, res);

    expect(res.json).toHaveBeenCalledWith(deviceModel.devices[0]);
    expect(res.status).not.toHaveBeenCalled();
  });

  test("should return 404 when device is not found", () => {
    const req = { params: { id: "999" } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    getDeviceById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Device not found" });
  });

});

