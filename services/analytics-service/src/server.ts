import "./config/preload.js";
import app from './app.js';
import http from 'node:http';
import { kafkaConsumer, kafkaProducer } from './config/kafka.js';
import { startAnalyticsConsumer } from './kafka/consumer.js';

// Create server
const PORT = 8001;
const server = http.createServer(app);

const startServer = async () => {
    try {
        // Start the HTTP server immediately
        server.listen(PORT, () => {
            console.log(`✅ Server is ready to accept requests on post ${PORT}`);
        });
        
        console.log('🔄 Initializing Kafka components...');
        const start = Date.now();
        await kafkaProducer.connect();        
        await startAnalyticsConsumer();
        console.log(`✅ Kafka components initialized in ${((Date.now() - start)/1000).toFixed(2)}s`);

    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

// Handle graceful shutdown
const shutdown = () => {
    try {
        // Disconnect Kafka producer
        kafkaProducer.disconnect();
        kafkaConsumer.disconnect();

        server.close(() => {
            process.exit(0);
        });
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Start the server
startServer();
