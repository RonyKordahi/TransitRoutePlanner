// Types
import { QueryResult } from "pg";
import { Request, Response } from "express";

// Interfaces
import {
    Stop,
    Route,
    TripStops,
    UpcomingStops,
    RoutePopularity,
} from "./interfaces";

// Set up the client
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
});

// Gets all the available active routes
// ↪ Optional filter for route type
const getAllRoutes = async (req: Request, res: Response) => {

    const { type, active, order } = req.query as {
        type: string,
        active: string,
        order: "ASC" | "DESC"
    }

    const client = await pool.connect();

    // Adapt query based on if a filter was used or not
    const queryText = type !== "undefined"
        ? `
            SELECT * 
            FROM routes 
            WHERE type = $1 
            AND active = $2 
            ORDER BY name ${order === "ASC" ? "ASC" : "DESC"}
        `
        : `
            SELECT * 
            FROM routes 
            WHERE active = $1 
            ORDER BY name ${order === "ASC" ? "ASC" : "DESC"}
        `

    const queryParams = type !== "undefined"
        ? [type, active]
        : [active];

    const queryResult: QueryResult<Route> = await client.query(queryText, queryParams);

    const queryResultWithTrips = await Promise.all(

        queryResult.rows.map(async (query: any) => {

            const trips = await client.query(`
                SELECT * 
                FROM trips 
                WHERE route_id = '${query.id}'
            `);

            return { ...query, trips: trips.rows };
        })
    )

    client.release();

    res.status(200).json(queryResultWithTrips);
}

// Gets all the stops that partially match the user's search
const getStopByUserInput = async (req: Request, res: Response) => {

    const { name } = req.query as { name: string };

    const client = await pool.connect();

    const queryText = `
        SELECT * 
        FROM stops 
        WHERE name ILIKE $1
    `;

    const queryParams = [`%${name}%`];

    const queryResult: QueryResult<Stop> = await client.query(queryText, queryParams);

    client.release();

    res.status(200).json(queryResult.rows);
}

// Gets all the stops on a specific trip based on a route ID
const getRouteTripStops = async (req: Request, res: Response) => {
    const { routeId } = req.params;

    const client = await pool.connect();

    const queryText = `
        SELECT * 
        FROM trip_stops 
        JOIN stops 
        ON trip_stops.stop_id = stops.id
        WHERE trip_id = $1 
        ORDER BY stop_sequence ASC
    `;

    const queryParams = [routeId];

    const queryResult: QueryResult<TripStops> = await client.query(queryText, queryParams);


    client.release();

    res.status(200).json(queryResult.rows);
}

// Gets how many trips there are per available route
const getRoutesPopularity = async (req: Request, res: Response) => {

    const client = await pool.connect();

    const queryResult: QueryResult<RoutePopularity> = await client.query(`
        SELECT routes.name as route, COUNT(*) as total_trips 
        FROM trips 
        JOIN routes 
        ON trips.route_id = routes.id
        GROUP BY routes.name
    `);

    client.release();

    res.status(200).json(queryResult.rows);
}

// Gets up to the next 5 upcoming trips for a specified stop based on a specific date time
const getUpcomingStops = async (req: Request, res: Response) => {

    const { stopId } = req.params;
    const { timestamp } = req.query;

    const client = await pool.connect();

    const queryText = `
        SELECT *
        FROM get_next_trips($1, $2)
    `;

    const queryParams = [stopId, timestamp];

    const queryResult: QueryResult<UpcomingStops> = await client.query(queryText, queryParams);

    client.release();

    res.status(200).json(queryResult.rows);
}

module.exports = {
    pool,
    getAllRoutes,
    getUpcomingStops,
    getRouteTripStops,
    getStopByUserInput,
    getRoutesPopularity,
}