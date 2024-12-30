import Turno from '../models/turno.model.js'


export const getTurnos = async (req, res) => {
    const turnos = await Turno.find()
    res.json(turnos)
};


export const createTurno = async (req, res) => {

    try {
        const {dia, hora, servicio } = req.body

        const newTurno = new Turno({
            dia,
            hora,
            servicio
        })
    
      const savedTurno =  await newTurno.save();
      res.json(savedTurno);
      console.log("Turno creado exitosamente")
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el turno" });
    }

};


export const getTurnosPorDia = async (req, res) => {
  try {
    const { dia } = req.body;
    console.log("date recibido", typeof(dia));

    // Convertir la fecha recibida en un objeto Date
    const day = new Date(dia);

    // Obtener todos los turnos sin filtro
    const turnos = await Turno.find();
    console.log(turnos);

    if (!turnos || turnos.length === 0) {
      return res.status(404).json({ message: "No se encontraron turnos." });
    }

    // Crear un nuevo array donde se almacenarán los turnos del día específico
    const turnosDelDia = [];

    // Comparar cada turno con el día pasado por el usuario
    turnos.forEach((turno) => {
      const turnoDate = new Date(turno.dia); // Convertir el turno en Date para compararlo

      // Compara solo la fecha (sin la hora), utilizando el método de comparación de fechas
      if (
        turnoDate.getFullYear() === day.getFullYear() &&
        turnoDate.getMonth() === day.getMonth() &&
        turnoDate.getDate() === day.getDate()
      ) {
        // Si la fecha del turno coincide con la fecha recibida, agregarlo al array
        turnosDelDia.push(turno);
      }
    });
   console.log(turnosDelDia);
    // Si no se encuentran turnos para ese día, responder con un 404
    if (turnosDelDia.length == 0) {
      const mensaje = "No hay turnos creados en ese día"
      return res.status(404).json({ message: mensaje });
    }

    // Devolver los turnos encontrados para el día específico
    res.json(turnosDelDia);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "No hay turnos creados en ese día" });
  }
};



export const deleteTurno = async (req, res) => { 

try{
    const { dia, hora } = req.body;

    const diaDate = new Date(dia);

  
    if (isNaN(diaDate.getTime())) {
      return res.status(400).json({ message: "Formato de fecha inválido" });
    }

  
    const turno = await Turno.findOneAndDelete({ dia: diaDate, hora });

    if (!turno) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }

    res.json({ message: "Turno eliminado exitosamente", turno });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el turno" });
  }
};




export const updateTurno = async (req, res) => {
  try {
    const { dia, hora, newDia, newHora, newServicio } = req.body;


    const diaDate = new Date(dia);
    if (isNaN(diaDate.getTime())) {
      return res.status(400).json({ message: "Formato de fecha inválido" });
    }


    const newDiaDate = new Date(newDia);
    if (newDia && isNaN(newDiaDate.getTime())) {
      return res.status(400).json({ message: "Nuevo formato de fecha inválido" });
    }

    
    const turno = await Turno.findOne({ dia: diaDate, hora });
    if (!turno) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }

  
    turno.dia = newDia ? newDiaDate : turno.dia;
    turno.hora = newHora ? newHora : turno.hora;
    turno.servicio = newServicio ? newServicio : turno.servicio;

 
    await turno.save();

    res.json({ message: "Turno modificado exitosamente", turno });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al modificar el turno" });
  }
};
