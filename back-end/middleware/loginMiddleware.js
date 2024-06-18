import jwt from "jsonwebtoken";

export const isLogin = (req, res, next) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Credenciales no se proveyeron" });
  }

  try {
    const checkContra = jwt.verify(token, process.env.AUTH_SECRET);
    req.user = checkContra.user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token no valido" });
  }
};