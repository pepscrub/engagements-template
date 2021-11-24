import express from 'express';
import db from '../db/index.js'
import { validate, error } from '../helpers.js';
const router = express.Router();

// GETTING DATA

router.get('/', (req,res)=>{
    res.json(db.engagements);
})

router.get('/:id', (req,res)=>{
    const {id} = req.params;
    const response = db.engagements.find((eng)=> eng.id === id.trim());
    res.json(response)
})

router.post('/', (req, res, next)=>{
    const {
        name,
        client,
        employee,
        description,
        start,
    } = req.body;


    if(!client) return next(error(`No client supplied. Expected something like:\n ${JSON.stringify(db.clients[0])}`))
    if(!employee) return next(error(`No employee supplied. Expected something like:\n ${JSON.stringify(db.employees[0])}`))

    const vName = validate(name)
    const vClients = db.clients.filter(c=>c.id === client.id);
    const vEmployees = db.employees.filter(e=>e.id === employee.id);
    const vDescription = !/[a-zA-Z_0-9\[\],.\/\`!@#$%^&*()_+-=\s]/gmi.test(description)
    const started = start ? new Date(start).getTime() : null;

    if(vName) return next(vName);
    if(vClients.length <= 0) return next(error("Client does not exist"));
    if(vEmployees.length <= 0) return next(error("Employee does not exist"));
    if(vDescription) return next(error("Invalid chars in description"));

    db.engagements.push({
        name: name,
        client: vClients[0], // Filter returns the object in an array
        employee: vEmployees[0], // Filter returns the object in an array
        description: description,
        start: started,
        end: null,
    })

    db.update = true;
    res.json(db.engagements)
})

router.put('/:id', (req, res, next)=>{
    const { id } = req.params;
    const {name, description, ended, start} = req.body

    const vName = validate(name)
    const vDescription = !/[a-zA-Z_0-9\[\],.\/\`!@#$%^&*()_+-= ]/gmi.test(description);
    const end = ended ? new Date(ended).getTime() : null;

    if(vName) return next(vName);
    if(vDescription) return next(error("Invalid chars in description"));

    db.engagements.map((eng)=>{
        if(eng.id === id)
        {
            eng.name = name || eng.name;
            eng.description = description || eng.description;
            eng.start = start || eng.start;
            eng.end = end || eng.end;
        }
        return eng;
    })
    db.update = true;
    res.json(db.engagements);
})

router.delete('/:id', (req, res, next)=>{
    const { id } = req.params;

    const vId = validate(id, "id");
    if(vId) return next(vId)

    const index = db.engagements.map(x=>x.id).indexOf(id);
    db.engagements.splice(index, 1);
    db.update = true;
    res.json(db.engagements)
})



export default router;