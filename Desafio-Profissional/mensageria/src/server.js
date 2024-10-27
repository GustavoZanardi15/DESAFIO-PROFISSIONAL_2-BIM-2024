const express = require('express');
const amqp = require('amqplib');

const app = express();
const port = 3000;
const queue = 'tasks';

app.use(express.json()); 

app.post('/publish-task', async (req, res) => {
    const { task } = req.body; 

    if (!task) {
        return res.status(400).json({ error: 'É necessário fornecer uma tarefa.' });
    }

    try {
     
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

       
        await channel.assertQueue(queue);

        channel.sendToQueue(queue, Buffer.from(task));
        console.log(`Tarefa enviada: ${task}`);

        await channel.close();
        await connection.close();

        res.status(200).json({ message: 'Tarefa enviada com sucesso!' });
    } catch (error) {
        console.error('Erro ao publicar tarefa:', error);
        res.status(500).json({ error: 'Falha ao enviar a tarefa.' });
    }
});


app.listen(port, () => {
    console.log(`Servidor em execução em: http://localhost:${port}`);
});
