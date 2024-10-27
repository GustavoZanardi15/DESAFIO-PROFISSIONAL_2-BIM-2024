const amqp = require('amqplib');

const queue = 'tasks';

async function startConsumer() {
    try {
       
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        
        await channel.assertQueue(queue);
        console.log(`Aguardando mensagens na fila: ${queue}`);

       
        channel.consume(queue, (message) => {
            if (message) {
                console.log(`Mensagem recebida: ${message.content.toString()}`);
                
              
                channel.ack(message);
            }
        });
    } catch (error) {
        console.error('Erro ao consumir mensagens:', error);
    }
}

startConsumer();
