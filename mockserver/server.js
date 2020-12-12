import express from 'express';
const server = express();

// **NOTES** Run the server from the root directory
server.use(express.static('./mockserver/data'))

server.listen(3001, () => {
  console.log("Server MOCKGIST is listening at port 3001")
})