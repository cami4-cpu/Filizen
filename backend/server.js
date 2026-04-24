const express = require("express");
const app = express();

// Middleware para que lea JSON
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// Puerto (Render lo asigna automáticamente)
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto " + PORT);
});
