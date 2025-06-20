// Constants
const PORT = 8000;

// Imports
import morgan from "morgan";
import express from "express";

// Functions
const {
    getAllRoutes,
    getUpcomingStops,
    getRouteTripStops,
    getStopByUserInput,
    getRoutesPopularity,
} = require("./functions");

const app = express();

// Setting Morgan
app.use(morgan("tiny"));

// Routes
app.get("/routes", getAllRoutes);
app.get("/stops/search", getStopByUserInput);
app.get("/stops/search/:stopId", getUpcomingStops);
app.get("/routes/:routeId/stops", getRouteTripStops);
app.get("/report/routes/popularity", getRoutesPopularity);

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}

export default app;