import express, { NextFunction, Request, Response } from 'express';
import { updateImage } from './image.processing';

const app = express();
const port = process.env.Port || 3000;
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log('image resizing api called');
  next();
};

app.get('/api/update-image', logger, updateImage);

app.use('/*', (req, res) => {
  res.status(404).send('pages not found');
});

app.listen(port, () =>
  console.log(`App listening on port http://localhost:${port} !`)
);

export default app;
