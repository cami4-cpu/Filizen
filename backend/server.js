const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

app.get("/test-db", (req, res) => {
  res.send("Ruta existe ✅");
});

const PORT = process.env.PORT || 10000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


  
  .then(() => {
    console.log("MongoDB conectado ✅");

    app.listen(PORT, () => {
      console.log("Servidor corriendo en el puerto " + PORT);
    });
  })
  .catch(err => {
    console.log("Error MongoDB ❌", err);
  });
