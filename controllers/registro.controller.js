const prisma = require("../app.js").prisma;

async function createRegistro(body) {
    await prisma.tblEstacion.create({
        data: {
            idPlantilla: parseInt(body.idPlantilla,10),
            valor: body.valor,
            iseditable: parseInt(body.iseditable,10),
            fecha: body.fecha,
            lat: parseFloat(body.lat),
            lon: parseFloat(body.lon)
        }
    })
}

async function showRegistro(req,res) {
    //const allEstaciones = await prisma.estacion.findMany()
        prisma.tblRegistro.findMany().then(data =>{
            res.send(data)
        })
    //console.dir(allEstaciones, { depth: null });
}

async function findRegistro(idEst) {
    //const allEstaciones = await prisma.estacion.findMany()
        prisma.tblRegistro.findMany({
            where: { idEstacion: idEst }
        }).then(data =>{
            return data
        })
    //console.dir(allEstaciones, { depth: null });
}

async function updateRegistro(idEst, nom) {
    const estacion = await prisma.tblRegistro.update({
      where: { idEstacion: idEst },
      data: { nombre: nom },
    })
    console.log(estacion);
  }

async function deleteRegistro(idEst) {
    await prisma.tblRegistro.delete({
        where: { idEstacion: idEst }
    })
}

module.exports.createRegistro = createRegistro;
module.exports.showRegistro = showRegistro;
module.exports.updateRegistro = updateRegistro;
module.exports.deleteRegistro = deleteRegistro;
module.exports.findRegistro = findRegistro;