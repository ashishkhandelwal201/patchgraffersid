import {winston , path , dirname , fileURLToPath , moment} from '../utils/import.js'
const __dirname = dirname(fileURLToPath(import.meta.url));

const logDir = path.join(__dirname , '../tests')
// configuring moment here , If using in multiple places configure it in middleware folder

const logger = winston.createLogger({
    level: 'info',
    format : winston.format.combine(
        winston.format.json()
    ),
    transports : [        
        new winston.transports.File({filename : path.join(logDir,'graffersidInfo.log'),level:'info'}),
        new winston.transports.File({filename : path.join(logDir,'graffersiderror.log'),level:'error'})
    ]
}) 
export default logger