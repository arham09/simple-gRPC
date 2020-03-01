const path = require('path')
const PROTO_PATH = path.join(__dirname, 'calculator.proto')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

// Load in our service definition
const calculatorProto = grpc.loadPackageDefinition(packageDefinition).calculator

// Implement the add function.
const Add = (call, callback) => {
  console.log('Addition got called')

  const { number1, number2 } = call.request // call.request will match the input from our .proto file
  const result = number1 + number2

  // The output on the callback should also match the output
  // in out .proto file
  callback(null, { result: result })
}

const Substraction = (call, callback) => {
  console.log('Substraction got called')

  const { number1, number2 } = call.request // call.request will match the input from our .proto file
  const result = number1 - number2

  // The output on the callback should also match the output
  // in out .proto file
  callback(null, { result: result })
}

const Multiply = (call, callback) => {
  console.log('Multiply got called')

  const { number1, number2 } = call.request // call.request will match the input from our .proto file
  const result = number1 * number2

  // The output on the callback should also match the output
  // in out .proto file
  callback(null, { result: result })
}

const Division = (call, callback) => {
  console.log('Division got called')
  const { number1, number2 } = call.request // call.request will match the input from our .proto file
  const result = number1 / number2

  // The output on the callback should also match the output
  // in out .proto file
  callback(null, { result: result })
}

const exposedFunctions = {
  Add: Add,
  Substraction: Substraction,
  Multiply: Multiply,
  Division: Division
}

const server = new grpc.Server()
// Add our calculator service to our gRPC server.
server.addService(calculatorProto.Calculator.service, exposedFunctions)
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
console.log('running in 127.0.0.1:50051')
server.start();