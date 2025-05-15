const dotenv = require("dotenv");
const express = require("express");
const Users = require("./model/UsersSchema");
const productsRoutes = require("./routes/products");
const storesRoutes = require("./routes/stores");
const salesRoutes = require("./routes/sales");
const purchaseRoutes = require("./routes/purchase");

const app = express();
var cors = require("cors");

dotenv.config({ path: "./config.env" });

require("./db/conn");

app.use(express.json());
app.use(cors());
app.use("/products", productsRoutes);
app.use("/stores", storesRoutes);
app.use("/sales", salesRoutes);
app.use("/purchase", purchaseRoutes);
app.get("/", (req, res) => {
  res.send("This is home");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log('BODY---->',req.body)

  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please filled the all field" });
  }

  try {
    const userExist = await Users.findOne({ email: email });
    console.log('User exists---.',userExist)

    if (userExist) {
      return res.status(422).json({ error: "Email already exist!" });
    }

    const user = new Users({
      name,
      email,
      password,
    });

    const userReg = await user.save();

    console.log('User reg',userReg)

    if (userReg) {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/resetpassword", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  console.log('BODY---->', req.body);

  if (!email || !oldPassword || !newPassword) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  try {
    const user = await Users.findOne({ email: email });
    console.log('User found:', user);

    if (!user) {
      return res.status(422).json({ error: "Email not found!" });
    }

    if (user.password !== oldPassword) {
      return res.status(401).json({ error: "Old password is incorrect" });
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({ error: "New password must be different from the old password" });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    console.error("Error in forgot-password:", error);
    return res.status(500).json({ error: "Server error" });
  }
});


app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill the data" });
    }

    const userLogin = await Users.findOne({ email: email });
    console.log(userLogin);

    if (!userLogin) {
      res.status(404).json({ error: "Please Signup first!" });
    } else {
      if (password == userLogin.password) {
        // res.status(200).send(req.body)
        res.status(200).json(userLogin);
      } else {
        res.status(404).json({ error: "incorrect password" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(4000, () => {
  console.log("server listen on port 4000");
});
