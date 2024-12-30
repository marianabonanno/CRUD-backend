import mongoose from "mongoose";

const turnoSchema = new mongoose.Schema({
    dia: {
     type: Date,
     required: true,
    },
    hora: {
      type: String,
      required: true,
      match:/^([01]\d|2[0-3]):([0-5]\d)$/,
    },
    servicio:{
        type: String,
        required: true,
    },
});

export default mongoose.model('Turno', turnoSchema);