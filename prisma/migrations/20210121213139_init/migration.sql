-- CreateTable
CREATE TABLE `tblAdmin` (
    `idUser` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblEstacion` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `codigoEstacion` VARCHAR(191) NOT NULL,
    `nombreEstacion` VARCHAR(191) NOT NULL,
    `latitud` DECIMAL(65,30) NOT NULL,
    `longitud` DECIMAL(65,30) NOT NULL,
    `altitud` DECIMAL(65,30) NOT NULL,
    `suelo` VARCHAR(191) NOT NULL,
    `omm` VARCHAR(191) NOT NULL,
UNIQUE INDEX `tblEstacion.codigoEstacion_unique`(`codigoEstacion`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblVariable` (
    `idVariable` INT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `unidad` VARCHAR(191) NOT NULL,
    `maximo` INT NOT NULL,
    `minimo` INT NOT NULL,
    `tipoDato` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idVariable`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblHorario` (
    `idHorario` INT NOT NULL AUTO_INCREMENT,
    `tipoHora` VARCHAR(191) NOT NULL,
    `hora` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idHorario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblObservador` (
    `idUser` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `idObsJefe` VARCHAR(191) NOT NULL,
    `isJefe` BOOLEAN NOT NULL,
    `idEstacion` INT NOT NULL,

    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblImagenes` (
    `idImagenes` INT NOT NULL,
    `idEstacion` INT NOT NULL,
    `descripcion` VARCHAR(191),
    `img` VARCHAR(191),

    PRIMARY KEY (`idImagenes`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblRegistro` (
    `idValor` INT NOT NULL AUTO_INCREMENT,
    `idPlantilla` INT NOT NULL,
    `valor` VARCHAR(191) NOT NULL,
    `iseditable` BOOLEAN NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `lat` DECIMAL(65,30) NOT NULL,
    `lon` DECIMAL(65,30) NOT NULL,

    PRIMARY KEY (`idValor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblVariablePorEstacion` (
    `idItem` INT NOT NULL AUTO_INCREMENT,
    `idEstacion` INT NOT NULL,
    `idVariable` INT NOT NULL,
    `idHorario` INT NOT NULL,
    `enabled` BOOLEAN NOT NULL,

    PRIMARY KEY (`idItem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tblObservador` ADD FOREIGN KEY (`idEstacion`) REFERENCES `tblEstacion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblImagenes` ADD FOREIGN KEY (`idEstacion`) REFERENCES `tblEstacion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblRegistro` ADD FOREIGN KEY (`idPlantilla`) REFERENCES `tblVariablePorEstacion`(`idItem`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblVariablePorEstacion` ADD FOREIGN KEY (`idHorario`) REFERENCES `tblHorario`(`idHorario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblVariablePorEstacion` ADD FOREIGN KEY (`idVariable`) REFERENCES `tblVariable`(`idVariable`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblVariablePorEstacion` ADD FOREIGN KEY (`idEstacion`) REFERENCES `tblEstacion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
