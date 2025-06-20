// Moment
import moment from "moment";

// Styled Components
import styled from "styled-components";

// Custom Hook
import useAxios from "../hooks/useAxios";

// Types
import { TripStop } from "../interfaces";

// React Router
import { useOutletContext, useParams } from "react-router";

// MUI
import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    CircularProgress,
    styled as muiStyle,
} from '@mui/material';

const ViewTripStops = () => {

    const { routeId } = useParams();

    const selectedTrip = useOutletContext<string>();

    const [tripStops, loading] = useAxios<TripStop[]>(`/routes/${routeId}/stops`);

    return (
        <TripInfoContainer>
            <h3>{selectedTrip}: </h3>

            {
                loading
                    ? <CircularProgress />
                    : (
                        <TableContainer>
                            <Table stickyHeader>

                                {/* Columns */}
                                <TableHead>
                                    <TableRow>
                                        <Column>Stop #</Column>
                                        <Column>Stop Name</Column>
                                        <Column>Arrival Time</Column>
                                        <Column>Departure Time</Column>
                                        <Column>Location</Column>
                                    </TableRow>
                                </TableHead>

                                {/* Trip info */}
                                <TableBody>
                                    {
                                        tripStops && tripStops.map((stop: TripStop) => {
                                            return (
                                                <TableRow key={`stop-${stop.id}`}>
                                                    <TableCell>{stop.stop_sequence}</TableCell>
                                                    <TableCell>{stop.name}</TableCell>
                                                    <TableCell>{moment(stop.arrival_time).format("ddd MMM D YYYY, HH:mm")}</TableCell>
                                                    <TableCell>{moment(stop.departure_time).format("ddd MMM D YYYY, HH:mm")}</TableCell>
                                                    <TableCell>{stop.location.replace(",", ", ")}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
            }

        </TripInfoContainer>
    )
}

const Column = muiStyle(TableCell)({
    fontWeight: "bold",
    fontSize: "20px"
})

const TripInfoContainer = styled.div`
    margin-top: 25px;
`;

export default ViewTripStops;