import express, { json, } from "express";
import responseTime from "response-time";
import { config, } from "dotenv";
import path from "path";
import http from "http";
import { Server, } from "socket.io";
import cors from "cors";

config({ 'path': path.join(__dirname, '../.env'), });

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(cors({
    'credentials': true,
    'origin': process.env.ORIGINS.split(','),
}))
app.use(json());
app.use(responseTime());

app.use('/up', (request, response) => {
    response.status(200).send({
        'internal_port': process.env.PORT,
        'request_content': {
            'path': request.path,
            'headers': request.headers,
            'body': request.body,
        },
        'lucky_number': Math.random(),
    });
});

app.listen(process.env.PORT, () => {
    console.log(`The server is up on port ${process.env.PORT}`);
});