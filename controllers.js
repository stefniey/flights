const {app} = require("./app");
var {flights} = require("./models");

app.get("/", (req, res) => {
    res.send("<h1>Flight Services Homepage</h1>")
})

// book flight
app.post("/flights", (req, res) => {
    const flightId = flights.length + 1;
    const entry = { flightId, ...req.body }
    flights.push(entry);
    res.sendStatus(201)
})

// get all flight
app.get("/flights", (req, res) => {
    res.send(flights);
})

// get single flight
app.get("/flights/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let currentFlight = flights.filter(flight => flight.flightId === id)[0];
    if (currentFlight) {
        res.send(currentFlight);
    } else {
        res.sendStatus(404);
    }
})

function validateFlight (flightEntry) {
    let message = "";
    if (!flightEntry.flightId) {
        message = "flightID not found"
    }
    if (!flightEntry.title) {
        message = "title not found"
    }
    if (!flightEntry.time) {
        message = "time not found"
    }
    if (!flightEntry.price) {
        message = "price not found"
    }
    if (!flightEntry.date) {
        message = "date not found"
    }

    return message
}

// update/edit flight
app.put("/flights/:id", (req, res) => {
    let flightId = parseInt(req.params.id);
    let flight = req.body;
    let currentFlight = flights.filter((flight) => flight.flightId === flightId)[0];
    if (currentFlight) {
        let isValid = validateFlight(currentFlight);
        if (isValid === "") {
            currentFlight.title = flight.title;
            currentFlight.time = flight.time;
            currentFlight.price = flight.price;
            currentFlight.date = flight.date;
            res.status(200).send(currentFlight);
        } else {
            res.statusMessage = isValid;
            res.sendStatus(404);
        }
    } else {
        res.statusMessage = "Flight not found";
        res.sendStatus(404);
    }
})

// delete flight
app.delete("/flights/:id", (req, res) => {
    let flightId = parseInt(req.params.id);
    flights = flights.filter((flight) => flight.flightId !== flightId);
    res.sendStatus(200)
})
