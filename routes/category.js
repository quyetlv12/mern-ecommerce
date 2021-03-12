import express from 'express';
const router = express.Router();

import { requireSignin, isAdmin, isAuth } from '../controllers/auth';
import { userById } from '../controllers/user';
import { create, list } from "../controllers/category";

router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/category", list);

router.param("userId", userById);

module.exports = router;