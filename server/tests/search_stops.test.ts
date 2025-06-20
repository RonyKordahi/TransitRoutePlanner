const searchSupertest = require("supertest");
const searchApp = require("../index").default;
const { pool: searchPool } = require("../functions");

describe("GET /stops/search", () => {
    const mockClient = {
        query: jest.fn(),
        release: jest.fn(),
    };

    beforeEach(() => {
        searchPool.connect = jest.fn().mockResolvedValue(mockClient);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should return stops matching the search query", async () => {
        const mockResults = [
            { id: 1, name: "Main Street", location: "45.5017,-73.5673" },
            { id: 2, name: "Main Terminal", location: "45.5081,-73.5550" },
        ];

        mockClient.query.mockResolvedValue({ rows: mockResults });
        mockClient.release.mockReturnValue(undefined);

        const res = await searchSupertest(searchApp).get("/stops/search").query({ name: "Main" });

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockResults);

        expect(mockClient.query).toHaveBeenCalledWith(
            expect.stringContaining("ILIKE $1"),
            ["%Main%"]
        );

        expect(mockClient.release).toHaveBeenCalled();
    });
});
