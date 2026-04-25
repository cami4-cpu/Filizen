const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
 res.json({ mensaje: "Login funcionando" });
});

module.exports = router;
