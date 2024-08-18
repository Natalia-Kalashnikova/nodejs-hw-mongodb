// export const notFoundHandler = (req, res) => {
//   res.status(404).send('Not found!');
// };


import createHttpError from 'http-errors';

export const notFoundHandler = (req, res, next) => {
  next(createHttpError(404, 'Not found!'));
};


