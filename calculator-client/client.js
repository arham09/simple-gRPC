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

app.get('/add', (req, res) => {
  client.Add({number1: 10.1, number2: 9}, (error, response) => {
    if (error) return res.json({ error: error })
  
    res.json({ result: response.result })
  })
})

app.get('/multiply', (req, res) => {
  client.Multiply({number1: 10.1, number2: 9}, (error, response) => {
    if (error) return res.json({ error: error })
  
    res.json({ result: response.result })
  })
})

app.get('/substraction', (req, res) => {
  client.Substraction({number1: 10.1, number2: 9}, (error, response) => {
    if (error) return res.json({ error: error })
  
    res.json({ result: response.result })
  })
})

app.get('/division', (req, res) => {
  client.Division({number1: 10.1, number2: 9}, (error, response) => {
    if (error) return res.json({ error: error })
  
    res.json({ result: response.result })
  })
})

app.listen(2002, () => {
  console.log('Running in port 2002')
})
