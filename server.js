const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
origin: "http://localhost:8080",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {res.json({ message: "Welcome to startup application." });});
const PORT = process.env.PORT || 8080;

// add routes
const users_routes = require("./routes/user.routes");
app.use("/api/users", users_routes);
// using route in app
require('./routes/auth.routes')(app);
require('./routes/test.routes')(app);


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}.`);});


function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
  }
