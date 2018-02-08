const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.raw({ type: '*/*' }))
const fs = require('fs')

var todos = {}

app.get('/todos', (req, res) => {
  fs.writeFileSync('data.txt', JSON.stringify(todos))
  res.send(todos)
})

app.post('/todos', (req, res) => {
  var username = JSON.parse(req.body.toString())
  if (!todos[username]) {
    todos[username] = []
  }
  res.send(JSON.stringify(todos[username]))
})

app.post('/addTodo', (req, res) => {
  let payload = JSON.parse(req.body.toString())
  let item = payload.item
  let username = payload.username
  let userTodos = todos[username]
  // todos[username] = {item: this.item}
  if (userTodos == undefined) userTodos = []
  userTodos.push(item)
  todos[username] = userTodos
  res.send(todos[username])
  // var userTodos =   res.send(todos[username])
})

app.post('/clearTodo', (req, res) => {
  var username = JSON.parse(req.body.toString())
  todos[username] = []
  res.send('Items cleared!')
})

var read = fs.readFileSync('data.txt').toString()
todos = JSON.parse(read)

app.listen(4000)
