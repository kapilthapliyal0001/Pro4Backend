/** @format */

import express from "express";

const userRouter = express.Router();
const bookRouter = express.Router();

// User router

userRouter.get("/", (req, res) => {
  console.log("url is : -> ", req.url);
  res.send("This is the response");
});

userRouter.get("/:id", (req, res) => {});

userRouter.post("/", (req, res) => {});

userRouter.put("/:id", (req, res) => {});

userRouter.delete("/:id", (req, res) => {});

// Book router

bookRouter.get("/", (req, res) => {});

bookRouter.get("/:id", (req, res) => {});

bookRouter.post("/", (req, res) => {});

bookRouter.put("/:id", (req, res) => {});

bookRouter.delete("/:id", (req, res) => {});

export { userRouter, bookRouter };
