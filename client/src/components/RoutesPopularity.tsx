// Styled Components
import styled from "styled-components";

// Custom Hook
import useAxios from "../hooks/useAxios";

// Types
import { RoutePopularity } from "../interfaces";

const RoutesPopularity = () => {

    const [popularRoutes] = useAxios<RoutePopularity[]>("/report/routes/popularity");

    return (
        popularRoutes && (
            <PopularityReport>
                <h3>Popularity Report:</h3>

                <ul>
                    {
                        popularRoutes.map((popularRoute: RoutePopularity, index: number) => {
                            return (
                                <li key={`route-${index}`}>
                                    Route: {popularRoute.route}, trips: {popularRoute.total_trips}
                                </li>
                            )
                        })
                    }
                </ul>
            </PopularityReport>
        )
    )
}

const PopularityReport = styled.div`
    margin-top: 25px;
`;

export default RoutesPopularity;