const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

// Define el formato de los logs
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

// Define la ruta del archivo de logs
const logDirectory = path.join(__dirname, '../logs');
const logFilePattern = 'application-%DATE%.log';

// Crea el logger
const logger = createLogger({
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(logDirectory, logFilePattern),
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m', 
            maxFiles: '14d'
        })
    ]
});

module.exports = logger;