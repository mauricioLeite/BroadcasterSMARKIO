
# BroadcasterSMARKIO
Talker using IBM Watson Text to Speech.

### Downloading and running
1 - Cloning repository:
```git clone https://github.com/mauricioLeite/BroadcasterSMARKIO.git```

2 - Run ```npm install``` to download dependencies.

3 - In folder **models** run ```node createDB.js``` and after  create DB press ctrl+C, repeat to ```node createEntries.js```, this process create database and populate.
_**Warning**_: Check your DB infos in db.js and createDB.js if you have any issue.

4 - Return to previous folder and to start server run ```node server.js``` or ```nodemon server.js``` in development.

5 - The server will run in http://localhost:3000/comments.

### Future possible update
-  Configure migration to Database.

### My setup

- MySQL (LAMPP):  Ver 15.1 Distrib 10.4.10-MariaDB, for Linux (x86_64)
- OS: Arch Linux 5.3.10
- NodeJS: V12.13.0
- npm: 6.13.0

### Used npm packages

- body-parser
- express
- express-handlebars
- mysql2
- path
- sequelize
- nodemon
- ibm-watson