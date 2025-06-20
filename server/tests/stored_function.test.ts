const storedFunctionSupertest = require("supertest");
const storedFunctionApp = require("../index").default;
const { pool: storedFunctionPool } = require("../functions");

describe("GET /stops/search/:stopId", () => {
    const mockClient = {
        query: jest.fn(),
        release: jest.fn(),
    };

    beforeEach(() => {
        storedFunctionPool.connect = jest.fn().mockResolvedValue(mockClient);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should return upcoming stops from the stored PostgreSQL function", async () => {
        const mockResult = [
            {
                trip_id: 2001,
                trip_number: 42,
                route_name: "Green Line",
                arrival_time: "14:45:00",
                departure_time: "14:47:00",
            },
            {
                trip_id: 2002,
                trip_number: 43,
                route_name: "Green Line",
                arrival_time: "15:00:00",
                departure_time: "15:02:00",
            },
        ];

        mockClient.query.mockResolvedValue({ rows: mockResult });
        mockClient.release.mockReturnValue(undefined);

        const stopId = "abc123";
        const timestamp = "2025-06-20T14:30:00";

        const res = await storedFunctionSupertest(storedFunctionApp)
            .get(`/stops/search/${stopId}`)
            .query({ timestamp });

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockResult);

        expect(mockClient.query).toHaveBeenCalledWith(
            expect.stringContaining("get_next_trips($1, $2)"),
            [stopId, timestamp]
        );

        expect(mockClient.release).toHaveBeenCalled();
    });
});
