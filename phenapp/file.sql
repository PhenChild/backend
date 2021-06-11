INSERT INTO public."Estacion"
("codigoEstacion", "nombreEstacion", posicion, altitud, suelo, omm, "createdAt", "updatedAt")
values
('EST001', 'Estacion Esmeraldas',point(-2.15,80.05)::geometry, 500, 'suelo', 'oom', pg_catalog.now() , pg_catalog.now()),
('EST002', 'Estacion Manabi',point(-2.02,79.1)::geometry, 500, 'suelo', 'oom', pg_catalog.now() , pg_catalog.now());

INSERT INTO public."Horario"
("tipoHora", hora, "createdAt", "updatedAt")
VALUES
('diario'::"enum_Horario_tipoHora", '7:00', pg_catalog.now(), pg_catalog.now()),
('diario'::"enum_Horario_tipoHora", '13:00', pg_catalog.now(), pg_catalog.now()),
('diario'::"enum_Horario_tipoHora", '19:00', pg_catalog.now(), pg_catalog.now()),
('parcial'::"enum_Horario_tipoHora", '00:00', pg_catalog.now(), pg_catalog.now());

INSERT INTO public."Variable"
(nombre, unidad, maximo, minimo, "tipoDato", "createdAt", "updatedAt")
VALUES
('Temperatura', 'Celcius', 0, 100, 'Float', pg_catalog.now(),pg_catalog.now() ),
('Humedad Relativa', 'Porcentaje', 0, 100, 'Float', pg_catalog.now(),pg_catalog.now() );

INSERT INTO public."Instrumento"
(codigo, nombre, "createdAt", "updatedAt", "EstacionCodigo")
VALUES
('INST001', 'Termometro de Mercurio', pg_catalog.now(), pg_catalog.now(), 'EST001'),
('INST002', 'Higrometro', pg_catalog.now(), pg_catalog.now(), 'EST001');