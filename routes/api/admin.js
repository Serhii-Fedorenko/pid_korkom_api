const express = require("express");

const ctrl = require("../../controllers/admin");
const { isValidId, validateBody, upload } = require("../../middlewares");
const { schemas } = require("../../models/article");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post(
  "/",
  upload.single("image"),
  validateBody(schemas.addSchema),
  ctrl.add
);

router.put(
  "/:id",
  isValidId,
  upload.single("image"),
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.delete("/:id", isValidId, ctrl.deleteById);

module.exports = router;
