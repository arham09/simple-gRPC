const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const PROTO_PATH = path.join(__dirname, 'calculator.proto')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

/** Receive parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: false }))

/** Receive parse application/json */
app.use(bodyParser.json())

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

// Load in our service definition
const calculatorProto = grpc.loadPackageDefinition(packageDefinition).calculator

const client = new calculatorProto.Calculator('localhost:50051', grpc.credentials.createInsecure())

app.post('/add', (req, res) => {
  const data = {
    number1: req.body.number1,
    number2: req.body.number2
  }

  client.Add(data, (error, response) => {
    if (error) return res.json({ error: error })
  
    res.json({ result: response.result })
  })
})

app.post('/multiply', (req, res) => {
  const data = {
    number1: req.body.number1,
    number2: req.body.number2
  }

  client.Multiply(data, (error, response) => {
    if (error) return res.json({ error: error })
  
    res.json({ result: response.result })
  })
})

app.post('/substraction', (req, res) => {
  const data = {
    number1: req.body.number1,
    number2: req.body.number2
  }

  client.Substraction(data, (error, response) => {
    if (error) return res.json({ error: error })
  
    res.json({ result: response.result })
  })
})

app.post('/division', (req, res) => {
  const data = {
    number1: req.body.number1,
    number2: req.body.number2
  }

  client.Division(data, (error, response) => {
    if (error) return res.json({ error: error })
  
    res.json({ result: response.result })
  })
})

app.listen(2002, () => {
  console.log('Running in port 2002')
})
