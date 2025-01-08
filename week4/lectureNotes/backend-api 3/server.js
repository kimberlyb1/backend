const mongoose = require("mongoose");

const app = require("./app");

const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/backend-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected on ${port}`);
      console.log("MongoDB Connected");
    });
  })
  .catch((e) => {
    console.log(e);
  });
