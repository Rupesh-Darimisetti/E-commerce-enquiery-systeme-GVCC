const express = require('express');
const { initalDBSetup } = require('./db/db');
import enquiryRouter from './routes/enquires';
import productRouter from './routes/products';
import userRouter from './routes/user';

const app = express();

app.use(express.json());

initalDBSetup()
app.use('/api/products', productRouter);
app.use('/api/enquire', enquiryRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => res.send("API running..."))

app.listen(process.env.PORT || 3001);