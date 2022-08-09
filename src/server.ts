import express from 'express';
// import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index';

const corsOption = {
    optionsSuccessStatus: 200,
};

const app = express();
const port = 3000;

app.use(cors(corsOption));
app.use(express.json());

app.use('/api', routes);
app.get('/api', (_req: express.Request, res: express.Response) => {
    res.json({ message: 'welcome to ahmed raed storeFront api.' });
});
app.get('/', (_req: express.Request, res: express.Response) => {
    res.json({ message: 'welcome to ahmed raed storeFront api.' });
});

app.listen(port, () => {
    console.log(`server is rinning on http://localhost:${port}`);
});

export default app;
