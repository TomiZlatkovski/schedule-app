const connection = require('./config')

async function getTask( date, name, id ) {
    try {
        const [result] = await connection.query(`SELECT * FROM scheduler WHERE date = ? OR name = ? or id = ?`,[date, name, id])
        return { result: result, error: null }
    }
    catch (error) {
        console.error(error)
        return { result: null, error: error }
    }
    
}

async function postTask( task ) {
    try {
        const [result] = await connection.query(`INSERT INTO scheduler (name, description, date) VALUES (?, ?, ?)`,[task.name, task.description, task.date])
        return { result: result, error: null }
    }
    catch (error) {
        console.error(error)
        return { result: null, error: error }
    }
}

async function putTask( task, id ) {

}

async function deleteTask( id ) {

}

module.exports = {
    getTask,
    postTask
}