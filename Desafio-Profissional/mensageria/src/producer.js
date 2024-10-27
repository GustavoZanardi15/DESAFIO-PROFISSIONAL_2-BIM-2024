const amqp = require('amqplib');

const queue = 'tasks';

async function publishTask(task) {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

    
        await channel.assertQueue(queue);

        
        channel.sendToQueue(queue, Buffer.from(task));
        console.log(`Tarefa enviada: ${task}`);

        
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Erro ao enviar a tarefa:', error);
    }
}


publishTask('Processar solicitação de cliente');

