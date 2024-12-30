import { Router } from "express";
import  {getTurnos,
         createTurno, 
         deleteTurno, 
         getTurnosPorDia} from '../controllers/turnos.controller.js';
//import { authRequired } from "../middlewares/validateToken.js";


const router = Router()



router.get('/turnos', getTurnos);
router.post('/turnosPorDia', getTurnosPorDia);
router.post('/turnos',  createTurno);
router.delete('/turnos',  deleteTurno);

export default router;