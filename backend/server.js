const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// Ruta de prueba servidor
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// 🔥 Ruta para probar MongoDB
app.get("/test-db", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.send("MongoDB conectado correctamente ✅");
  } catch (error) {
    res.status(500).send("Error con MongoDB ❌");
  }
});

// Puerto
const PORT = process.env.PORT || 10000;

// Conexión MongoDB (IMPORTANTE)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado ✅");

    app.listen(PORT, () => {
      console.log("Servidor corriendo en el puerto " + PORT);
    });
  })
  .catch(err => {
    console.log("Error MongoDB ❌", err);
  });
