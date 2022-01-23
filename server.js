const PORTA = process.env.PORT || 8080;
const express = require('express');
const app = express();
const https = require('https')
const fs = require('fs')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.json()); // Faz o parse (validação e interpretação) de solicitações do tipo application/json
app.use(express.urlencoded({ extended: true }));

require('./routes/rotas')(app)

const sslServer = https.createServer({
  key: fs.readFileSync('cert/key.pem'),
  cert:fs.readFileSync('cert/certificate.pem')
}, app)


app.use('/assets', express.static('assets'));
app.use('/views', express.static('views'));

sslServer.listen(PORTA, () => {
  console.log(`O servidor está a ouvir na porta ${PORTA}`)
})

app.use(express.static('public'))
