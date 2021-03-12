import express from 'express';
const router = express.Router();

import { userById } from '../controllers/user';
import { requireSignin, isAdmin, isAuth } from "../controllers/auth";

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
});
router.param('userId', userById);

module.exports = router;



