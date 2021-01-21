const prisma = require("../app.js").prisma;

async function createEstacion(body) {
    await prisma.tblEstacion.create({
        data: {
            codigoEstacion: body.codigo,
            nombreEstacion: body.nombre,
            latitud: parseFloat(body.latitud),
            longitud: parseFloat(body.longitud),
            altitud: parseFloat(body.altitud),
            suelo: body.suelo,
            omm: body.omm
        }
    })
}

async function showEstaciones(req,res) {
    //const allEstaciones = await prisma.estacion.findMany()
        prisma.tblEstacion.findMany().then(data =>{
            res.send(data)
        })
    //console.dir(allEstaciones, { depth: null });
}

async function findEstacion(idEst) {
    //const allEstaciones = await prisma.estacion.findMany()
        prisma.tblestacion.findMany({
            where: { idEstacion: idEst }
        }).then(data =>{
            return data
        })
    //console.dir(allEstaciones, { depth: null });
}

async function updateEstacion(idEst, nom) {
    const estacion = await prisma.tblestacion.update({
      where: { idEstacion: idEst },
      data: { nombre: nom },
    })
    console.log(estacion);
  }

async function deleteEstacion(idEst) {
    await prisma.estacion.delete({
        where: { idEstacion: idEst }
    })
}

module.exports.createEstacion = createEstacion;
module.exports.showEstaciones = showEstaciones;
module.exports.updateEstacion = updateEstacion;
module.exports.deleteEstacion = deleteEstacion;
module.exports.findEstacion = findEstacion;