const error = (message) => new Error(message);
const validate = (input, type) =>
{
    const checkName = (name) =>{
        if(!name) return error("No name supplied use JSON headers");
        if(name.length < 2 || name.length > 30) return error("Invalid name length");
        if(!/\w/.test(name)) return error(`"Name was non-alphanumeric`);
    }
    switch(type)
    {
        case "id":
            if(!input) return error("No name supplied use JSON headers");
            // URI encoding spits out UUID without stripped '-'s so this should be fine
            if(!/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/.test(input)) return error('Invalid UUID')
        break;
        case "name":
            checkName(input)
        break;
        case "body":
            if(!input) return next(error("No name updates body supplied. {updates: { name: \"new name\"}}"));
            if(!input.length <= 0) return next(error("No data found in 'updates'. Usage: {updates: { name: \"new name\"}}"))
        break;
        default: return false;
    }
    return false; // error's return true since it's not null or undefined
}

export {
    error, validate
}