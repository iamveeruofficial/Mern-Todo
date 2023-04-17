require("dotenv").config({ path: "config.env" });
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const routes = require("./router/router");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

require("./db/conn");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

// Routes
app.use(routes);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.listen(PORT, () =>
  console.log("Server running on port http://localhost:" + PORT)
);
