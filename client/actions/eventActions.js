import axios from 'axios';
import jwt from 'jsonwebtoken';

export function createEvent(events) {
  return dispatch => {
    return axios.post('/api/events', events);
    const channel = res.events.user;
    console.log(res.events.user);
    localStorage.removeItem('jwtToken');
    //setAuthorizationToken(token);
    //console.log(jwt.decode(token));
    //dispatch(setCurrentUser(jwt.decode(token)));
  };
}
//