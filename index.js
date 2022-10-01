/** @format */

import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import createError from "http-errors";

// Routes
const userRouter = express.Router();
const reservationsRouter = express.Router();
const movieRouter = express.Router();

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
const MovieJSONPath = join(currentFolderPath, "src", "data", "Movie.json");

// Reading the  user file
const userJsonFile = fs.readFileSync(userJSONPath);
const userDataRead = JSON.parse(userJsonFile.toString());
// Reading the reservations file
const reservationsJsonFile = fs.readFileSync(reservationsJSONPath);
const reservationsDataRead = JSON.parse(reservationsJsonFile.toString());
// Reading the movie file
const movieJsonFile = fs.readFileSync(MovieJSONPath);
const movieDataRead = JSON.parse(movieJsonFile.toString());

// User router paths

userRouter.get("/", (req, res, next) => {
  try {
    console.log("url is : -> ", req.url);
    if (req.query && req.query.gender) {
      const newUserData = userDataRead.filter(
        (user) =>
          user.hasOwnProperty("gender") && user.gender === req.query.gender
      );
      // console.log(newUserData);
      res.send(newUserData);
    }
    res.send(userDataRead);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:id", (req, res, next) => {
  // finding the user
  try {
    const user = userDataRead.find((u) => u._id === req.params.id);
    if (user) {
      res.send(user);
    } else {
      // can also be done like this
      //const  error = new Error("not found")
      //error.status = 404
      // next(error)
      next(createError(404, `The user ${req.params.id} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = { ...req.body, _id: uniqid(), createdAt: new Date() };
    res.send(newUser);

    //  changing the file
    userDataRead.push(newUser);
    console.log(userDataRead);
    // writing the file back
    fs.writeFileSync(userJSONPath, JSON.stringify(userDataRead));
  } catch (error) {
    next(error);
  }
});

userRouter.put("/:id", (req, res, next) => {
  try {
    const newUsers = userDataRead.filter((u) => u._id !== req.params.id);
    const changeUser = {
      ...req.body,
      _id: req.params.id,
      createdAt: new Date(),
    };
    newUsers.push(changeUser);
    //   Place back
    fs.writeFileSync(userJSONPath, JSON.stringify(newUsers));
    res.send("Updated!!");
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/:id", (req, res, next) => {
  try {
    const newUsers = userDataRead.filter((u) => u._id !== req.params.id);
    fs.writeFileSync(userJSONPath, JSON.stringify(newUsers));
    res.send("Deleted the user: ", req.params.id);
  } catch (error) {
    next(error);
  }
});

// Reservation router paths

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

reservationsRouter.get("/:id", (req, res) => {
  const reserve = reservationsDataRead.find((u) => u._id === req.params.id);
  res.send(reserve);
});

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

reservationsRouter.put("/:id", (req, res) => {
  const newReserve = reservationsDataRead.filter(
    (u) => u._id !== req.params.id
  );
  const changeReserve = {
    ...req.body,
    _id: req.params.id,
    createdAt: new Date(),
  };
  newReserve.push(changeReserve);
  //   Place back
  fs.writeFileSync(reservationsJSONPath, JSON.stringify(newReserve));
  res.send("Updated!!");
});

reservationsRouter.delete("/:id", (req, res) => {
  const newReserve = reservationsDataRead.filter(
    (u) => u._id !== req.params.id
  );
  fs.writeFileSync(reservationsJSONPath, JSON.stringify(newReserve));
  res.send("Deleted the Reservation: ", req.params.id);
});

// Movie route paths

// All movies get route
movieRouter.get("/", (req, res) => {
  console.log("url is : -> ", req.url);

  // console.log({
  //   currentPath,
  //   currentFolderPath,
  //   metaUrl: import.meta.url,
  //   currentFolderPath,
  //   MovieJSONPath,
  // });

  // console.log(movieDataRead);

  res.send(movieDataRead);
});

// get movie by id
movieRouter.get("/:name", (req, res) => {
  // finding the user
  const movie = movieDataRead.find((u) => u.name === req.params.name);
  res.send(movie);

  console.log("The movies: ", movieDataRead);
  console.log("The movie is: ", movie);
});

// post method movie route
movieRouter.post("/", (req, res) => {
  console.log(req.body);
  const newUser = { ...req.body, _id: uniqid(), createdAt: new Date() };
  res.send(newUser);

  //  changing the file
  movieDataRead.push(newUser);
  console.log(movieDataRead);
  // writing the file back
  fs.writeFileSync(MovieJSONPath, JSON.stringify(movieDataRead));
});
export { userRouter, reservationsRouter, movieRouter };
