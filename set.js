
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUxVSFdzT0hycW1Nb2lzWnRYRUprYXJhNWc5TXRBVHM0bno1ekFCWFltWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieDdySU94OHRXcnN1RERvN0Q1MGJ5RmpiSTltWCsyd1hEdHRxTGtWVEpCcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZRkZPd1RKSS9yeE9EcitBK2EyVE1pejgzYmUrS1d4OUNYdDZPU3IzTG5ZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYRjUrU0dZamRXbE0wZjBKZGd1ZkhVOW5GdHJKYklnaHNYMzREYTFFTWtnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9EZEFpN09kQ3BrK3hzelRsWG82QWcyb3NsK2ZkYlVrdlh4RjM0U05mVlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFKNG9ROXh3akpTeUdaMEIxRjVTVFM4S29taGdGMmpKa3ZkdTN5elVoMUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNks1L092WllLaTM1NEpJckhlRnhqVzR4ZXAzcUREU3RQU1prSzdtQ25WQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT2xadi9oVnY2M2JzRUNiWndKeXZxYUNySzIvMzNoa3dQQ3NJK0E3WC9Fbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdaZnJOc05vQ3NxYmlhSlNMNGlxMzJPMnhDTnBsY1p4OW83djNSckpPQ2gzREtmaEJqTDMyVjYvRENMajJSVks4MFBLMHVjbU14VXZhL2ZwTXM4d0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM3LCJhZHZTZWNyZXRLZXkiOiJuTmszVXlIaXNxa0w4ZE1oc2x3amQ5YUJGQlowNVRNMUNBaVBQdHpaK3E0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJHczVIUVRlN1FwQ2FLcWkteEpKSHFRIiwicGhvbmVJZCI6IjY0MjU1NzAxLTU1YzktNDdjNi05MGM3LTkzYmE2NDQxMmViYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyRzRhSFFpNnFvdi9oenB2bzR0ZFVwN1NyRVE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWDNVYm9hL2ltaFVwSG1peHNWZ3l1ek9xZ0NrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlpDVDFTNzQzIiwibWUiOnsiaWQiOiIyNjA3NzE3OTgxMjg6MTRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xMOTlUQVF6dStWdmdZWUJDQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlBmZGVPdzJIQlhvcGRFUnVXSlprMlVkenMwK2JXSzJJMmJ6d0VzSWRoQWs9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlZvb2h1SVVrcU14WDA1bGR4QjhVRU8ya0ZTVllkay9oVGdDV0VUbGNhVTgwMTh5dEVvZld6QWRkQnBRK3lqbHhLT0pGdXorUUhLMTI2ckZSWEUvWENRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJabmNRNU15MjBsWG03QjNqcHRSNDFSRDNISFQvWmhoaHBWMFptRFpOV3lJZXQwRFFiVjBSME9MSnJUTk9GRER2WUduR1NHcnAwVXZ0cnRYK1dtMGFEUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MDc3MTc5ODEyODoxNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUMzNYanNOaHdWNktYUkVibGlXWk5sSGM3TlBtMWl0aU5tODhCTENIWVFKIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQwOTk0NTI0fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Mc Cyrus",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "260771798128",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
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
