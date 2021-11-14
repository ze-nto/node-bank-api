import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', UserController.getUsers);
router.post('/createuser', UserController.createUser);
router.post('/login', UserController.login);

router.use((err, req, res, next) => {
  logger.error(`${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message })
});

export default router;