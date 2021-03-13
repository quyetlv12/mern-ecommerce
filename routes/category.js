import express from 'express';
const router = express.Router();

import { requireSignin, isAdmin, isAuth } from '../controllers/auth';
import { userById } from '../controllers/user';
import { create, list, read, remove, update, categoryById } from "../controllers/category";

router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/category/:categoryId", read);
router.delete("/category/:categoryId/:userId", remove);
router.put("/category/:categoryId/:userId", update);
router.get("/category", list);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;