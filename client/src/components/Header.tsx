// React Router
import { Link } from "react-router";

// Styled Components
import styled from "styled-components";

const Header = () => {
    return (
        <StyledHeader>
            <HomeLink to="/">Home</HomeLink>
            <h1>StreetScan Coding Challenge</h1>
        </StyledHeader>
    )
}

const HomeLink = styled(Link)`
    position: absolute;
    top: 5px;
    left: 25px;
`;

const StyledHeader = styled.header`
    display: flex;
    justify-content: center;
`;

export default Header;