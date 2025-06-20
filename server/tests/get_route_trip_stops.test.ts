const routeTripsSupertest = require("supertest");
const routeTripsApp = require("../index").default;
const { pool: routeTripsPool } = require("../functions");

describe("GET /routes/:routeId/stops", () => {
    const mockClient = {
        query: jest.fn(),
        release: jest.fn(),
    };

    beforeEach(() => {
        routeTripsPool.connect = jest.fn().mockResolvedValue(mockClient);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should return trip stops for the given route ID", async () => {
        const mockResults = [
            {
                id: 101,
                trip_id: 501,
                stop_id: 101,
                name: "Stop A",
                stop_sequence: 1,
                arrival_time: "08:00:00",
                departure_time: "08:05:00",
                location: "45.5017,-73.5673",
            },
            {
                id: 102,
                trip_id: 501,
                stop_id: 102,
                name: "Stop B",
                stop_sequence: 2,
                arrival_time: "08:10:00",
                departure_time: "08:15:00",
                location: "45.5022,-73.5680",
            },
        ];

        // Mock the query method to resolve with rows matching mockResults
        mockClient.query.mockResolvedValue({ rows: mockResults });
        mockClient.release.mockReturnValue(undefined);

        const routeId = "abc123";

        const res = await routeTripsSupertest(routeTripsApp)
            .get(`/routes/${routeId}/stops`);

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockResults);

        expect(mockClient.query).toHaveBeenCalledWith(
            expect.stringContaining("FROM trip_stops"),
            [routeId]
        );

        expect(mockClient.release).toHaveBeenCalled();
    });
});
