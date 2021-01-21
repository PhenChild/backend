const prisma = require("../app.js").prisma;

async function createVariable(body) {
    await prisma.tblVariable.create({
        data: {
            nombre: body.nombre,
            unidad: body.unidad,
            maximo: parseInt(body.apellido,10),
            minimo: parseInt(body.telefono),
            tipoDato: body.tipoDato
        }
    })
}

async function showVariable(req,res) {
    //const allEstaciones = await prisma.estacion.findMany()
        prisma.tblVariable.findMany().then(data =>{
            res.send(data)
        })
    //console.dir(allEstaciones, { depth: null });
}

async function findVariable(idEst) {
    //const allEstaciones = await prisma.estacion.findMany()
        prisma.tblVariable.findMany({
            where: { idEstacion: idEst }
        }).then(data =>{
            return data
        })
    //console.dir(allEstaciones, { depth: null });
}

async function updateVariable(idEst, nom) {
    const estacion = await prisma.tblVariable.update({
      where: { idEstacion: idEst },
      data: { nombre: nom },
    })
    console.log(estacion);
  }

async function deleteVariable(idEst) {
    await prisma.tblVariable.delete({
        where: { idEstacion: idEst }
    })
}

module.exports.createVariable = createVariable;
module.exports.showVariable = showVariable;
module.exports.updateVariable = updateVariable;
module.exports.deleteVariable = deleteVariable;
module.exports.findVariable = findVariable;