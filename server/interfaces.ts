export interface Route {
    id: number,
    name: string,
    type: string,
    active: Boolean,
}

export interface Stop {
    id: number,
    name: string,
    location: string,
}

export interface TripStops {
    id: number,
    name: string,
    trip_id: number,
    stop_id: number,
    location: string,
    arrival_time: string,
    stop_sequence: number,
    departure_time: string,
}

export interface RoutePopularity {
    route: string,
    total_trips: string,
}

export interface UpcomingStops {
    trip_id: number,
    route_name: string,
    trip_number: number,
    arrival_time: string,
    departure_time: string,
}