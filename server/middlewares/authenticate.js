import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';

export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    console.log('token is present: '+token);

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      }
      else {
        console.log('no error');
        User.query({
          where: { operatorID: decoded.id },
          select: ['operatorID','operatorName']
        }).fetch().then(user => {
          if (!user) {
            res.status(404).json({ error: 'No such user' });
          }
          req.currentUser = user;
          next();
        });
      }
    });

  } else {
    res.status(403).json({
      error: 'No token provided'
    });
  }
}
