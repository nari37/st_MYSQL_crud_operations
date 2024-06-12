import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json())
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'students'
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Database connected successfully');
});
//  getting data from database...API
app.get('/',(req,res)=>{
     const sql = "SELECT * FROM userslist";
     db.query(sql,(err,result)=>{
      if(err){
        res.json({Message:'Error in server'});
      }
      if(!err){
        res.send(result);
      }
     })
})
// insert the data to database...API
app.post('/student',(req,res)=>{
   const sql = "INSERT INTO userslist (`email`,`username`,`phonenumber`) VALUES (?)"
   const values = [req.body.email,req.body.username,req.body.phone]
   db.query(sql, [values],(err,result)=>{
      if(err){
        res.json(err)
      }
      if(!err){
        res.send(result)
      }
   })
})
// read database...API
app.get('/Read/:id',(req,res)=>{
    const sql = "SELECT * FROM userslist WHERE id = ?"
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
     if(err){
       res.json({Message:'Error in server'});
     }
     if(!err){
       res.send(result);
     }
    })
})
// update data...API

app.put('/update/:id',(req,res)=>{
    const sql = "UPDATE userslist SET `email` = ?,`username`=? ,`phonenumber`=? WHERE `id`=? " ;
    const id = req.params.id
    db.query(sql,[req.body.email,req.body.username,req.body.phonenumber,id],(err,result)=>{
       if(err){
         res.json(err)
       }
       if(!err){
         res.send(result)
       }
    })
 })
    // delete data API...
    app.delete('/delete/:id',(req,res)=>{
        const sql = "DELETE FROM userslist WHERE `id` =?";
        const id = req.params.id;
        db.query(sql,[id],(err,result)=>{
            if(!err){
                res.send(result)
            }
            if(err){
                console.log(err)
            }
        })
    }) 


app.listen(8081,()=>{
    console.log('Server is running..')
})