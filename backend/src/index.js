const express = require('express')
const dotenv = require('dotenv')
const { getTask, postTask } = require('./queries')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//TODO  DA SE SUREDI MALKU RESPONSEOVITE I REQUESTS DA SE PROMISLAT UBAVO

app.get('/tasks', async (req, res) => {

	const date = req.query.date
	const name = req.query.name
	const id = req.query.id

	console.log(req.query)
	if (!date && !name && !id) return res.status(400).json({ errorMessage: "Bad Request" })
	
	const tasks = await getTask(date,name,id)

	res.status(200).json({ task: tasks })

})

app.post('/tasks', async (req, res) => {
	
	const task = req.body
	const {result, error} = await postTask(task)

	if(error) return res.status(500).json({ errorMessage: "Server Error" })
	return res.status(200).json({ successMessage: "Task successfully inserted" })

})

app.put('/tasks', async (req, res) => {
	//MODIFY TASK
})

app.delete('/tasks', async (req, res) => {
	//DELETE TASK
})



app.listen(port, () => {
  console.log(`Server Started`);
});