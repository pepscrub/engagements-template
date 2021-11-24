import express from 'express';
import db from '../db/index.js'
import faker from 'faker'
import { error, validate } from '../helpers.js';
const { datatype } = faker;
const router = express.Router();

// GETTING DATA

router.get('/', (req,res)=>{
    res.json(db.employees);
})

router.get('/:id', (req, res, next)=>{
    try{
        const {id} = req.params;
        const vId = validate(id, "id");
        if(vId) return vId;
        const response = db.employees.find((user)=> user.id === id.trim());
        if(!response) return next(error(`No employee with that ID`))
        res.json(response)
    }catch(e)
    {
        next(e);
    }
})

router.get('/:id/engagements', (req, res, next)=>{
    try{
        const {id} = req.params;
        const vId = validate(id, "id");
        if(vId) return vId;
        const response = db.engagements.filter(i=>i['employee'].id === id)
        if(!response) return next(error(`No employee with that ID`))
        res.json(response)
    }catch(e)
    {
        next(e);
    }
})

// Adding new employee
router.post('/', (req,res,next)=>{
    try{
        const { name } = req.body;

        const vName = validate(name, "name");
        if(vName) return next(vName)
        
        db.employees.push({
            ...db.employees,
            id: datatype.uuid,
            name: name
        })

        db.update = true;
        res.json(db.employees);
    }catch(e)
    {
        next(e);
    }
})

// Updating existing employee
router.put('/:id', (req, res, next)=>{
    try{
        const {id} = req.params;
        const { name } = req.body;
        const vId = validate(id, "id");
        const vName = validate(name, "name");

        if(vId) return next(vId)
        if(vName) return next(vName)

        db.employees.map((employee)=>{
            if(employee.id === id) employee.name = name;
            return employee;
        })
        
        db.update = true;
        res.json(db.employees)
    }catch(e)
    {
        next(e);
    }
})

router.patch('/:id', (req, res, next)=>{
    try{
        const {id} = req.params;
        const { name } = req.body;
        const vId = validate(id, "id");
        const vName = validate(name, "name");

        if(vId) return next(vId)
        if(vName) return next(vName)

        db.employees.map((employee)=>{
            if(employee.id === id) employee.name = name;
            return employee;
        })

        db.update = true;
        res.json(db.employees)
    }catch(e)
    {
        next(e);
    }
})

router.delete('/:id', (req, res, next)=>{
    try{
        const {id} = req.params;
        
        const vId = validate(id, "id");
        if(vId) return next(vId)

        const index = db.employees.map(x=>x.id).indexOf(id);
        db.employees.splice(index, 1);
        db.update = true;
        res.json(db.employees)
    }catch(e)
    {
        next(e);
    }
})



export default router;