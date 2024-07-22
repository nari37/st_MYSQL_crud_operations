


import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.Port || 8000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
});


// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '*****' : '(empty)');
// console.log('DB_NAME:', process.env.DB_NAME);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    
  }else{
    console.log('Database connected successfully');
  }

});

// Getting data from database...API
app.get('/', (req, res) => {
  const sql = "SELECT * FROM userslist";
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ Message: 'Error in server' });
      return;
    }
    res.send(result);
  });
});

// Insert data to database...API
app.post('/student', (req, res) => {
  const sql = "INSERT INTO userslist (`email`, `username`, `phonenumber`) VALUES (?)";
  const values = [req.body.email, req.body.username, req.body.phone];
  db.query(sql, [values], (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    res.send(result);
  });
});

// Read data from database...API
app.get('/Read/:id', (req, res) => {
  const sql = "SELECT * FROM userslist WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.json({ Message: 'Error in server' });
      return;
    }
    res.send(result);
  });
});

// Update data...API
app.put('/update/:id', (req, res) => {
  const sql = "UPDATE userslist SET `email` = ?, `username` = ?, `phonenumber` = ? WHERE `id` = ?";
  const id = req.params.id;
  db.query(sql, [req.body.email, req.body.username, req.body.phonenumber, id], (err, result) => {
    if (err) {
      res.json(err);
      return;
    }
    res.send(result);
  });
});

// Delete data...API
app.delete('/delete/:id', (req, res) => {
  const sql = "DELETE FROM userslist WHERE `id` = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.json({ Message: 'Error in server' });
      return;
    }
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
