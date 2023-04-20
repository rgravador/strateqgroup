import express, { Express, Request, Response } from 'express';
import { addData, deleteData, getData, updateData } from './db';
import cors from 'cors';

const app: Express = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.get('/invoices', async (req: Request, res: Response) => {
    const invoices = await getData().sort(function (a: any, b: any) { return parseInt(a.InvoiceNo) - parseInt(b.InvoiceNo) })
    console.log("🚀 ~ file: index.ts:16 ~ app.get ~ invoices:", invoices)
    return res.json({ error: false, data: invoices, message: 'ok' });
});

app.delete('/invoices/:id', async (req: Request, res: Response) => {
    const invoices = await deleteData(req.params.id)
    console.log("🚀 ~ file: index.ts:22 ~ app.delete ~ invoices:", invoices)
    return res.json({ error: false, data: invoices, message: 'ok' });
});

app.put('/invoices', async (req: Request, res: Response) => {
    const invoices = await updateData(req.body)
    console.log("🚀 ~ file: index.ts:28 ~ app.put ~ invoices:", invoices)
    return res.json({ error: false, data: invoices, message: 'ok' });
});

app.post('/invoices', async (req: Request, res: Response) => {
    const invoices = await addData(req.body)
    console.log("🚀 ~ file: index.ts:28 ~ app.put ~ invoices:", invoices)
    return res.json({ error: false, data: invoices, message: 'ok' });
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});