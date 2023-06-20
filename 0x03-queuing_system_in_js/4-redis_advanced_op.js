import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error}`);
});

const hashKey = 'HolbertonSchools';
const hashData = {
  Portland: 50,
  Seattle: 80,
  'New York': 20,
  Bogota: 20,
  Cali: 40,
  Paris: 2,
};

client.hset(hashKey, hashData, redis.print);

client.hgetall(hashKey, (error, result) => {
  if (error) throw error;
  console.log('Object stored in Redis:');
  console.log(result);
});
