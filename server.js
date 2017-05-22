import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import Post from './models/models';
import { postcreate, getPhotos, getPic, deletePic} from './log/logic';

const app = express();
const port = process.env.PORT || 4000;

const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }},
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }}
};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://smash:smash@ds133311.mlab.com:33311/smashgram', options)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection.error: '));

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET, POST, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.route('/gram')
  .post(postcreate)
  .get(getPhotos)

app.route('/gram/:id')
  .get(getPic)
  .delete(deletePic)

app.listen(port);
console.log(`app running on port ${port}`);
