import mongoose from "mongoose";


const razasSchemas = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
    }
})


const razasModel =mongoose.model('razas',razasSchemas)

export default razasModel