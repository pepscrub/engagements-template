import faker from 'faker';
const {name, company, date, lorem, datatype, internet} = faker;

const min = 3, max = 25;

const rngAmount = () => Math.floor((Math.random()*(max - min))+min);
const rng = () => Math.floor(Math.random()*2);

const employees = [...new Array(rngAmount())].map(()=>({
    id: datatype.uuid(),
    name: name.firstName(),
}))

const clients = [...new Array(rngAmount())].map(()=>({
    id: datatype.uuid(),
    name: company.companyName(),
}));

const engagements = [...new Array(rngAmount())].map(()=>({
    id: datatype.uuid(),
    name: lorem.word(),
    description: rng() ? lorem.paragraph() : null,
    start: new Date(date.past()).getTime(),
    end: rng() ? new Date(date.recent()).getTime() : null,
    employee: employees[Math.floor(Math.random()*employees.length)],
    client: clients[Math.floor(Math.random()*clients.length)]
}));

export default {employees, clients, engagements, update: false}