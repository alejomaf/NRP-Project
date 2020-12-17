-- MySQL Script generated by MySQL Workbench
-- Thu Dec 17 07:29:45 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema NRPData
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema NRPData
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `NRPData` DEFAULT CHARACTER SET utf8 ;
USE `NRPData` ;

-- -----------------------------------------------------
-- Table `NRPData`.`Proyecto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `NRPData`.`Proyecto` (
  `idProyecto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `limiteEsfuerzo` INT NULL,
  PRIMARY KEY (`idProyecto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `NRPData`.`Requisito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `NRPData`.`Requisito` (
  `idRequisito` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `esfuerzo` INT NULL,
  `Proyecto_idProyecto` INT NOT NULL,
  `resuelto` TINYINT NULL,
  PRIMARY KEY (`idRequisito`, `Proyecto_idProyecto`),
  INDEX `fk_Requisito_Proyecto1_idx` (`Proyecto_idProyecto` ASC),
  CONSTRAINT `fk_Requisito_Proyecto1`
    FOREIGN KEY (`Proyecto_idProyecto`)
    REFERENCES `NRPData`.`Proyecto` (`idProyecto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `NRPData`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `NRPData`.`Cliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `relevancia` INT NULL,
  `Proyecto_idProyecto` INT NOT NULL,
  PRIMARY KEY (`idCliente`),
  INDEX `fk_Cliente_Proyecto1_idx` (`Proyecto_idProyecto` ASC),
  CONSTRAINT `fk_Cliente_Proyecto1`
    FOREIGN KEY (`Proyecto_idProyecto`)
    REFERENCES `NRPData`.`Proyecto` (`idProyecto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `NRPData`.`Valoracion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `NRPData`.`Valoracion` (
  `idValoracion` INT NOT NULL AUTO_INCREMENT,
  `Cliente_idCliente` INT NOT NULL,
  `Requisito_idRequisito` INT NOT NULL,
  `valoracion` INT NULL,
  PRIMARY KEY (`idValoracion`, `Cliente_idCliente`, `Requisito_idRequisito`),
  INDEX `fk_Cliente_has_Requisito_Requisito1_idx` (`Requisito_idRequisito` ASC),
  INDEX `fk_Cliente_has_Requisito_Cliente_idx` (`Cliente_idCliente` ASC),
  CONSTRAINT `fk_Cliente_has_Requisito_Cliente`
    FOREIGN KEY (`Cliente_idCliente`)
    REFERENCES `NRPData`.`Cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cliente_has_Requisito_Requisito1`
    FOREIGN KEY (`Requisito_idRequisito`)
    REFERENCES `NRPData`.`Requisito` (`idRequisito`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `NRPData`.`Relacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `NRPData`.`Relacion` (
  `idRelacion` INT NOT NULL AUTO_INCREMENT,
  `Requisito_idRequisito` INT NOT NULL,
  `Requisito_idRequisito1` INT NOT NULL,
  `relacion` INT NULL,
  `Proyecto_idProyecto` INT NOT NULL,
  PRIMARY KEY (`idRelacion`, `Requisito_idRequisito`, `Requisito_idRequisito1`),
  INDEX `fk_Requisito_has_Requisito_Requisito2_idx` (`Requisito_idRequisito1` ASC),
  INDEX `fk_Requisito_has_Requisito_Requisito1_idx` (`Requisito_idRequisito` ASC),
  INDEX `fk_Relacion_Proyecto1_idx` (`Proyecto_idProyecto` ASC),
  CONSTRAINT `fk_Requisito_has_Requisito_Requisito1`
    FOREIGN KEY (`Requisito_idRequisito`)
    REFERENCES `NRPData`.`Requisito` (`idRequisito`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Requisito_has_Requisito_Requisito2`
    FOREIGN KEY (`Requisito_idRequisito1`)
    REFERENCES `NRPData`.`Requisito` (`idRequisito`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Relacion_Proyecto1`
    FOREIGN KEY (`Proyecto_idProyecto`)
    REFERENCES `NRPData`.`Proyecto` (`idProyecto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `proyecto` (`idProyecto`, `nombre`, `limiteEsfuerzo`) VALUES
(4, 'BestProject', 1);

INSERT INTO `cliente` (`idCliente`, `nombre`, `relevancia`, `Proyecto_idProyecto`) VALUES
(1, 'Hola', 3, 4),
(2, 'Pepe', 5, 4);

INSERT INTO `requisito` (`idRequisito`, `nombre`, `esfuerzo`, `Proyecto_idProyecto`, `resuelto`) VALUES
(4, 'Resizable', 3, 4, 0),
(5, 'Autolayout', 2, 4, 0);

INSERT INTO `relacion` (`idRelacion`, `Requisito_idRequisito`, `Requisito_idRequisito1`, `relacion`) VALUES
(1, 4, 5, 0);

INSERT INTO `valoracion` (`idValoracion`, `Cliente_idCliente`, `Requisito_idRequisito`, `valoracion`) VALUES
(4, 1, 4, 3),
(5, 2, 4, 1),
(7, 1, 5, 3),
(8, 2, 5, 6);

