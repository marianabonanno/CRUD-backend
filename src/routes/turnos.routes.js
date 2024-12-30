import { Router } from "express";
import  {getTurnos,
         createTurno, 
         deleteTurno, 
         getTurnosPorDia} from '../controllers/turnos.controller.js';
//import { authRequired } from "../middlewares/validateToken.js";


const router = Router()



router.get('/', getTurnos); 
router.post('/turnosPorDia', getTurnosPorDia);
router.post('/', createTurno); 
router.delete('/', deleteTurno);

export default router;