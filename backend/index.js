import express from "express";
import cors from 'cors'
import { AdminRoute } from "./routes/AdminRoute.js";

const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true
}))
app.use(express.json())

app.use('/auth', AdminRoute)

app.listen(8080, ()=>{
    console.log("Backend is connected");
});