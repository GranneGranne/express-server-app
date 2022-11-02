
const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
})
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

const lisääTentti = async() => {
  let nimi = 'maantieto'
  let kuvaus = 'missä mennään'
  let alkuPvm = '2022-12-5'
  let voimassa = false

  try {
    const res = await pool.query(
      'INSERT INTO T_tentti(nimi, kuvaus, alku_pvm, voimassa) VALUES('${nimi}', '${kuvaus}', '${alkupvm}', '{voimassa}')')
    console.log("lisättiin tentti ", res.rows[0])
  } catch (err) {
    console.log("tenttiä lisätessä tapahtui virhe, ", err.stack)
  }

}

const muutaNimi = async() => {


  try {
    const res = await pool.query(
      'UPDATE T_tentti SET kuvaus = 'mikä maa mikä valuutta' WHERE nimi = 'maantieto'')
    console.log("muutettiin kuvaus ", res.rows[0])
  } catch (err) {
    console.log("kuvaussta muutettaessa tapahtui virhe, ", err.stack)
  }
}

const haeKaikki = async() => {

  try {
    const res = await pool.query(
      'SELECT * FROM T_tentti')
    console.log(res.rows[0])
  } catch (err) {
    console.log("taulun rivejä hakiessa tapahtui virhe, ", err.stack)
  }
}

const haeVoimassa = async() => {

  try {
    const res = await pool.query(
      'SELECT * FROM T_tentti WHERE voimassa = TRUE')
    console.log(res.rows[0])
  } catch (err) {
    console.log("taulun rivejä hakiessa tapahtui virhe, ", err.stack)
  }
}