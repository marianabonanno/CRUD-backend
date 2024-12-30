import { Router } from "express";
import { 
  getTurnos,
  createTurno,
  deleteTurno,
  getTurnosPorDia,

} from '../controllers/turnos.controller.js';

const router = Router();


router.get('', getTurnos);
router.post('', getTurnosPorDia);
router.post('', createTurno);
router.delete('', deleteTurno);


export default router;