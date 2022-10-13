/** @format */

import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import createError from "http-errors";
import { userValidation } from "./src/validation.js";
import { validationResult } from "express-validator";

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

// files from the fs-async folder
import {
  getUsers,
  getMovies,
  getReservations,
  writeUsers,
  writeMovies,
  writeReservations,
} from "./src/lib/fs-tools.js";

// Reading the  user file
// const userJsonFile = fs.readFileSync(userJSONPath);
// const userDataRead = JSON.parse(userJsonFile.toString());
// Reading the reservations file
// const reservationsJsonFile = fs.readFileSync(reservationsJSONPath);
// const reservationsDataRead = JSON.parse(reservationsJsonFile.toString());
// Reading the movie file
// const movieJsonFile = fs.readFileSync(MovieJSONPath);
// const movieDataRead = JSON.parse(movieJsonFile.toString());

// User router paths
//  need to chekc theh rout efor the nec vlvertl check it rihg ton ow
userRouter.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();
    console.log("url is : -> ", req.url);
    if (req.query && req.query.gender) {
      const newUserData = users.filter(
        (user) =>
          user.hasOwnProperty("gender") && user.gender === req.query.gender
      );
      console.log(newUserData);
      res.send(newUserData);
    }
    res.send(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:id", (req, res, next) => {
  // finding the user
  try {
    const user = getUsers.find((u) => u._id === req.params.id);
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

// error in post
// userRouter.post("/", userValidation, async (req, res, next) => {
//   const error = validationResult(req); // is the list of errors coming from the user validation coming from the uservalidation middleware
//   if (error.isEmpty()) {
//     try {
//       console.log(req.body);
//       const users = await getUsers();
//       const newUser = { ...req.body, _id: uniqid(), createdAt: new Date() };
//       console.log(newUser);
//       await writeUsers(userJSONPath, newUser);
//       res.send(newUser);

//       //  changing the file
//       console.log(users);
//       // writing the file back
//       await writeUsers(getUsers);
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     console.log("Here are the errors : ", error);
//     next(createError(400, { errorList: error }));
//   }
// });

userRouter.put("/:id", (req, res, next) => {
  try {
    const newUsers = getUsers.filter((u) => u._id !== req.params.id);
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
    const newUsers = getUsers.filter((u) => u._id !== req.params.id);
    fs.writeFileSync(userJSONPath, JSON.stringify(newUsers));
    res.send("Deleted the user: ", req.params.id);
  } catch (error) {
    next(error);
  }
});

// Reservation router paths

reservationsRouter.get("/", async (req, res, next) => {
  try {
    const reservations = await getReservations();
    res.send(reservations);
  } catch (error) {
    next(error);
  }
});

reservationsRouter.get("/:id", async (req, res) => {
  try {
    const reservations = await getReservations();
    const reserve = reservations.find((u) => u._id === req.params.id);
    res.send(reserve);
  } catch (error) {
    next(error);
  }
});

// PROBLEM while writing the data
// reservationsRouter.post("/", async (req, res, next) => {
//   try {
//     const reservations = await getReservations();
//     const newUser = { ...req.body, _id: uniqid(), createdAt: new Date() };
//     //  changing the file
//     reservations.push(newUser);
//     // writing the file back
//     await writeReservations(reservationsJSONPath, reservations);
//     res.send(newUser);
//   } catch (error) {
//     next(error);
//   }
// });

// issues with PUT
// reservationsRouter.put("/:id", (req, res) => {
//   const newReserve = reservationsDataRead.filter(
//     (u) => u._id !== req.params.id
//   );
//   const changeReserve = {
//     ...req.body,
//     _id: req.params.id,
//     createdAt: new Date(),
//   };
//   newReserve.push(changeReserve);
//   //   Place back
//   fs.writeFileSync(reservationsJSONPath, JSON.stringify(newReserve));
//   res.send("Updated!!");
// });

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

  //  changing the file
  movieDataRead.push(newUser);
  console.log(movieDataRead);
  // writing the file back
  fs.writeFileSync(MovieJSONPath, JSON.stringify(movieDataRead));
  res.send(newUser);
});
export { userRouter, reservationsRouter, movieRouter };
