/** @format */

import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const userRouter = express.Router();
const reservationsRouter = express.Router();

// File loc.
const currentPath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(currentPath);
// document specific path
const userJSONPath = join(currentFolderPath, "src", "data", "user.json");
const reservationsJSONPath = join(
  currentFolderPath,
  "src",
  "data",
  "reservations.json"
);

// Reading the  user file
const userJsonFile = fs.readFileSync(userJSONPath);
const userDataRead = JSON.parse(userJsonFile.toString());
// Reading the reservations file
const reservationsJsonFile = fs.readFileSync(reservationsJSONPath);
const reservationsDataRead = JSON.parse(reservationsJsonFile.toString());

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

reservationsRouter.get("/", (req, res) => {
  console.log("url is : -> ", req.url);

  console.log({
    currentPath,
    currentFolderPath,
    metaUrl: import.meta.url,
    currentFolderPath,
    reservationsJSONPath,
  });

  console.log(reservationsDataRead);

  res.send(reservationsDataRead);
});

reservationsRouter.get("/:id", (req, res) => {});

reservationsRouter.post("/", (req, res) => {
  console.log(req.body);
  const newUser = { ...req.body, _id: uniqid(), createdAt: new Date() };
  res.send(newUser);

  //  changing the file
  reservationsDataRead.push(newUser);
  console.log(reservationsDataRead);
  // writing the file back
  fs.writeFileSync(reservationsJSONPath, JSON.stringify(reservationsDataRead));
});

reservationsRouter.put("/:id", (req, res) => {});

reservationsRouter.delete("/:id", (req, res) => {});

export { userRouter, reservationsRouter };
