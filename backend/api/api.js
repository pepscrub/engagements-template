import express from 'express';
import clients from './clients.js';
import employees from './employees.js';
import engagements from './engagements.js';
import expressWs from 'express-ws';
import ws from './websockets.js'
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
expressWs(router);

router.get('/', (req,res, next)=>{
    if(process.env.NODE_ENV !== 'development') return next(new Error(`Not found - ${req.originalUrl}`))
    res.json({
        message: 'Do not use this endpoint in production, this is only here to help you find the api endpoints.',
        endpoints: [
            `${req.protocol}://${req.hostname}:${process.env.PORT}/api/v1/clients`,
            `${req.protocol}://${req.hostname}:${process.env.PORT}/api/v1/employees`,
            `${req.protocol}://${req.hostname}:${process.env.PORT}/api/v1/engagements`,
            `${req.protocol}://${req.hostname}:${process.env.PORT}/api/v1/websocket`
        ]
    })
})

router.use('/clients', clients);
router.use('/employees', employees);
router.use('/engagements', engagements);
router.ws('/websocket', ws)




export default router;