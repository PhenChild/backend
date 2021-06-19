
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO public."User"
(id, "email", "password", "nombre", "apellido", "telefono", "role","createdAt","updatedAt")
VALUES(uuid_generate_v4(),'adm@admin', '$2y$12$fnwugjvl1ubzQuTjzCXLWO0WVEZYPfDS5rnrRf90p8TMLOPx2FiSa', 'pedro', 'Tomala', '5555', 'admin'::"enum_User_role",pg_catalog.now(),pg_catalog.now());

INSERT INTO public."User"
(id, "email", "password", "nombre", "apellido", "telefono", "role","createdAt","updatedAt")
VALUES(uuid_generate_v4(),'obs@mail', '$2y$12$u5VFrmOxhrimpCr58fWuW.QWvKntHMj5LAb7L.1ec4kmH/iH8P5r.', 'dennys', 'Lopez', '5555', 'observer'::"enum_User_role",pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Estacion"
("codigo", "nombreEstacion", posicion, altitud, suelo, omm, "createdAt", "updatedAt")
values
('EST001', 'Estacion Esmeraldas',point(-2.15,80.05)::geometry, 500, 'suelo', 'oom', pg_catalog.now() , pg_catalog.now()),
('EST002', 'Estacion Manabi',point(-2.02,79.1)::geometry, 500, 'suelo', 'oom', pg_catalog.now() , pg_catalog.now());

--AQUI SE DEBE VERIFICAR EL USERID DEL QUE SERA OBSERVADOR PARA CREARLO EN LA TABLA CON EL SIGUIENTE SQL

INSERT INTO public."Observador"
("isJefe", "createdAt", "updatedAt", "EstacionCodigo", "UserId")
VALUES('false', pg_catalog.now(),pg_catalog.now(), 'EST001', 'b52b6b0a-14e7-4951-8cf2-775d396c4eda');

INSERT INTO public."Horario"
("tipoHora", hora, "createdAt", "updatedAt")
VALUES('diario'::"enum_Horario_tipoHora", '12:23:01', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Horario"
("tipoHora", hora, "createdAt", "updatedAt")
VALUES('parcial'::"enum_Horario_tipoHora", '09:00', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Horario"
("tipoHora", hora, "createdAt", "updatedAt")
VALUES('parcial'::"enum_Horario_tipoHora", '14:00', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Instrumento"
(codigo, nombre, "createdAt", "updatedAt", "EstacionCodigo")
VALUES('ISC001', 'TermometroHumedo', pg_catalog.now(),pg_catalog.now(), 'EST001');

INSERT INTO public."Instrumento"
(codigo, nombre, "createdAt", "updatedAt", "EstacionCodigo")
VALUES('ISC002', 'Precipitador', pg_catalog.now(),pg_catalog.now(), 'EST001');

INSERT INTO public."Instrumento"
(codigo, nombre, "createdAt", "updatedAt", "EstacionCodigo")
VALUES('ISC003', 'Veleta', pg_catalog.now(),pg_catalog.now(), 'EST001');

INSERT INTO public."Variable"
(nombre, unidad, maximo, minimo, "tipoDato", "createdAt", "updatedAt")
VALUES('temperatura', 'grados C', 45, 20, 'float', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Variable"
(nombre, unidad, maximo, minimo, "tipoDato", "createdAt", "updatedAt")
VALUES('precipitacion', 'prep', 1000, 0, 'float', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Variable"
(nombre, unidad, "tipoDato", "createdAt", "updatedAt")
VALUES('DireccionViento', 'punto cardinal', 'rosa', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Variable"
(nombre, unidad, "tipoDato", "createdAt", "updatedAt")
VALUES('Evento', 'clima', 'clima', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "InstrumentoCodigo", "createdAt", "updatedAt")
VALUES(true, 'EST001', 3, 2, 'ISC003', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "InstrumentoCodigo", "createdAt", "updatedAt")
VALUES(true, 'EST001', 3, 3, 'ISC003', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "createdAt", "updatedAt")
VALUES(true, 'EST001', 4, 1, pg_catalog.now(),pg_catalog.now());

INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "InstrumentoCodigo", "createdAt", "updatedAt")
VALUES(true, 'EST001', 1, 2, 'ISC001', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "InstrumentoCodigo", "createdAt", "updatedAt")
VALUES(true, 'EST002', 1, 2, 'ISC001', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "InstrumentoCodigo", "createdAt", "updatedAt")
VALUES(true, 'EST001', 2, 2, 'ISC002', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "InstrumentoCodigo", "createdAt", "updatedAt")
VALUES(true, 'EST001', 2, 1, 'ISC001', pg_catalog.now(),pg_catalog.now());
 
--UPDATE public."User" SET "password"='$2y$12$u5VFrmOxhrimpCr58fWuW.QWvKntHMj5LAb7L.1ec4kmH/iH8P5r.' WHERE id = 'ce596202-12f1-4b3f-9dbf-0fbe81c082c7'::uuid;
--
--UPDATE public."User" SET "role"='observer'::"enum_User_role" WHERE id='d2ddffa6-4469-4152-a45a-2bddf79815fe'::uuid;
--
--SELECT "id", "email", "password", "nombre", "apellido", "telefono", "role", "createdAt", "updatedAt" FROM "User" AS "User" WHERE "User"."email" = 'lczambra@email' AND "User"."password" = '1234'  LIMIT 1;