import express from 'express';
import authenticate from '../middlewares/authenticate';

let router = express.Router();

router.post('/', authenticate, (req, res) => {
  res.status(201).json({ success: true });
});

export default router;

//success : true because we don't need to show the user yet... now we can use authenticate 
// method everywhere we need