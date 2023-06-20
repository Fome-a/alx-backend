import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error}`);
});

const channel = 'holberton school channel';

client.subscribe(channel);

client.on('message', (receivedChannel, message) => {
  console.log(`Message received from channel ${receivedChannel}: ${message}`);
  if (message === 'KILL_SERVER') {
    client.unsubscribe(channel);
    client.quit();
  }
});
