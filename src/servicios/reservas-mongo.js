const mongoose = require("mongoose");

const { Reserva } = require("../modelos/reserva");

function representarReserva(documento) {
  return {
    id: documento._id.toString(),
    estudiante: documento.estudiante,
    email: documento.email,
    sala: documento.sala,
    fecha: documento.fecha,
    turno: documento.turno,
    personas: documento.personas,
    estado: documento.estado,
  };
}

function crearServicioReservasMongo() {
  async function listar(sala) {
    const filtro = {};

    if (sala !== undefined) {
      if (typeof sala !== "string" || !sala.trim()) {
        const error = new Error("El filtro de sala no es válido.");
        error.codigo = "FILTRO_INVALIDO";
        throw error;
      }

      filtro.sala = sala.trim();
    }

    const documentos = await Reserva.find(filtro).lean();

    return documentos.map(representarReserva);
  }

  async function buscarPorId(id) {
    if (!mongoose.isObjectIdOrHexString(id)) {
      const error = new Error("El ID de la reserva no es válido.");
      error.codigo = "ID_INVALIDO";
      throw error;
    }

    const documento = await Reserva.findById(id).lean();

    return documento ? representarReserva(documento) : null;
  }

  async function contar() {
    return Reserva.countDocuments();
  }

  async function crear(datos) {
    const documento = await Reserva.create({
      estudiante: datos.estudiante,
      email: datos.email,
      sala: datos.sala,
      fecha: datos.fecha,
      turno: datos.turno,
      personas: datos.personas,
    });

    return representarReserva(documento);
  }

  return {
    listar,
    buscarPorId,
    contar,
    crear,
  };
}

module.exports = {
  crearServicioReservasMongo,
};
