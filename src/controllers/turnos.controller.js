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
   
    console.log("date recibido", dia);
    
    const day = new Date(dia);

    
    
    const turnos1 = await Turno.find({ day }); 
    console.log(turnos1);

    if (!turnos1 || turnos1.length === 0) {
      return res.status(404).json({ message: "No se encontraron turnos para este día." });
    }
    
    res.json(turnos1); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hubo un error al obtener los turnos." });
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
