import express from 'express'
import db from '../utils/db.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router();

router.post('/adminlogin', (req,res)=>{
    const q = "SELECT * FROM admin WHERE email = ? AND password = ?";
    db.query(q, [req.body.email , req.body.password], (err, result) => {
        if(err) return res.json({loginStatus: false, Error: "Query error"})
        if(result.length >0){
            const email = result[0].email;
            const token = jwt.sign(
                {role: "admin", email: email},
                "jwt_secret_key", 
                {expiresIn: "1d"},
                );
            res.cookie ('token', token)
            return res.json({loginStatus: true})

        }
        else{
            return res.json({loginStatus: false, Error: "Wrong Email or Password"})
        }
    })
})

router.post('/addcategory', (req,res)=>{
    const q = "INSERT INTO category (`name`) VALUES (?)";
    db.query(q, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query error"})
        return res.json({Status: true})

    })
})

router.get('/category', (req,res)=>{
    const q = "SELECT * FROM category";
    db.query(q, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query error"})
        return res.json({Status: true, Result: result})

    })
})

router.post('/addemployee', (req, res) => {
    const q = "INSERT INTO employee (`name`, `email`, `password`, `salary`, `address` , `image`) VALUES (?, ?, ?, ?, ?, ?)";
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary, 
            req.file.filename,
           // req.body.category_id,
        ]
        db.query(q, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})

router.get('/employee', (req,res)=>{
    const q = "SELECT * FROM employee";
    db.query(q, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query error"})
        return res.json({Status: true, Result: result})

    })
})

export {router as AdminRoute};