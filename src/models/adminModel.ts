import mongoose from "mongoose";
import { Iadmin } from "../interfaces/adminModelInterface";

const AdminSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        },
    },
    {timestamps:true}
)

const adminModule = mongoose.model<Iadmin>("admin",AdminSchema);

export default adminModule;