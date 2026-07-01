import { Router } from "express";
import {
    getStats,
    getAllUsers,
    getAllAppointments,
    blockUser,
    unblockUser,
    getPendingOffers,
    getOpenOffers,
    getUnblockRequests,
    denyUnblockRequest,
} from "#controllers/admin.controllers.js";
import checkUser from "#middlewares/checkuser.middleware.js";
import checkAdmin from "#middlewares/checkAdmin.middleware.js";

const router = Router();

router.use(checkUser, checkAdmin);

router.get("/stats", getStats);
router.get("/users", getAllUsers);
router.get("/appointments", getAllAppointments);
router.put("/users/:id/block", blockUser);
router.put("/users/:id/unblock", unblockUser);
router.get("/pending-offers", getPendingOffers);
router.get("/open-offers", getOpenOffers);
router.get("/unblock-requests", getUnblockRequests);
router.put("/unblock-requests/:id/deny", denyUnblockRequest);

export default router;
