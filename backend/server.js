const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const path = require("path");

const bcrypt = require("bcrypt");

const cors = require("cors");

const axios = require("axios");

const jwt = require("jsonwebtoken");

const UserLog = require("./models/UserLog");

const app = express();

app.use(express.json());

app.use(cors());

const PORT = 5000;

const userLogsRoute = require("./routes/userLogs");

app.use("/api", userLogsRoute);

mongoose.connect(
  "mongodb+srv://user0:<password>@dookan.lfcjnkb.mongodb.net/dookan?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: "user0",
    pass: "9c7K5thwrjBKhrju",
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get(`/shopify-data`, async (req, res) => {
  const token = req.headers.authorization;
  let secretKey = "your-secret-key";
  try {
    const shopifyResponse = await axios.get(
      "https://dookan-dev-plus.myshopify.com/admin/api/2024-01/products.json",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": "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",
        },
      }
    );
    const decodedToken = jwt.verify(token, secretKey);

    const username = decodedToken.username;

    try {
      const user = await User.findOne({ username }).exec();

      if (user) {
        const userId = user._id;

        const userLog = new UserLog({
          userId: userId,
          action: "Get_all_Shopify_Data",
          username: username,
        });
        await userLog.save();
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error finding user:", error);
    }

    const shopifyData = shopifyResponse.data;

    return res.status(200).json(shopifyData);
  } catch (error) {
    console.error("Error fetching data from Shopify:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/create-product", async (req, res) => {
  const token = req.headers.authorization;

  let secretKey = "your-secret-key";
  try {
    const { title, body_html, vendor, product_type, status } = req.body;

    const shopifyResponse = await axios.post(
      "https://dookan-dev-plus.myshopify.com/admin/api/2023-07/products.json",
      {
        product: {
          title,
          body_html,
          vendor,
          product_type,
          status,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": "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",
        },
      }
    );
    const createdProduct = shopifyResponse.data.product;

    const decodedToken = jwt.verify(token, secretKey);

    const username = decodedToken.username;

    try {
      const user = await User.findOne({ username }).exec();

      if (user) {
        const userId = user._id;

        const userLog = new UserLog({
          userId: userId,
          action: "Added_New_Product",
          username: username,
        });
        await userLog.save();
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error finding user:", error);
    }

    return res.json({ success: true, product: createdProduct });
  } catch (error) {
    console.error("Error creating product on Shopify:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/update-product/:productId", async (req, res) => {
  const token = req.headers.authorization;
  let secretKey = "your-secret-key";
  try {
    const productId = req.params.productId;

    const shopifyResponse = await axios.put(
      `https://dookan-dev-plus.myshopify.com/admin/api/2022-01/products/${productId}.json`,
      {
        product: {
          ...req.body,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": "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",
        },
      }
    );

    const updatedProduct = shopifyResponse.data.product;

    const decodedToken = jwt.verify(token, secretKey);

    const username = decodedToken.username;

    try {
      const user = await User.findOne({ username }).exec();

      if (user) {
        const userId = user._id;

        const userLog = new UserLog({
          userId: userId,
          action: "Updated_Product",
          productId: productId,
          username: username,
        });
        await userLog.save();
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error finding user:", error);
    }

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Error updating product on Shopify:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/delete-product/:productId", async (req, res) => {
  const token = req.headers.authorization;

  let secretKey = "your-secret-key";
  try {
    const productId = req.params.productId;
    const shopifyResponse = await axios.delete(
      `https://dookan-dev-plus.myshopify.com/admin/api/2022-01/products/${productId}.json`,
      {
        headers: {
          "X-Shopify-Access-Token": "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",
        },
      }
    );

    const decodedToken = jwt.verify(token, secretKey);

    const username = decodedToken.username;

    try {
      const user = await User.findOne({ username }).exec();

      if (user) {
        const userId = user._id;

        const userLog = new UserLog({
          userId: userId,
          action: "Deleted_Product",
          productId: productId,
          username: username,
        });
        await userLog.save();
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error finding user:", error);
    }
    return res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product on Shopify:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// authentication Requests
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  mobileNumber: { type: String, unique: true, required: true },
  email: { type: String, unique: true },
});

const User = mongoose.model("Ishwar_auth", userSchema);

app.post("/api/signup", async (req, res) => {
  const { username, password, mobileNumber, email } = req.body;

  const existingUser = await User.findOne({
    $or: [{ username }, { mobileNumber }],
  });
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "Username or mobile number already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      mobileNumber,
      email,
      password: hashedPassword,
    });
    await user.save();

    const userLog = new UserLog({
      userId: user._id,
      action: "signup",
    });
    await userLog.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    const user = new User({
      username,
      mobileNumber,
      email,
      password: hashedPassword,
    });

    const userLog = new UserLog({
      userId: user._id,
      action: "signup Failed",
    });
    await userLog.save();
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const userLog = new UserLog({
      userId: user._id,
      action: "login",
    });
    await userLog.save();

    const token = jwt.sign({ username: user.username }, "your-secret-key");
    res.json({ token });
  } catch (error) {
    const user = await User.findOne({ username });
    const userLog = new UserLog({
      userId: user._id,
      action: "login Failed",
    });
    await userLog.save();
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// To Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
