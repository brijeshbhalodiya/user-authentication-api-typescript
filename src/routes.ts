import { Router } from "express";

import { signup } from "./controllers/user.ctrl";

const router: Router = Router();

router.post("/signup", signup);

export default router;
