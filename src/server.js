import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { getAllContacts, getContactById } from './services/contacts.js';

export const setupServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.get('/contacts', async (req, res) => {
    const students = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: students,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const id = req.params.contactId;
    const student = await getContactById(id);

    if (!student) {
      return res.status(404).json({
        status: 404,
        message: `Contact with id ${id} not found!`,
      });
    }

    res.json({
      status: 200,
      message: `Successfully get contact with id ${id}!`,
      data: student,
    });
  });

  app.use(notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
};

