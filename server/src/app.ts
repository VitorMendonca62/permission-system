import express from 'express';
import routes from './routes';
import prisma from './prisma/client';
import cors from 'cors';
import sheets from "./sheets"
import doc from './sheets';

const App = express();

prisma.$connect().then(() => console.log('Database is running'));

// Sheets
doc

// Accept JSONs
App.use(express.urlencoded({ extended: true }));
App.use(express.json());

// CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type,Authorization, userId',
};
App.use(cors(corsOptions));


App.use(routes);

export { App, prisma };
