// Axios
import axios from "axios";

// Moment
import moment from "moment";

// Styled Components
import styled from "styled-components";

// React
import { useEffect, useState } from "react";

// Types
import { UpcomingStop } from "../interfaces";

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

// MUI-X
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const ViewUpcomingStops = () => {

    const { stopId } = useParams();

    const selectedStop = useOutletContext<string>();

    const [loading, setLoading] = useState(false);

    const [selectedDateTime, setSelectedDateTime] = useState(moment(new Date()));
    
    const [fetchedStops, setFetchedStops] = useState<UpcomingStop[] | null>(null);

    // Fetch the upcoming stops
    const getUpcomingStops = () => {
        setLoading(true);

        axios
            .get(`/stops/search/${stopId}?timestamp=${moment(selectedDateTime).format("MMM YYYY DD, h:mm:ss a")}`)
            .then(res => {
                setFetchedStops(res.data);

                setTimeout(() => {
                    setLoading(false);
                }, 500)
            })
    }

    useEffect(() => {
        setFetchedStops(null);
        setSelectedDateTime(moment(new Date()));
    }, [selectedStop])

    return (
        <UpcomingStopsContainer>

            <StyledH3>Select arrival time for {selectedStop}</StyledH3>

            {/* Date time picker */}
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={"en-us"}>

                <DateTimePicker
                    label={"Date & Time"}
                    value={selectedDateTime}
                    onAccept={getUpcomingStops}
                    onChange={(newDate) => setSelectedDateTime(moment(newDate))}
                />

            </LocalizationProvider>

            {
                loading
                    ? (
                        <LoadingDiv>
                            <CircularProgress />
                        </LoadingDiv>
                    )
                    : fetchedStops && (
                        <Results>
                            <h3>
                                {
                                    fetchedStops.length
                                        ? `There are ${fetchedStops.length} upcoming stops:`
                                        : "There are no more stops after this time"
                                }
                            </h3>

                            <TableContainer>
                                <Table stickyHeader>

                                    {/* Columns */}
                                    <TableHead>
                                        <TableRow>
                                            <Column>Route</Column>
                                            <Column>Arrival Time</Column>
                                            <Column>Departure Time</Column>
                                        </TableRow>
                                    </TableHead>

                                    {/* Trip info */}
                                    <TableBody>
                                        {
                                            fetchedStops.map((stop: UpcomingStop) => {

                                                console.log(stop);

                                                return (
                                                    <TableRow>
                                                        <TableCell>{stop.route_name} - Trip {stop.trip_number}</TableCell>
                                                        <TableCell>{moment(stop.arrival_time).format("ddd MMM D YYYY, HH:mm")}</TableCell>
                                                        <TableCell>{moment(stop.departure_time).format("ddd MMM D YYYY, HH:mm")}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Results>
                    )
            }

        </UpcomingStopsContainer>
    )
}

const Column = muiStyle(TableCell)({
    fontWeight: "bold",
    fontSize: "20px"
})

const LoadingDiv = styled.div`
    margin-top: 5px;
`

const Results = styled.div`
    margin-top: 25px;
`;


const StyledH3 = styled.h3`
    margin-bottom: 15px;
`

const UpcomingStopsContainer = styled.div`
    margin-top: 25px;
`

export default ViewUpcomingStops;