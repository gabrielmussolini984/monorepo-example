import express from 'express';
import { UserController } from '@modules/user/infra/controllers/UserController';

const router = express.Router();
const User = new UserController();
// router.get("/register", getTenant, (req, res) => {
//   console.log(req.user)
//   res.render('register', {title: req.user_tenant})
// });
router.post('/', User.store);

export default router;
