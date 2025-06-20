// React Router
import { Link } from "react-router"

const Home = () => {
    return (
        <main>
            <p><Link to="/routes">View all routes</Link></p>
            <p><Link to="/stops/search">Search for a stop</Link></p>
        </main>
    )
}
export default Home;