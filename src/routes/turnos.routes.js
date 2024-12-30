import { Router } from "express";
import { 
  getTurnos,
  createTurno,
  deleteTurno,
  getTurnosPorDia,

} from '../controllers/turnos.controller.js';

const router = Router();


router.get('', getTurnos);
router.post('/pordia', getTurnosPorDia);
router.post('', createTurno);
router.delete('', deleteTurno);


export default router;