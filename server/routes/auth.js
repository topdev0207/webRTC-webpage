import express from 'express';
//import User from '../models/user';
//import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

let router = express.Router();

var mysql = require('mysql')

var connection = mysql.createConnection({
    host     : 'webrtcdb.c3aksp5oc3wy.us-west-2.rds.amazonaws.com',
    user     : 'epiacenza',
    password : 'ep11959857',
    database : 'webRTC911'
  });


router.post('/', (req, res) => {
  const { identifier, password } = req.body;
  /*connection.connect(function(err){
    if (err) throw err;
    console.log('conect');
  });*/
  var sql="select * from operatorCredential where operatorName = ? and password = sha2(?,256)";
  connection.query(sql, [identifier, password], function(err, rows, fields) {
    if (!rows.length){
      res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    }else{
      const token = jwt.sign({
      id: rows[0].operatorID,
      username: rows[0].operatorName,
      type: rows[0].operatorType
      }, config.jwtSecret);
      res.json({ token });
    }
  });
  //connection.end();
});

/*



*/


export default router;


