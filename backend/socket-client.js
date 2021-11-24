import env from 'dotenv';
import color from 'chalk';
env.config();
import ws from 'ws';
const client = new ws('ws://localhost:8080/api/v1/websocket');

client.on('open', ()=>{
    client.send("foo")
})

client.on('message', (msg)=>{
    const msgString = msg.toString();
    const msgJSON = JSON.parse(msgString)
    console.log(msgJSON)
})