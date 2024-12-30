import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
//import { createAccesToken } from "../libs/jwt.js";

export const registro = async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      nombre,
      apellido,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
   // const token = await createAccesToken({id: userSaved._id})

   // res.cookie("token", token);
    return res.status(201).json({
      message: "Usuario creado exitosamente",
      user: {
        id: userSaved._id,
        nombre: userSaved.nombre,
        apellido: userSaved.apellido,
        email: userSaved.email,
        //token: userSaved.token,
      },
    });
  
  } catch (error) {
   res.status(500).json({message: error.message});
    console.log(error);
  }

};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    //const token = await createAccesToken({id: userFound._id})
    
    //res.cookie("token", token);

    res.json({
      id: userFound._id,
      nombre: userFound.nombre,
      email: userFound.email,
     // token: userFound.token,
    });
    console.log(token)
  } catch (error) {
    console.log(error);
  }

  console.log("sesion iniciada");
};

export const logout = (req, res) => {
  //  res.cookie('token',"",{
  //     expires: new Date(0)
  //  })
  return res.sendStatus(200);
};


export const profile = async (req, res) => {
 const userFound = await  User.findById(req.user.id)
   res.send("profile")
}
