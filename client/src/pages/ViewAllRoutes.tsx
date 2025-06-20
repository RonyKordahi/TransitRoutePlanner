// Styled Components
import styled from "styled-components";

// Custom Hook
import useAxios from "../hooks/useAxios";

// Types
import { Route, Trip } from "../interfaces";

// React
import { useEffect, useState } from "react";

// React Router
import { Link, Outlet } from "react-router";

// MUI
import { styled as muiStyle } from "@mui/material/styles";
import CircularProgress from '@mui/material/CircularProgress';
import {
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";

// Components
import RoutesPopularity from "../components/RoutesPopularity";

interface Filters {
    active: Boolean,
    order: "ASC" | "DESC",
    type: string | undefined,
}

const ViewAllRoutes = () => {

    // Default filters
    const [filters, setFilters] = useState<Filters>({
        type: undefined,
        active: true,
        order: "ASC",
    })

    const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

    const [routes, loading] = useAxios(`/routes?type=${filters.type}&active=${filters.active}&order=${filters.order}`);

    useEffect(() => {
        setSelectedTrip(null);
    }, [filters])

    return (
        <main>
            <FlexDiv>

                <div>
                    <h2>All available active routes: </h2>

                    {/* Filters */}
                    {
                        routes && (
                            <FilterContainer>

                                <StyledMuiButton
                                    variant="contained"
                                    onClick={() => {
                                        setFilters({
                                            ...filters,
                                            type: "bus",
                                        })
                                    }}
                                >
                                    Busses
                                </StyledMuiButton>

                                <StyledMuiButton
                                    variant="contained"
                                    onClick={() => {
                                        setFilters({
                                            ...filters,
                                            type: "train",
                                        })
                                    }}
                                >
                                    Trains
                                </StyledMuiButton>

                                <FormControl style={{ width: "fit-content", margin: "0 5px" }}>
                                    <InputLabel htmlFor="order">Order</InputLabel>
                                    <Select
                                        id="order"
                                        name="order"
                                        label="Order"
                                        value={filters.order}
                                        onChange={(event) => {
                                            setFilters({
                                                ...filters,
                                                order: event.target.value,
                                            })
                                        }}
                                    >
                                        <MenuItem value="ASC">Ascending</MenuItem>
                                        <MenuItem value="DESC">Descending</MenuItem>
                                    </Select>

                                </FormControl>

                                <StyledMuiButton
                                    variant="contained"
                                    onClick={() => {
                                        setFilters({
                                            type: undefined,
                                            active: true,
                                            order: "ASC",
                                        })
                                    }}
                                >
                                    ❌ Clear Filters
                                </StyledMuiButton>
                            </FilterContainer>
                        )
                    }

                    {
                        loading
                            ? <CircularProgress />
                            : (
                                // Fetch Results
                                <ul>
                                    {
                                        routes.length && routes.map((route: Route, routeIndex: number) => {
                                            return (
                                                <li key={`route-${routeIndex}`}>
                                                    {route.name}
                                                    {" "}
                                                    ({route.type.substring(0, 1).toUpperCase()}{route.type.substring(1)})

                                                    {/* Sub-list for the trip details */}
                                                    <ul>
                                                        {
                                                            route.trips.map((trip: Trip, tripIndex) => {
                                                                return (
                                                                    <li key={`trip-${trip.id}`}>
                                                                        <Link
                                                                            to={`/routes/${trip.id}/stops`}
                                                                            onClick={() => {
                                                                                setSelectedTrip(`${route.name} trip ${tripIndex + 1}`)
                                                                            }}
                                                                        >
                                                                            Trip {tripIndex + 1}
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>

                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            )
                    }
                </div>


            </FlexDiv>

            {selectedTrip && <Outlet context={selectedTrip} />}

            <RoutesPopularity />
        </main >
    )
}

const FilterContainer = styled.div`
    margin-bottom: 5px;
`

const StyledMuiButton = muiStyle(Button)({
    margin: "0px 5px",
    padding: "15px",

    ":first-of-type": {
        marginLeft: "0px",
    }
})

const FlexDiv = styled.div`
    display: flex;
`;

export default ViewAllRoutes