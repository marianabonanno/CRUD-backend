import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';


export const authRequired = (req, res, next) => {

    const cookieString = req.headers.cookie; 

    console.log("Cookie sin extraer:", cookieString);

 
    if (!cookieString) {
        return res.status(401).json({ message: "No autorizado: Cookie no encontrada" });
    }


    function extraerToken(cookieString) {
     
        const token = cookieString
            .replace(/^token=/, '') 
            .split('; ')[0];        
        return token;
    }

    const token = extraerToken(cookieString);

    console.log("Token extraído:", token);

 
    if (!token) {
        return res.status(401).json({ message: "No autorizado: Token no encontrado" });
    }

 jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if(err) return res.status(403).json({message: "Token Invalido"});
 
    req.user = user

    next();
})

}

// export const permisos = (req, res) => {
//     try {
    
//         const cookieString = req.headers.cookie;
//         console.log(cookieString)
//         let token = null;

//         if (cookieString) {
//             const cookies = cookieString.split('; ');
//             const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
//             if (tokenCookie) {
//                 token = tokenCookie.split('=')[1];
//             }
//         }
        
//         console.log(token)
    
//         if (!token) {
//             const authHeader = req.headers.authorization;
//             if (authHeader && authHeader.startsWith('Bearer ')) {
//                 token = authHeader.slice(7);
//             }
//         }

//         if (!token) {
//             return res.json({ success: false });
//         }

//         jwt.verify(token, TOKEN_SECRET, (err, user) => {
//             if (err) {
//                 return res.json({ success: false });
//             }
//             return res.json({ success: true, user });
//         });
//     } catch (error) {
//         console.error("Error validando permisos:", error);
//         res.json({ success: false });
//     }
// };

