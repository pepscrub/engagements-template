import { v4 } from 'uuid'
import db from '../db/index.js';
import color from 'chalk';
const sockets = new Map();
// Update with internal sockets at a later date.
// not really a big fan of short polling a websocket
setInterval(()=>{
    if(db.update)
    {
        console.log(color.yellow.bold(`[WebSocket]`), `Sent out update JSON`);
        db.update = false;
        [...sockets.keys()].map(socket=>{
            socket.send(JSON.stringify({
                type: "DB update",
                data: db
            }));
        })
    }
},500)

export default (ws, req) =>{
    const id = v4();
    const metadata = { id }
    sockets.set(ws, metadata);
    ws.on('delete', ()=>{
        sockets.delete(ws);
    })
}