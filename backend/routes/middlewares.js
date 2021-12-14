import color from 'chalk'
import dotenv from 'dotenv';
dotenv.config();
/**
 * TODO: JWT authentication
 */
function authorization(req,res,next)
{
    const bearer = res.headers['authorization'];
    if(!bearer)
    {
        const BRaw = bearer.split(' ');
        const token = Braw[1];
    
    }
}

function logging(tokens, req, res) {

    const method = () =>{
        const tokenMethod = tokens.method(req, res);
        switch(tokenMethod)
        {
            case 'GET': return color.bold.greenBright(tokenMethod);
            case 'PUT': return color.bold.yellowBright(tokenMethod);
            case 'PATCH': return color.bold.yellowBright(tokenMethod);
            case 'POST': return color.bold.yellowBright(tokenMethod);
            case 'DELETE': return color.bold.redBright(tokenMethod);
            default: return color.bold.grey(tokenMethod);
        }
    }
    
    const status = () =>{
        const tokenStatus = tokens.status(req, res);
        const statusCode = parseInt(tokenStatus);
        switch(true)
        {
            case statusCode >= 200 && statusCode < 300:
            return color.greenBright(tokenStatus)
            case statusCode >= 300 && statusCode < 400:
            return color.cyanBright(tokenStatus)
            case statusCode >= 400 && statusCode < 500:
            if(statusCode === 404) return tokenStatus;
            return color.bold.redBright(tokenStatus)
            case statusCode >= 500 && statusCode < 600:
            return color.bold.redBright(tokenStatus)
            default: return color.gray(tokenStatus);
        }
    }

    return [
        color.bold.blue('[Server]'),
        req.ip,
        method(),
        status(),
        color.underline(tokens.url(req, res)),
        color.bold.yellow(tokens['response-time'](req, res)), 'ms',
        new Date().toLocaleString(),
    ].join(' ');
}

function notFound(req, res, next)
{
    res.status(404);
    const error = new Error(`Not found - ${req.originalUrl}`);
    next(error);
}

function errorHandler(err, req, res, next)
{
    const statusCode = res.statusCode !== 200 ? res.statusCode : 400;
    res.status(statusCode);
    // Some code so we don't spit out error codes
    // in production
    res.json({
        status: "error",
        message: err.message,
        stack: process.env.NODE_ENV !== 'development' ? '🥞' : err.stack
    });
}

export default { logging, notFound, errorHandler }