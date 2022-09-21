/** @format */

import express from "express";
import { userRouter, reservationsRouter } from "../index.js";
import cors from "cors";
// import bookRouter from "../index.js";
import listEndpoints from "express-list-endpoints";

const server = express();
const port = 3001;

server.use(cors());
server.use(express.json());

//**** Endpoints ******

server.use("/users", userRouter);
server.use("/reservations", reservationsRouter);

// showing the list end points table
console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("Your server is running on port " + port);
});
// server link : http://localhost:3001/
