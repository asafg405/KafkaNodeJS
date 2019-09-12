const kafka = require('kafka-node');
const  express = require('express');

const app = express();
app.use(express.json());

let kafkaHost = 'kafka:9092';
let kafkaTopic = 'KafkaTopic';

client = new kafka.KafkaClient({kafkaHost: kafkaHost});
client.createTopics([kafkaTopic], true, function (err, data) {});
let Producer = kafka.Producer,
    producer = new Producer(client);
    console.log(client);

producer.on('ready', () => console.log('Producer is ready'));
    
producer.on('error', (err) => console.log('Producer is in error state'));

app.post('/', (req, res) => {
   try{
    if (req.body.message == undefined){
        throw new Error("Parmeter is Missign");
    }

    let message = {
        "message":req.body.message,
        "timestamp":Date.now()
    };
     let payloads = [
     { topic: kafkaTopic, messages:JSON.stringify(message)}
    ];
         producer.send(payloads, function (err, data) {
         res.json(data);
     });
   }
    catch (error) {
        res.json({error:error.message});
    } 
})
var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;
})
