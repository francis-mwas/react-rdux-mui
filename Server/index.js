import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import config from './config.js';

// define routes
import studentRoutes from './routes/StudentRoutes';
import subjectRoutes from './routes/SubjectRoutes';

const port = config.service.port || 4000;

// Set up the express app
const app = express();
// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
// Require our routes into the application.
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/subjects', subjectRoutes);

// handle undefined routes, if the route is not available, return the message below
app.get('*', (req, res) =>
  res.status(404).send({
    message: 'Welcome to the beginning of nothingness.',
  })
);

// Server listening to port
if (process.env.NODE_ENV !== 'test') {
  app
    .listen(port, () => {
      console.log(`App running on port ${port}`);
    })
    .on('error', (err) => {
      console.log(`There was an error with the app at port ${port}: `, err);
    });
}

export default app;
