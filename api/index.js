require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cors = require("cors");
const createSocket = require("./socket");

const app = express();
app.use(express.json());
app.use(cors());

createSocket(process.env.SOCKET_PORT);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  surname: String,
  email: String,
  isVerified: { type: Boolean, default: false },
  confirmationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  members: { type: Array, default: [] },
});

const memberSchema = new mongoose.Schema({
  name: String,
  surname: String,
  owner: String,
});

const deviceSchema = new mongoose.Schema({
  name: String,
  owner: String,
  locX: Number,
  locY: Number,
});

const User = mongoose.model("User", userSchema);
const Member = mongoose.model("Member", memberSchema);

app.post("/register", async (req, res) => {
  const { username, password, name, surname, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const confirmationToken = crypto.randomBytes(20).toString("hex");

  console.log({ username, password, name, surname, email });
  const newUser = new User({
    username,
    password: hashedPassword,
    name,
    surname,
    email,
    confirmationToken,
  });

  await newUser.save();
  res
    .status(201)
    .send({ msg: "User registered", confirmationToken: confirmationToken });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).send("User not found");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (validPassword) {
    res.status(200).send(user);
  } else {
    res.status(403).send("Invalid password");
  }
});

app.post("/requestPasswordReset", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send("User not found");
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.passwordResetToken = token;
  user.passwordResetExpires = Date.now() + 3600000;

  await user.save();

  res.status(200).send({ msg: "OK", token, user });
});

app.post("/resetPassword", async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(404).send("Invalid or expired token");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;

  await user.save();

  res.status(200).send("OK");
});

app.post("/getuser", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).send("User not found");
  }

  const validPassword = password === user.password;

  if (validPassword) {
    res.status(200).send(user);
  } else {
    res.status(403).send("Invalid password");
  }
});

app.get("/confirm/:token", async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({ confirmationToken: token });

  if (!user) {
    return res.status(400).send("Invalid token");
  }

  user.isVerified = true;
  user.confirmationToken = undefined;

  await user.save();

  res.status(200).send("Email confirmed");
});

app.post("/test", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).send("User not found");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (validPassword) {
    res.status(200).send("Logged in");
  } else {
    res.status(403).send("Invalid password");
  }
});

app.get("/getMembers", async (req, res) => {
  console.log("/getMembers request");
  const { owner } = req.query;

  const members = await Member.find({ owner });

  if (!members) {
    return res.status(404).send("No members found");
  }

  console.log(members);

  res.status(200).send(members);
});

app.post("/addMember", async (req, res) => {
  const { name, surname, owner } = req.body;

  const newMember = new Member({
    name,
    surname,
    owner,
  });

  await newMember.save();
  res.status(201).send({ msg: "Member added", member: newMember });
});

app.listen(process.env.API_PORT, () => {
  console.log(`Server running on http://localhost:${port}`);
});
