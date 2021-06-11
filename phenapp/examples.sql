
DELETE FROM public."User";
DELETE FROM public."Observador";

SELECT "id", "email", "password", "nombre", "apellido", "telefono", "role", "createdAt", "updatedAt" FROM "User" AS "User" WHERE "User"."id" = 'd2ddffa6-4469-4152-a45a-2bddf79815fe'

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO public."User"
(id, "email", "password", "nombre", "apellido", "telefono", "role","createdAt","updatedAt")
VALUES(uuid_generate_v4(),'adm@admin', 'admin', 'pedro', 'Tomala', '5555', 'admin'::"enum_User_role",pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Estacion"
("codigo", "nombreEstacion", posicion, altitud, suelo, omm, "createdAt", "updatedAt")
values
('EST001', 'Estacion Esmeraldas',point(-2.15,80.05)::geometry, 500, 'suelo', 'oom', pg_catalog.now() , pg_catalog.now()),
('EST002', 'Estacion Manabi',point(-2.02,79.1)::geometry, 500, 'suelo', 'oom', pg_catalog.now() , pg_catalog.now());

INSERT INTO public."Horario"
("tipoHora", hora, "createdAt", "updatedAt")
VALUES('diario'::"enum_Horario_tipoHora", '12:23:01', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Horario"
("tipoHora", hora, "createdAt", "updatedAt")
VALUES('parcial'::"enum_Horario_tipoHora", '09:00', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Instrumento"
(codigo, nombre, "createdAt", "updatedAt", "EstacionCodigo")
VALUES('ISC001', 'TermometroHumedo', pg_catalog.now(),pg_catalog.now(), 'EST001');

INSERT INTO public."Variable"
(nombre, unidad, maximo, minimo, "tipoDato", "createdAt", "updatedAt")
VALUES('temperatura', 'grados C', 45, 20, 'float', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "InstrumentoCodigo", "createdAt", "updatedAt")
VALUES(false, 'EST001', 1, 2, 'ISC001', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "InstrumentoCodigo", "createdAt", "updatedAt")
VALUES(true, 'EST002', 1, 2, 'ISC001', pg_catalog.now(),pg_catalog.now());


UPDATE public."User" SET "role"='admin'::"enum_User_role" WHERE id = d27da220-380f-4a16-a54a-89e31ad45fc8;

UPDATE public."User" SET "role"='observer'::"enum_User_role" WHERE id='d2ddffa6-4469-4152-a45a-2bddf79815fe'::uuid;

SELECT "id", "email", "password", "nombre", "apellido", "telefono", "role", "createdAt", "updatedAt" FROM "User" AS "User" WHERE "User"."email" = 'lczambra@email' AND "User"."password" = '1234'  LIMIT 1;