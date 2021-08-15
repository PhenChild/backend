--DELETE FROM "VariableEstacion";
--DELETE FROM "Variable";
--DELETE FROM "Instrumento";
--DELETE FROM "Horario";
--DELETE FROM "Observador";
--DELETE FROM "Estacion";
--DELETE FROM "User";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO public."User"
(id, "email", "password", "nombre", "apellido", "telefono", "role","createdAt","updatedAt")
VALUES(uuid_generate_v4(),'adm@admin', '$2y$12$fnwugjvl1ubzQuTjzCXLWO0WVEZYPfDS5rnrRf90p8TMLOPx2FiSa', 'pedro', 'Tomala', '5555', 'admin'::"enum_User_role",pg_catalog.now(),pg_catalog.now());

INSERT INTO public."User"
(id, "email", "password", "nombre", "apellido", "telefono", "role","createdAt","updatedAt")
VALUES(uuid_generate_v4(),'obs@mail', '$2y$12$u5VFrmOxhrimpCr58fWuW.QWvKntHMj5LAb7L.1ec4kmH/iH8P5r.', 'dennys', 'Lopez', '5555', 'observer'::"enum_User_role",pg_catalog.now(),pg_catalog.now());

INSERT INTO public."User"
(id, "email", "password", "nombre", "apellido", "telefono", "role","createdAt","updatedAt")
VALUES(uuid_generate_v4(),'obs2', '$2y$12$cbtiMUND78QvUn7UmLEfLuJ67mJmbAHwd9gju1gqfQD9v888f0XXC ', 'liss', 'zambraon', '5555', 'observer'::"enum_User_role",pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Estacion"
("codigo", "nombreEstacion", posicion, altitud, suelo, omm, "createdAt", "updatedAt")
values
('EST1064', 'Estacion El Reloj',point(-19.03806,-65.24306)::geometry, 2840, 'suelo', 'oom', pg_catalog.now() , pg_catalog.now()),
('EST1003', 'Estacion Azurduy',point(-20.10056,-64.41)::geometry, 2530, 'suelo', 'oom', pg_catalog.now() , pg_catalog.now()),
('EST1005','Cachimayu',point(-19.13333,-65.26667)::geometry,2400,'suelo','omm', pg_catalog.now() , pg_catalog.now()),
('EST8022','Baures Aeropuerto',point(-13.65806,-63.70194)::geometry,150,'suelo','omm', pg_catalog.now() , pg_catalog.now()),
('EST9002','Cobija Aeropuerto',point(-11.03972,-68.78028)::geometry,235,'suelo','omm', pg_catalog.now() , pg_catalog.now());

--AQUI SE DEBE VERIFICAR EL USERID DEL QUE SERA OBSERVADOR PARA CREARLO EN LA TABLA CON EL SIGUIENTE SQL

INSERT INTO public."Observador"
("createdAt", "updatedAt", "EstacionCodigo", "UserId")
VALUES(pg_catalog.now(),pg_catalog.now(), 'EST1064', 'e06ab791-1c0a-4f56-ba47-45f2748a7b07');

INSERT INTO public."Observador"
("createdAt", "updatedAt", "EstacionCodigo", "UserId")
VALUES(pg_catalog.now(),pg_catalog.now(), 'EST1064', 'ec59c40b-ea52-4fe3-9e4d-bb0ca21f5ddd');

INSERT INTO public."Horario"
("tipoHora", hora, "createdAt", "updatedAt")
VALUES('diario'::"enum_Horario_tipoHora", '16:00', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Horario"
("tipoHora", hora, "createdAt", "updatedAt")
VALUES('parcial'::"enum_Horario_tipoHora", '08:00', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Horario"
("tipoHora", hora, "createdAt", "updatedAt")
VALUES('parcial'::"enum_Horario_tipoHora", '14:00', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."TipoInstrumento"
(tipo, "createdAt", "updatedAt")
VALUES('Termometro Humedo', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."TipoInstrumento"
(tipo, "createdAt", "updatedAt")
VALUES('Pluviometro', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."TipoInstrumento"
(tipo, "createdAt", "updatedAt")
VALUES('Veleta', pg_catalog.now(),pg_catalog.now());

-----HASTA AQUI UN SEGUNDO CORTE
INSERT INTO public."Instrumento"
(codigo, nombre, "createdAt", "updatedAt", "EstacionCodigo", "TipoInstrumentoId")
VALUES('ISC001', 'Termometro Humedo Mercurio', pg_catalog.now(),pg_catalog.now(), 'EST1064',1);

INSERT INTO public."Instrumento"
(codigo, nombre, "createdAt", "updatedAt", "EstacionCodigo", "TipoInstrumentoId")
VALUES('ISC002', 'Pluviometro', pg_catalog.now(),pg_catalog.now(), 'EST1064',2);

INSERT INTO public."Instrumento"
(codigo, nombre, "createdAt", "updatedAt", "EstacionCodigo", "TipoInstrumentoId")
VALUES('ISC003', 'Veleta', pg_catalog.now(),pg_catalog.now(), 'EST1064',3);

-----
INSERT INTO public."Variable"
(nombre, descripcion, unidad, maximo, minimo, "tipoDato", "createdAt", "updatedAt")
VALUES('temperatura','', 'grados C', 45, 20, 'float', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Variable"
(nombre, descripcion, unidad, maximo, minimo, "tipoDato", "createdAt", "updatedAt")
VALUES('precipitacion','', 'prep', 1000, 0, 'float', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Variable"
(nombre, descripcion, unidad, "tipoDato", "createdAt", "updatedAt")
VALUES('DireccionViento', '', 'punto cardinal', 'rosa', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Variable"
(nombre, descripcion, unidad, "tipoDato", "createdAt", "updatedAt")
VALUES('Nevada', '', 'clima', 'boolean', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Variable"
(nombre, descripcion, unidad, "tipoDato", "createdAt", "updatedAt")
VALUES('Granizada', '', 'clima', 'boolean', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Variable"
(nombre, descripcion, unidad, "tipoDato", "createdAt", "updatedAt")
VALUES('Tormenta electrica', '', 'clima', 'boolean', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."Variable"
(nombre, descripcion, unidad, "tipoDato", "createdAt", "updatedAt")
VALUES('Percepcion Calor', 'Seleccione su percepcion sobre el calor del ambiente en la escala del 1 al 5, 1 representa poco intenso y 5 extramademente intenso', 'clima', 'likert', pg_catalog.now(),pg_catalog.now());


------------AQUI EL TERCER CORTE
INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "InstrumentoCodigo", "createdAt", "updatedAt")
VALUES(true, 'EST1064', 3, 2, 'ISC003', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "InstrumentoCodigo", "createdAt", "updatedAt")
VALUES(true, 'EST1064', 3, 3, 'ISC003', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "createdAt", "updatedAt")
VALUES(true, 'EST1064', 4, 1, pg_catalog.now(),pg_catalog.now());

INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "createdAt", "updatedAt")
VALUES(true, 'EST1064', 5, 1, pg_catalog.now(),pg_catalog.now());

INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "createdAt", "updatedAt")
VALUES(true, 'EST1064', 6, 1, pg_catalog.now(),pg_catalog.now());

INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "createdAt", "updatedAt")
VALUES(true, 'EST1064', 7, 1, pg_catalog.now(),pg_catalog.now());

INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "InstrumentoCodigo", "createdAt", "updatedAt")
VALUES(true, 'EST1064', 1, 2, 'ISC001', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "InstrumentoCodigo", "createdAt", "updatedAt")
VALUES(true, 'EST1003', 1, 2, 'ISC001', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "InstrumentoCodigo", "createdAt", "updatedAt")
VALUES(true, 'EST1064', 2, 2, 'ISC002', pg_catalog.now(),pg_catalog.now());

INSERT INTO public."VariableEstacion"
("enable", "EstacionCodigo", "VariableId", "HorarioId", "InstrumentoCodigo", "createdAt", "updatedAt")
VALUES(true, 'EST1064', 2, 1, 'ISC001', pg_catalog.now(),pg_catalog.now());

---------CUARTO CORTE
INSERT INTO public."ObservacionVariable"
("valor", "VariableEstacionId", "ObservadorId", "fechaObservacion", "createdAt", "updatedAt")
VALUES('2', 6, 1, pg_catalog.now(),pg_catalog.now(), pg_catalog.now());

INSERT INTO public."ObservacionVariable"
("valor", "VariableEstacionId", "ObservadorId", "fechaObservacion", "createdAt", "updatedAt")
VALUES('28.5', 7, 1, pg_catalog.now(),pg_catalog.now(),pg_catalog.now());

INSERT INTO public."ObservacionVariable"
("valor", "VariableEstacionId", "ObservadorId", "fechaObservacion", "createdAt", "updatedAt")
VALUES('500', 9, 1, pg_catalog.now(),pg_catalog.now(),pg_catalog.now());

INSERT INTO public."ObservacionVariable"
("valor", "VariableEstacionId", "ObservadorId", "fechaObservacion", "createdAt", "updatedAt")
VALUES('26', 7, 1, pg_catalog.now(),pg_catalog.now(),pg_catalog.now());

INSERT INTO public."ObservacionVariable"
("valor", "VariableEstacionId", "ObservadorId", "fechaObservacion", "createdAt", "updatedAt")
VALUES('20', 7, 1, '2021-08-12 19:10:25',pg_catalog.now(),pg_catalog.now());

--UPDATE public."User" SET "password"='$2y$12$u5VFrmOxhrimpCr58fWuW.QWvKntHMj5LAb7L.1ec4kmH/iH8P5r.' WHERE id = 'ce596202-12f1-4b3f-9dbf-0fbe81c082c7'::uuid;
--
--UPDATE public."User" SET "role"='observer'::"enum_User_role" WHERE id='d2ddffa6-4469-4152-a45a-2bddf79815fe'::uuid;
--
--SELECT "id", "email", "password", "nombre", "apellido", "telefono", "role", "createdAt", "updatedAt" FROM "User" AS "User" WHERE "User"."email" = 'lczambra@email' AND "User"."password" = '1234'  LIMIT 1;

