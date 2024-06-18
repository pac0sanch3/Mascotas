import mongoose from "mongoose";

// manejar variables de entorno secretas
import dotenv from "dotenv";
dotenv.config({ path: "env/.env" });

class ConexionMongo {
  constructor() {
    this._conecct();
  }

  _conecct() {
    mongoose
      .connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`)
      .then(() => {
        console.log("conectado a la base de datos de las mascotas");
      })
      .catch((err) => {
        console.error("Database connection error",err);
      });
  }
}

export default ConexionMongo;
