const express = require("express");

const ctrl = require("../../controllers/articles");
const { isValidId, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/article");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.put("/:id", isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.delete("/:id", isValidId, ctrl.deleteById);

module.exports = router;
