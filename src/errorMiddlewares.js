/** @format */

export const errorMiddleware = (err, req, res, next) => {
  //   console.log(err);
  if (res.status === 500) {
    res.status(500).send("Generic Server Error");
  } else {
    next(err);
  }
};

export const notFoundMiddleware = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send(err);
  } else {
    next(err);
  }
};

export const badRequestMiddleware = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send(err.errorList.errors); // can ber err.errorList
  } else {
    next(err);
  }
};
