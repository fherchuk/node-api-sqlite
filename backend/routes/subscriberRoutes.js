const express = require("express");
const router = express.Router();
const controller = require("../controllers/subscriberController");

router.route("/").get(controller.getAll).post(controller.addSubscriber);

router
  .route("/:id")
  .get(controller.getSubscriber)
  .put(controller.updateSubscriber)
  .delete(controller.deleteSubscriber);

module.exports = router;
