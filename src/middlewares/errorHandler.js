import {isHttpError} from "http-errors";
import { MongooseError } from "mongoose";


export const errorHandler = (error, req, res, next) => {
  if (isHttpError(error)) {
    return res.status(error.status).json({
    status: error.status,
    message: error.message,
    errors: error.errors || [],
  });
  }

  if (error instanceof MongooseError) {
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      data: {
        message: error.message,
      },
    });
  }

  res.status(500).json({
    status: 500,
    message: "Internal server error",
    data: {
      message: error.message,
    }
  });
};

