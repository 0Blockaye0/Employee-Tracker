// const express = require("express");
const init = require("./userPrompt");
const switchFun = require("./userPrompt");
// const app = express();
const PORT = process.env.PORT || 3001;

// EXPRESS MIDDLEWARE
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// TEST ROUTE
// app.get("/", (req, res) => res.send("Hello World!"));

/// CATCHALL ROUTE MUST COME LAST SO AS TO NOT OVERRIDE OTHER ROUTES
// Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });


init();



