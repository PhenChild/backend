const prisma = require("../app.js").prisma;

async function createHorario(body) {
    await prisma.tblHorario.create({
        data: {
            tipoHora: body.tipoHora,
            hora: body.hora
        }
    })
}

async function showHorario(req,res) {
    //const allEstaciones = await prisma.estacion.findMany()
        prisma.tblHorario.findMany().then(data =>{
            res.send(data)
        })
    //console.dir(allEstaciones, { depth: null });
}

async function findHorario(idEst) {
    //const allEstaciones = await prisma.estacion.findMany()
        prisma.tblHorario.findMany({
            where: { idEstacion: idEst }
        }).then(data =>{
            return data
        })
    //console.dir(allEstaciones, { depth: null });
}

async function updateHorario(idEst, nom) {
    const estacion = await prisma.tblHorario.update({
      where: { idEstacion: idEst },
      data: { nombre: nom },
    })
    console.log(estacion);
  }

async function deleteHorario(idEst) {
    await prisma.tblHorario.delete({
        where: { idEstacion: idEst }
    })
}

module.exports.createHorario = createHorario;
module.exports.showHorario = showHorario;
module.exports.updateHorario = updateHorario;
module.exports.deleteHorario = deleteHorario;
module.exports.findHorario = findHorario;