/** @format */

import fs from "fs-extra";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const { readJSON, writeJSON } = fs;

const userJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/user.json"
);
const MovieJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/movie.json"
);
const ReservationJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/reservations.json"
);

// Read files
export const getUsers = () => readJSON(userJSONPath);
export const getMovies = () => readJSON(MovieJSONPath);
export const getReservations = () => readJSON(ReservationJSONPath);

// write files
export const writeUsers = (content) => writeJSON(userJSONPath, content);
export const writeMovies = (content) => writeJSON(MovieJSONPath, content);
export const writeReservations = (content) =>
  writeJSON(ReservationJSONPath, content);
