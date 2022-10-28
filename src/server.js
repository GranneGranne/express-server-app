const fs = require('fs');
const express = require('express')  //Jos ei toimi, niin "npm install express"
const app = express()
const fs = require('fs').promises;
const port = 8080

app.get('/', (req, res) => {
  // tiedon luku asynkronisesti
  const data = fs.readFileSync('./kouludata.json', { encoding: 'utf8', flag: 'r' });
  res.send(data)
  res.send('Dada luettiin')
})
app.post('/', (req, res) => {
  // tiedon kirjoitus asynkronisesti  req.body antanee tarvittavan datan
  fs.writeFileSync('./kouludata', JSON.stringify(reg.body))
  res.send('Dada talletettiin')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})