const prisma = require("../app.js").prisma;

async function createObservador(body) {
    await prisma.tblObservador.create({
        data: {
            password: body.password,
            nombre: body.nombre,
            apellido: body.apellido,
            telefono: body.telefono,
            correo: body.correo,
            estacion: body.idEstacion
        }
    })
}

async function showObservador(req,res) {
    //const allEstaciones = await prisma.estacion.findMany()
        prisma.tblObservador.findMany().then(data =>{
            res.send(data)
        })
    //console.dir(allEstaciones, { depth: null });
}

async function findEstacion(idEst) {
    //const allEstaciones = await prisma.estacion.findMany()
        prisma.tblObservador.findMany({
            where: { idEstacion: idEst }
        }).then(data =>{
            return data
        })
    //console.dir(allEstaciones, { depth: null });
}

async function updateEstacion(idEst, nom) {
    const estacion = await prisma.tblObservador.update({
      where: { idEstacion: idEst },
      data: { nombre: nom },
    })
    console.log(estacion);
  }

async function deleteEstacion(idEst) {
    await prisma.tblObservador.delete({
        where: { idEstacion: idEst }
    })
}

module.exports.createObservador = createObservador;
module.exports.showObservador = showObservador;
module.exports.updateObservador = updateObservador;
module.exports.deleteObservador = deleteObservador;
module.exports.findObservador = findObservador;