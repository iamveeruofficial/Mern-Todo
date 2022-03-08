const { Router } = require("express");

const { getToDo, saveToDo, deleteToDo, updateToDo } = require("../controllers/Todo");

const router = Router();

router.get("/api", getToDo);

router.post("/api", saveToDo);

router.delete("/api/:id", deleteToDo);

router.patch("/api/", updateToDo);

module.exports = router;