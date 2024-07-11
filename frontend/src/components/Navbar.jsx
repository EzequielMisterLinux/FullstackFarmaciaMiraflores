import { TECollapse, TERipple } from "tw-elements-react";
import styled from 'styled-components';
import UserProfile from './UserProfile';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHome, faTruckRampBox,faBars,  faStore, faUser } from "@fortawesome/free-solid-svg-icons";

import CategoryModal from './CategoryModal';
import { useState } from "react";
import CartButtonComponent from "./Button";




const NavbarTheme = styled.nav`
  background-color: #dfe6e9;
  font-weight: 400;
  span {
    font-weight: bold;
  }
  padding: 1.4rem;
  display: flex;
  flex-wrap: wrap; /* Permitir que los elementos se envuelvan en pantallas pequeñas */
  align-items: center;
  justify-content: space-between;
`;

const NavbarLinks = styled.div`
  flex: 1; /* Ocúpate del espacio restante */
  margin-top: 1rem; /* Añadir un poco de espacio en dispositivos pequeños */
  @media (min-width: 640px) {
    margin-top: 0; /* Reiniciar el margen en dispositivos más grandes */
  }
`;

const NavbarUtility = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem; /* Añadir un poco de espacio en dispositivos pequeños */
  @media (min-width: 640px) {
    margin-top: 0; /* Reiniciar el margen en dispositivos más grandes */
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none; /* Eliminar la subrayado del enlace */
  color: #4a5568; /* Color de texto */
  padding: 0.5rem 1rem; /* Añadir espacio alrededor del texto */
  border-radius: 0.25rem; /* Bordes redondeados */
  transition: background-color 0.3s ease; /* Transición suave del color de fondo */
  &:hover {
    background-color: #cbd5e0; /* Cambiar el color de fondo al pasar el ratón */
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
    background-color: #ffffff;
    z-index: 999;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const MobileMenuItem = styled.div`
  text-align: center;
  padding: 1rem;
  flex: 1;
`;




const Navbar = () => {
  const [showCategoriesMobile, setShowCategoriesMobile] = useState(false);


  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const handleCategoryModalToggle = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };
  return (
    <>
      <NavbarTheme>
        <h2 className="text-lg font-bold">Farmacia Miraflores</h2>
        <NavbarLinks>
          <nav className="hidden md:block">
            <ul className="flex justify-center space-x-4">
              <li>
                <StyledLink to="/">
                  <FontAwesomeIcon icon={faHome} /> Home
                </StyledLink>
              </li>
              <li>
                <StyledLink to="/store">
                  <FontAwesomeIcon icon={faStore} /> Store
                </StyledLink>
              </li>
              <li>
                <StyledLink to="/providers">
                <FontAwesomeIcon icon={faTruckRampBox} /> Providers
                </StyledLink>
              </li>
            </ul>
          </nav>
        </NavbarLinks>
        <NavbarUtility>
        <CartButtonComponent/>
            
          <UserProfile />
        </NavbarUtility>
      </NavbarTheme>
      {showCategoriesMobile && <CategoryModal onClose={() => setShowCategoriesMobile(false)} />}

      {isCategoryModalOpen && (
        <CategoryModal onClose={handleCategoryModalToggle} />
      )}
      <MobileMenu>
        <div className="flex justify-between">
          <MobileMenuItem>
            <StyledLink to="/">
              <FontAwesomeIcon icon={faHome} />
            </StyledLink>
          </MobileMenuItem>
          <MobileMenuItem>
            <StyledLink to="/store">
              <FontAwesomeIcon icon={faStore} />
            </StyledLink>
          </MobileMenuItem>

          <MobileMenuItem>
            <StyledLink to="#" onClick={handleCategoryModalToggle}>
            <FontAwesomeIcon icon={faBars} onClick={handleCategoryModalToggle} />
            </StyledLink>
          </MobileMenuItem>


        </div>
      </MobileMenu>
    </>
  );
};

export default Navbar;



