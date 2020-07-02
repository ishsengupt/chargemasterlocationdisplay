const Pool = require('pg').Pool
const pool = new Pool({
    user:'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432
})

 const getMerchants = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM healthcareLocationEx ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results);
      })
    }) 
  } 

  
  
  const queryMerchants = (searchItem) => {
   //console.log(searchItem)
    return new Promise(function(resolve, reject) {
    //const id = (request.params.id)
     
    pool.query(`SELECT descriptionapp, commentscont, comments17, priceapp, yeardate, hospital, id, cdmapp, rate, revenue, nrv,  average_charge, charge_quantity, inpatientapp, outpatientapp, rev, proc FROM healthcarerevised WHERE hospital LIKE $1 ORDER BY NULLIF(regexp_replace(priceapp, '\\D', '', 'g'), '')::int desc LIMIT 200`, [`%${searchItem}%`], (error, results) => {
      if (error) {
   
        reject(error)
      }
      resolve(results.rows)
    })
  })
}
  
  /* 
  const createMerchant = (body) => {
    return new Promise(function(resolve, reject) {
      const { name, email } = body
      pool.query('INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new merchant has been added added: ${results.rows[0]}`)
      })
    })
  }
  const deleteMerchant = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Merchant deleted with ID: ${id}`)
      })
    })
  } */
  
  module.exports = {
    getMerchants,
    queryMerchants
  
  }