const express = require("express");
const cors = require("cors");
const routes = require("./route");

const app = express();
app.use(cors());
app.use(express.json());

// Use all-in-one route
app.use("/api", routes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
