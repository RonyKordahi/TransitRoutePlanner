// Styles
import GlobalStyles from "./GlobalStyles";

// React Router
import { Routes, Route } from "react-router";

// Components
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import SearchStops from "./pages/SearchStops";
import ViewAllRoutes from "./pages/ViewAllRoutes";
import ViewTripStops from "./components/ViewTripStops";
import ViewUpcomingStops from "./components/ViewUpcomingStops";

const App = () => {
    return (
        <>
            {/* CSS Reset */}
            <GlobalStyles />
            
            <Header />

            {/* Routes */}
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/routes" element={<ViewAllRoutes />}>
                    <Route path=":routeId/stops" element={<ViewTripStops />} />
                </Route>
                
                <Route path="/stops/search" element={<SearchStops />}>
                    <Route path=":stopId" element={<ViewUpcomingStops />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;