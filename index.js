/** @format */

import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const userRouter = express.Router();
const bookRouter = express.Router();

// File loc.
const currentPath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(currentPath);
const userJSONPath = join(currentFolderPath, "src", "data", "user.json");

// Reading the file
const userJsonFile = fs.readFileSync(userJSONPath);
const userDataRead = JSON.parse(userJsonFile.toString());

// User router

userRouter.get("/", (req, res) => {
  console.log("url is : -> ", req.url);

  console.log({
    currentPath,
    currentFolderPath,
    metaUrl: import.meta.url,
    currentFolderPath,
    userJSONPath,
  });

  console.log(userDataRead);

  res.send(userDataRead);
});

userRouter.get("/:id", (req, res) => {
  // finding the user
  const user = userDataRead.find((u) => u._id === req.params.id);
  res.send(user);
});

userRouter.post("/", (req, res) => {
  console.log(req.body);
  const newUser = { ...req.body, _id: uniqid(), createdAt: new Date() };
  res.send(newUser);

  //  changing the file
  userDataRead.push(newUser);
  console.log(userDataRead);
  // writing the file back
  fs.writeFileSync(userJSONPath, JSON.stringify(userDataRead));
});

userRouter.put("/:id", (req, res) => {
  const newUsers = userDataRead.filter((u) => u._id !== req.params.id);
  const changeUser = { ...req.body, _id: req.params.id, createdAt: new Date() };
  newUsers.push(changeUser);
  //   Place back
  fs.writeFileSync(userJSONPath, JSON.stringify(newUsers));
  res.send("Updated!!");
});

userRouter.delete("/:id", (req, res) => {
  const newUsers = userDataRead.filter((u) => u._id !== req.params.id);
  fs.writeFileSync(userJSONPath, JSON.stringify(newUsers));
  res.send("Deleted the user: ", req.params.id);
});

// Book router

bookRouter.get("/", (req, res) => {});

bookRouter.get("/:id", (req, res) => {});

bookRouter.post("/", (req, res) => {});

bookRouter.put("/:id", (req, res) => {});

bookRouter.delete("/:id", (req, res) => {});

export { userRouter, bookRouter };
