
CREATE DATABASE tiendaVanilladb;



USE tiendaVanilladb;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL,
    fullName VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);


/*proceso almacenado para agregar usuarios*/
DELIMITER //

CREATE PROCEDURE addusers(
    IN p_email VARCHAR(255),
    IN p_username VARCHAR(50),
    IN p_fullName VARCHAR(100),
    IN p_address VARCHAR(255),
    IN p_password VARCHAR(255),
    OUT p_result VARCHAR(255)
)
BEGIN
    DECLARE usuario_existente INT;

    -- Verificar si el usuario ya existe
    SELECT COUNT(*) INTO usuario_existente FROM usuarios WHERE email = p_email OR username = p_username;

    IF usuario_existente > 0 THEN
        SET p_result = 'El usuario ya existe';
    ELSE
        -- Verificar la longitud de la contraseña
        IF LENGTH(p_password) >= 8 THEN
            -- Insertar el usuario
            INSERT INTO usuarios (email, username, fullName, address, password) VALUES (p_email, p_username, p_fullName, p_address, p_password);
            SET p_result = 'Registro exitoso';
        ELSE
            SET p_result = 'La contraseña debe tener al menos 8 caracteres';
        END IF;
    END IF;
END //

DELIMITER ;

/*proceso almacenado para authenticar al usuario*/
DELIMITER //

CREATE PROCEDURE authenticate_user(
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    OUT p_result VARCHAR(255)
)
BEGIN
    DECLARE user_exists INT;
    DECLARE valid_password INT;
    DECLARE user_id INT;

    SELECT COUNT(*) INTO user_exists FROM usuarios WHERE email = p_email;

    IF user_exists > 0 THEN
        SELECT COUNT(*), id INTO valid_password, user_id FROM usuarios WHERE email = p_email AND password = p_password;

        IF valid_password > 0 THEN
            SET p_result = CONCAT('Usuario autenticado correctamente. ID:', user_id);
        ELSE
            SET p_result = 'Contraseña incorrecta.';
        END IF;
    ELSE
        SET p_result = 'Usuario no encontrado.';
    END IF;
END //

DELIMITER ;


-- Tabla de Categorías
CREATE TABLE Categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Tabla de Subcategorías
CREATE TABLE SubCategories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  categoryId INT NOT NULL,
  FOREIGN KEY (categoryId) REFERENCES Categories(id)
);

-- Tabla de Productos
CREATE TABLE Products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image LONGBLOB,
  subCategoryId INT,
  FOREIGN KEY (subCategoryId) REFERENCES SubCategories(id)
);







