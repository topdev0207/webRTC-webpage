import express from 'express';
//import User from '../models/user';
//import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

let router = express.Router();

var mysql = require('mysql')

var connection = mysql.createConnection({
    host     : 'XXXXXX',
    user     : 'XXXXXXX',
    password : 'XXXXXX',
    database : 'XXXXXXX'
  });


router.post('/', (req, res) => {
  const { identifier, password } = req.body;
  /*connection.connect(function(err){
    if (err) throw err;
    console.log('conect');
  });*/
  var sql="select * from 911_operator_login where username = ? and password = sha2(?,256)";
  connection.query(sql, [identifier, password], function(err, rows, fields) {
    if (!rows.length){
      res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    }else{
      const token = jwt.sign({
      id: rows[0].user_id,
      username: rows[0].username,
      type: rows[0].pouet
      }, config.jwtSecret);
      res.json({ token });
    }
  });
  //connection.end();
});

/*



*/


export default router;


