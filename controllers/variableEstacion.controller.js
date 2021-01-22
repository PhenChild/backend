const prisma = require("../app.js").prisma;

async function createVariablePorEstacion(body) {
    await prisma.tblVariablePorEstacion.create({
        data: {
            idEstacion: body.idEstacion,
            idVariable: body.idVariable,
            idHorario: body.idHorario,
            enabled: body.enabled
        }
    })
}

async function showVariablePorEstacion(req,res) {
    //const allEstaciones = await prisma.estacion.findMany()
        prisma.tblVariablePorEstacion.findMany().then(data =>{
            res.send(data)
        })
    //console.dir(allEstaciones, { depth: null });
}

async function findVariablePorEstacion(idEst) {
    //const allEstaciones = await prisma.estacion.findMany()
        prisma.tblVariablePorEstacion.findMany({
            where: { idEstacion: idEst }
        }).then(data =>{
            return data
        })
    //console.dir(allEstaciones, { depth: null });
}

async function updateVariablePorEstacion(idEst, nom) {
    const estacion = await prisma.tblVariablePorEstacion.update({
      where: { idEstacion: idEst },
      data: { nombre: nom },
    })
    console.log(estacion);
  }

async function deleteVariablePorEstacion(idEst) {
    await prisma.tblVariablePorEstacion.delete({
        where: { idEstacion: idEst }
    })
}

module.exports.createVariablePorEstacion = createVariablePorEstacion;
module.exports.showVariablePorEstacion = showVariablePorEstacion;
module.exports.updateVariablePorEstacion = updateVariablePorEstacion;
module.exports.deleteVariablePorEstacion = deleteVariablePorEstacion;
module.exports.findVariablePorEstacion = findVariablePorEstacion;