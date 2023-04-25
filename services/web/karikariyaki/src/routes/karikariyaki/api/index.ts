import { Router } from "express";

// Routes
import v1Router from "./v1";

const router = Router();

router.use("/v1", v1Router);

export default router;
