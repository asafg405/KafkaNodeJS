const kafka = require('kafka-node');
const  express = require('express');

let app = express();
app.use(express.json());

let kafkaHost = 'kafka:9092';
let kafkaTopic = 'KafkaTopic';

let client = new kafka.KafkaClient({kafkaHost: kafkaHost});
let Consumer = kafka.Consumer,
consumer = new Consumer(client,
   [{ topic: kafkaTopic, offset: 1}],
     {
        autoCommit: true
    }
);

consumer.on('message', (message) => console.log(message)); 
    
consumer.on('error', (err) => console.log('Error:',err));
    
consumer.on('offsetOutOfRange',(err) => console.log('offsetOutOfRange:',err));

var server = app.listen(8082,() =>{
   var host = server.address().address
   var port = server.address().port
})
