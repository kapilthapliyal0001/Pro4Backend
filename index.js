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

  const userJsonFile = fs.readFileSync(userJSONPath);
  const userDataRead = JSON.parse(userJsonFile.toString());
  console.log(userDataRead);

  res.send(userDataRead);
});

userRouter.get("/:id", (req, res) => {});

userRouter.post("/", (req, res) => {
  console.log(req.body);
  const newUser = { ...req.body, _id: uniqid(), createdAt: new Date() };
  res.send(newUser);
  //   reading the file
  const userJsonFile = fs.readFileSync(userJSONPath);
  const userDataRead = JSON.parse(userJsonFile.toString());
  //  changing the file
  userDataRead.push(newUser);
  console.log(userDataRead);
  // writing the file back
  fs.writeFileSync(userJSONPath, JSON.stringify(userDataRead));
});

userRouter.put("/:id", (req, res) => {});

userRouter.delete("/:id", (req, res) => {});

// Book router

bookRouter.get("/", (req, res) => {});

bookRouter.get("/:id", (req, res) => {});

bookRouter.post("/", (req, res) => {});

bookRouter.put("/:id", (req, res) => {});

bookRouter.delete("/:id", (req, res) => {});

export { userRouter, bookRouter };
