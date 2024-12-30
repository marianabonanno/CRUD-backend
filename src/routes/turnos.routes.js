import { Router } from "express";
import { 
  getTurnos,
  createTurno,
  deleteTurno,
} from '../controllers/turnos.controller.js';

const router = Router();


router.get('', getTurnos);
router.post('', createTurno);
//router.post('/turnos/pordia', getTurnosPorDia);
router.delete('', deleteTurno);


export default router;