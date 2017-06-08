import React from 'react';
import EventForm from './EventForm';
import jwt from 'jsonwebtoken';



class NewEventPage extends React.Component {

  render() {
  	var token = localStorage.getItem('jwtToken');
	console.log(jwt.decode(token));
	var tokenDecoded = jwt.decode(token);
	console.log(tokenDecoded.type);
	if (tokenDecoded.type == "psap") {
		return <div> <EventForm /></div>;
	} else if (tokenDecoded.type == "fire") {
		return <h1> Fire</h1>;
	}
  }
}
export default NewEventPage;

