/** @format */

import express from "express";
import { userRouter, bookRouter } from "../index.js";
// import bookRouter from "../index.js";
import listEndpoints from "express-list-endpoints";

const server = express();
const port = 3001;

//**** Endpoints ******

server.use("/users", userRouter);
server.use("/book", bookRouter);

// showing the list end points table
console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("Your server is running on port " + port);
});
