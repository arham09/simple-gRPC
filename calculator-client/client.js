const path = require('path')
const PROTO_PATH = path.join(__dirname, 'calculator.proto')
var grpc = require('grpc')
var protoLoader = require('@grpc/proto-loader')

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

const params = {
  number1: 2,
  number2: 3
}
client.Add(params, (error, response) => {
  if (error) console.log(error)

  console.log('The Result of Addition Is: ' + response.result) // 'The Result Is: 5'
})

client.Multiply({number1: 10.1, number2: 9}, (error, response) => {
  if (error) console.log(error)

  console.log(`The Result of multiply is : ${response.result}`)
})

client.Substraction({number1: 100.1, number2: 9.1}, (error, response) => {
  if (error) console.log(error)

  console.log(`The Result of substraction is : ${response.result}`)
})


client.Division({number1: 110.1, number2: 9.1}, (error, response) => {
  if (error) console.log(error)

  console.log(`The Result of division is : ${response.result}`)
})
