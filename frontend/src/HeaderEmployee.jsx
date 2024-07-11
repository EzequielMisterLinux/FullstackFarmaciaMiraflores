import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faUser, faCog, faBars, faTruck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const NavbarTheme = styled.nav`
  background-color: #2d3436;
  color: #dfe6e9;
  padding: 1.4rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const NavbarLinks = styled.div`
  flex: 1;
  margin-top: 1rem;
  @media (min-width: 640px) {
    margin-top: 0;
  }
`;

const NavbarUtility = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  @media (min-width: 640px) {
    margin-top: 0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #dfe6e9;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #636e72;
  }
`;

const MobileMenu = styled.nav`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #2d3436;
    z-index: 999;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const MobileMenuItem = styled.div`
  text-align: center;
  padding: 1rem;
  flex: 1;
`;

const EmployeeNavbar = () => {
  const [showCategoriesMobile, setShowCategoriesMobile] = useState(false);

  return (
    <>
      <NavbarTheme>
        <h2 className="text-lg font-bold">Employee Dashboard</h2>
        <NavbarLinks>
          <nav className="hidden md:block">
            <ul className="flex justify-center space-x-4">
              <li>
                <StyledLink to="/dashboard">
                  <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
                </StyledLink>
              </li>
              <li>
                <StyledLink to="/dashboard/orders">
                  <FontAwesomeIcon icon={faTruck} /> Pedidos
                </StyledLink>
              </li>
              <li>
                <StyledLink to="/profile">
                  <FontAwesomeIcon icon={faUser} /> Profile
                </StyledLink>
              </li>
              <li>
                <StyledLink to="/settings">
                  <FontAwesomeIcon icon={faCog} /> Settings
                </StyledLink>
              </li>
            </ul>
          </nav>
        </NavbarLinks>
        <NavbarUtility>
          <div>Employee Actions</div>
        </NavbarUtility>
      </NavbarTheme>
      <MobileMenu>
        <div className="flex justify-between">
          <MobileMenuItem>
            <StyledLink to="/dashboard">
              <FontAwesomeIcon icon={faTachometerAlt} />
            </StyledLink>
          </MobileMenuItem>
          <MobileMenuItem>
            <StyledLink to="/dashboard/orders">
              <FontAwesomeIcon icon={faTruck} />
            </StyledLink>
          </MobileMenuItem>
          <MobileMenuItem>
            <StyledLink to="/profile">
              <FontAwesomeIcon icon={faUser} />
            </StyledLink>
          </MobileMenuItem>
          <MobileMenuItem>
            <StyledLink to="/settings">
              <FontAwesomeIcon icon={faCog} />
            </StyledLink>
          </MobileMenuItem>
          <MobileMenuItem>
            <FontAwesomeIcon icon={faBars} onClick={() => setShowCategoriesMobile(!showCategoriesMobile)} />
          </MobileMenuItem>
        </div>
      </MobileMenu>
    </>
  );
};

export default EmployeeNavbar;
