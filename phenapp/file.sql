INSERT INTO public."Estacion"
("codigoEstacion", "nombreEstacion", posicion, altitud, suelo, omm, "createdAt", "updatedAt")
values
('EST001', 'Estacion Esmeraldas',point(-2.15,80.05)::geometry, 500, 'suelo', 'oom', pg_catalog.now() , pg_catalog.now()),
('EST002', 'Estacion Manabi',point(-2.02,79.1)::geometry, 500, 'suelo', 'oom', pg_catalog.now() , pg_catalog.now()),
('EST1064','El Reloj',point(-19.03806,-65.24306)::geometry,2840,'suelo','omm', pg_catalog.now() , pg_catalog.now()),
('EST1003','Azurduy',point(-20.10056,-64.41)::geometry,2530,'suelo','omm', pg_catalog.now() , pg_catalog.now()),
('EST1005','Cachimayu',point(-19.13333,-65.26667)::geometry,2400,'suelo','omm', pg_catalog.now() , pg_catalog.now()),
('EST8022','Baures Aeropuerto',point(-13.65806,-63.70194)::geometry,150,'suelo','omm', pg_catalog.now() , pg_catalog.now()),
('EST9002','Cobija Aeropuerto',point(-11.03972,-68.78028)::geometry,235,'suelo','omm', pg_catalog.now() , pg_catalog.now());

INSERT INTO public."Horario"
("tipoHora", hora, "createdAt", "updatedAt")
VALUES
('parcial'::"enum_Horario_tipoHora", '08:00', pg_catalog.now(), pg_catalog.now()),
('parcial'::"enum_Horario_tipoHora", '14:00', pg_catalog.now(), pg_catalog.now()),
('parcial'::"enum_Horario_tipoHora", '18:00', pg_catalog.now(), pg_catalog.now()),
('diario'::"enum_Horario_tipoHora", '16:00', pg_catalog.now(), pg_catalog.now());

INSERT INTO public."Variable"
(nombre, unidad, maximo, minimo, "tipoDato", "createdAt", "updatedAt")
VALUES
('Temperatura','C',60,-60,'float',pg_catalog.now(),pg_catalog.now()),
('Velocidad del Viento','m/s',0,107,'float',pg_catalog.now(),pg_catalog.now()),
('Direccion del Viento','Rosa',NULL,NULL,'entero',pg_catalog.now(),pg_catalog.now()),
('Humedad Relativa','%',100,0,'float',pg_catalog.now(),pg_catalog.now()),
('Temperatura Bulbo Seco','C',60,-60,'float',pg_catalog.now(),pg_catalog.now()),
('Temperatura Bulbo Humedo','C',60,-60,'float',pg_catalog.now(),pg_catalog.now()),
('Temperatura maxima','C',60,NULL,'float',pg_catalog.now(),pg_catalog.now()),
('Temperatura minima','C',NULL,-60,'float',pg_catalog.now(),pg_catalog.now()),
('Precipitacion','mm',NULL,0,'float',pg_catalog.now(),pg_catalog.now()),
('Presion atmosferica','hPa',1100,800,'float',pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Instrumento"
(codigo, nombre, "createdAt", "updatedAt", "EstacionCodigo")
VALUES
('INST001', 'Termometro de Mercurio', pg_catalog.now(), pg_catalog.now(), 'EST001'),
('INST002', 'Higrometro', pg_catalog.now(), pg_catalog.now(), 'EST001');
