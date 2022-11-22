/** @format */

import express from "express";
import { userRouter, reservationsRouter, movieRouter } from "../index.js";
import {
  errorMiddleware,
  notFoundMiddleware,
  badRequestMiddleware,
} from "./errorMiddlewares.js";
import cors from "cors";
// import bookRouter from "../index.js";
import listEndpoints from "express-list-endpoints";

const server = express();
const port = 3001;

// ************ Middleware *****************
const loggerMiddleware = (req, res, next) => {
  console.log(
    `LOGGER MIDDLEWARE 1 Request : ->  ${req.method}  ${
      req.url
    } --- ${new Date()}`
  );
  next();
};

const loggerMiddleware2 = (req, res, next) => {
  console.log(
    `LOGGER MIDDLEWARE 2 Request : ->  ${req.method}  ${
      req.url
    } --- ${new Date()} for the movie middleware`
  );
  next();
};

// All are Global Middleware

server.use(cors());
server.use(loggerMiddleware);
server.use(express.json());

//**** Endpoints ******

server.use("/users", userRouter);
server.use("/reservations", reservationsRouter);
server.use("/movies", loggerMiddleware2, movieRouter); // the logger middleware should come in between

// Error Middleware
server.use(errorMiddleware);
server.use(notFoundMiddleware);
server.use(badRequestMiddleware);

// showing the list end points table
console.table(listEndpoints(server));

// Check the basic function of the wire here:
server.listen(port, () => {
  console.log("Your server is running on port " + port);
});
// server link : http://localhost:3001/
