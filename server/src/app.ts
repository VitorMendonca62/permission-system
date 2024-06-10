import express from 'express';
import routes from './routes';
import prisma from './prisma/client';
import cors from 'cors';

const App = express();

prisma.$connect().then(() => console.log('Database is running'));

// Accept JSONs
App.use(express.urlencoded({ extended: true }));
App.use(express.json());

// CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type,Authorization',
};
App.use(cors(corsOptions));


App.use(routes);

export { App, prisma };
