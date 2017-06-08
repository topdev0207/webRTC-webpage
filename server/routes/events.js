import express from 'express';
import authenticate from '../middlewares/authenticate';
import jwt from 'jsonwebtoken';
import config from '../config';

let router = express.Router();

router.post('/', authenticate, (req, res) => {
  //var channel=getChannel(res,req);
  res.json({ user: req.currentUser});
});

var getChannel=function(res,req){
	var operatorName = req.currentUser.attributes.operatorName;
	console.log(req.currentUser.attributes.operatorName);
	var newChannel = createChannel(operatorName,res);
	return newChannel;
}

	
var dbConnection=function(){
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host     : 'webrtcdb.c3aksp5oc3wy.us-west-2.rds.amazonaws.com',
	    user     : 'epiacenza',
	    password : 'ep11959857',
	    database : 'webRTC911'
	})
	return connection;
}
export default router;

var getRandomString=function() {
  	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  	var string_length = 40;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

var createChannel=function(operatorName,res){
	var connection=dbConnection();
	var updateStatus='update operatorStatus set timeNewChannelAttributed = now(), channel = ?, status="Available" where operatorName=?;';
	var checkChannel='select * from operatorStatus where channel=?;';
	var isChannelExisting="true";
	console.log('pouet')
	var newChannel=queryBoucle(connection,checkChannel,updateStatus,operatorName,res);
	console.log('pouet pouet')
	queryBoucle
	
}
//success : true because we don't need to show the user yet... now we can use authenticate 
// method everywhere we need
var successGetChannel=function(newChannel,res){
	console.log('channel to be sent'+newChannel);
	res.status(201).json({ success: true, channel: newChannel });
}

var queryBoucle=function(connection,checkChannel,updateStatus,operatorName,res){
	var newChannel=getRandomString();
	connection.query(checkChannel,newChannel, function(err,rows,fields){
		if(!rows.length){
			console.log('pouet pouet pouet');
			connection.query(updateStatus,[newChannel,operatorName], function(err,rows,fields){
				if (err) throw err;
				console.log(newChannel);
				const channel = jwt.sign({
      			channel : newChannel
      			}, config.jwtSecret);
      			res.json({ channel });
				return newChannel;
			});
		}
		else{
			queryBoucle(connection,checkChannel,newChannel,updateStatus,operatorName);
		}
	});	

}