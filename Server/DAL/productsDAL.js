const pool = require('../config/db')

exports.getProductsDAL = async() => {
    try{
        console.log('start getProductsDAL')
        const connection = await pool.getConnection() 
        const [data] = await pool.query('SELECT * FROM products_data order by date ASC')
        connection.release()
        console.log('done getProductsDAL')
        return data
    }
    catch(err){
        console.log(err)
        return null
    }
}