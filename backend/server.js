import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_USER, { useNewUrlParser: true });
// mongoose.connect("mongodb://localhost:27017/formDB", { useNewUrlParser: true });

const userSchema = {
  userName: String,
  companyName: String,
  email: String,
  number: Number,
  message: String,
};

const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  User.find({}, (error, users) => {
    if (error) throw error;
    res.json(users);
  });
});

app.post("/", (req, res) => {
  const { userName, companyName, email, number, message } = req.body;
  const newUser = new User({
    userName: userName,
    companyName: companyName,
    email: email,
    number: number,
    message: message,
  });

  newUser.save((err) => {
    if (err) {
      res.status(400).json("Error");
    } else {
      res.status(200).json("Success");
    }
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
