import express from 'express';
import passport from 'passport';
import { SessionController } from '@modules/user/infra/controllers/SessionController';

const router = express.Router();
const Session = new SessionController();

router.get('/', Session.index);
router.post(
  '/',
  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/',
    failureFlash: true
  })
);

export default router;
