import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import '../index.css';
import SearchFilter from '../components/SearchFilter';
import styled from 'styled-components';
import CategoryModal from '../components/CategoryModal';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faStore, faBars } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../components/context/CartContext';

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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #4a5568;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #cbd5e0;
  }
`;

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/products-with-images')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching products with images:', error));
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.categoryId === selectedCategory);
    }

    if (selectedSubcategory) {
      filtered = filtered.filter((product) => product.subCategoryId === selectedSubcategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, products, selectedCategory, selectedSubcategory]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);  // Clear subcategory when a new category is selected
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleCategoryModalToggle = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };

  return (
    <div className="flex">
      {isDesktop && (
        <SearchFilter
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleCategorySelect={handleCategorySelect}
          handleSubcategorySelect={handleSubcategorySelect}
        />
      )}

      <div className="w-4/5 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <div>Cargando...</div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                  <p className="text-gray-700 mb-4">${product.price}</p>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => addToCart(product)}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {!isDesktop && (
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
                <FontAwesomeIcon icon={faBars} />
              </StyledLink>
            </MobileMenuItem>
          </div>
        </MobileMenu>
      )}

      {!isDesktop && isCategoryModalOpen && (
        <CategoryModal onClose={handleCategoryModalToggle} />
      )}
    </div>
  );
};

export default Store;
