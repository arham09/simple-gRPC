const path = require('path')
const PROTO_PATH = path.join(__dirname, 'calculator2.proto')
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
client.Add(params, function(error, response) {
  if (error) console.log(error)

  console.log('The Result Is: ' + response.result) // 'The Result Is: 5'
})
