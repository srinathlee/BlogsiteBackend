// /routes/authRoutes.js
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';


const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // const payload = {
    //   id: req.user._id,
    //   name: req.user.name,
    //   email: req.user.email,
    // };
    const payload={
          id: req.user._id,
          email: req.user.email
    }

   
    const token = jwt.sign(payload,process.env.JWT_SECRET, { expiresIn: '1d' });
    

    // Redirect with JWT token as query param
    res.redirect(`${process.env.CLIENT_URL}/google-auth?token=${token}`);
  }
);

export default router;
