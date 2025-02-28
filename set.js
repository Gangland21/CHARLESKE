
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0ZKc1EzOTNrVUxNWWx1MGZyMU9Fdi8yMXZwTmRDelJyelFMZm0zejNtWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQi9KM2lxMnlIcW9UQWNMRWZHdVZFdlZKazk5dGQvVXZPVUloNUJ2bWVqTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5SFM4QTR3ZVdCZXFVLy8wUEsvbHZxaFNLa2pydGVVUkNNNER3Y2FwS2xrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5TGl3bzgzR1FzVVQ5c083aHM3UkJzMU95eXlWM001cUdsTVpXb2ZpTlV3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtQVnlTSzFEdXB1R2pjN2JYcjBwcEZOazNhanlPL2NTcjBWNzZMSUlSSGs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVBM05yaW5QcGEzRHRXWFpQUEVJUVJvVkJUK1piRVlVa1FEb3NscXlkd0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU9PZk1EV0VmbUdxcjFvd1pzVDdDclY2Z083Nm56Nnkrb0JFSlpaazAwRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNzBwN2l1N0ZkOFlXMkNyZUliUXVNdnI5R3dybWVVaGl2VTFwUjcycE55dz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjIxcnFwTzdTeFVKdEErMUlIay9sZ3dEUXRoZHowYXk2VUhLNHpTWjFpTUdiRVF5Rkk0YjRkdWFKQU94Rkt5ZG0rQUtzTDFya0x1VnNjcmtJMG9rTmpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA0LCJhZHZTZWNyZXRLZXkiOiJFRG9HQTA4ZmpzcUVTV1VVTVFFdHhTTVBZdjRwdENYNUxENkxYUFpPdE80PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJydUVwZjMyRVJGdUhQZm4tX2Zta2lnIiwicGhvbmVJZCI6ImNlNjI4OWQzLWI1NGItNDg5ZS1iZGUzLTg5YjdkNGI2MGM3OCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkdFR5Y3JuRnFZUzZlNDVmeWRnZThnVWU0dlk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOGhYQkVmM3FYeXlubzJkSnVFWHl3VTJaT3VFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRHNlMyMUpaIiwibWUiOnsiaWQiOiIyNjA3NzE3OTgxMjg6N0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTEg5OVRBUXJQcUR2Z1lZQlNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUGZkZU93MkhCWG9wZEVSdVdKWmsyVWR6czArYldLMkkyYnp3RXNJZGhBaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSGZCMlhhL2R3MkhiUzE2RkxHMUIzbXV0Qi80WmRHaXB5Y1ZzdkNUbktlbmtoS0JyTUhPZDRTMFBxNnFLem90NC9QeWk1ZjN5MUJSSDZPdGxJSzFnQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6IlUrdmliMGkyWVNhT1d0MEloWlJiT2lIRkpBN1RDaTVTMituVWVINzBOZk9odUtzY2VEeWdLK0VEOGxUYVh5d0pkUUNKZTZZTTJaR0FhSEhGaEhic2pBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYwNzcxNzk4MTI4OjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVDMzWGpzTmh3VjZLWFJFYmxpV1pObEhjN05QbTFpdGlObTg4QkxDSFlRSiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MDcwMDk4NiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMWkcifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
