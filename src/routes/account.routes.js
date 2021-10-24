import { Router } from "express";
import accountController from "../controllers/account.controller.js";


const router = Router();

router.post('/', accountController.createAccount);
router.get('/', accountController.getAccounts);
router.get('/:id', accountController.getAccount);
router.delete('/:id', accountController.deleteAccount);
router.put('/', accountController.updateAccount)
router.patch('/updateBalance', accountController.updateBalance);


router.use((error, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
    res.status(400).send({ error: error.message });
});


export default router;