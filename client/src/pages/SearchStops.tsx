// Axios
import axios from "axios";

// React
import { useState } from "react"

// Types
import { Stop } from "../interfaces";

// Styled Components
import styled from "styled-components";

// React Router
import { Link, Outlet } from "react-router";

// MUI
import { Button, TextField, CircularProgress } from "@mui/material";

const SearchStops = () => {

    const [userInput, setUserInput] = useState<string>("");

    const [loading, setLoading] = useState<Boolean>(false);

    const [selectedStop, setSelectedStop] = useState<string | null>(null);

    const [fetchedStops, setFetchedStops] = useState<Stop[] | null>(null);

    const searchForStop = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);

        axios
            .get(`/stops/search?name=${userInput}`)
            .then(res => {
                setFetchedStops(res.data);

                setTimeout(() => {
                    setLoading(false);
                }, 500)
            })
    }

    return (
        <main>
            <h2>Search for a Stop:</h2>

            <StyledForm onSubmit={searchForStop}>

                <TextField
                    type="text"
                    label="Search"
                    variant="outlined"
                    placeholder="Downtown"
                    onChange={(event) => {
                        setUserInput(event.target.value);
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    style={{ padding: "15px" }}
                    disabled={!userInput.length}
                >
                    Search
                </Button>

            </StyledForm>

            {
                loading
                    ? <CircularProgress />
                    : fetchedStops && (
                        <Results>
                            <h3>
                                {
                                    fetchedStops.length
                                        ? `There are ${fetchedStops.length} results matching your search:`
                                        : "There are no stops matching your search"
                                }
                            </h3>

                            <ul>
                                {
                                    fetchedStops.map((stop: Stop) => {

                                        return (
                                            <li key={`stop-${stop.id}`}>
                                                <Link
                                                    to={`/stops/search/${stop.id}`}
                                                    onClick={() => {
                                                        setSelectedStop(stop.name)
                                                    }}
                                                >
                                                    {stop.name}
                                                </Link>
                                                {" "}
                                                ({stop.location.replace(",", ", ")})
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </Results>
                    )
            }

            {selectedStop && <Outlet context={selectedStop} />}

        </main>
    )
}

const StyledForm = styled.form`
    margin: 5px 0;
`;

const Results = styled.div`
    margin-top: 25px;
`;

export default SearchStops;