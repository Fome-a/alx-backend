import express from 'express';
import bodyParser from 'body-parser';
import { createClient } from 'redis';
import util from 'util';

const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
];

function getItemById(id) {
  return listProducts.find((product) => product.itemId === id);
}
app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

const { promisify } = require('util');

const reserveStockById = async (itemId, stock) => {
  const setAsync = promisify(client.set).bind(client);
  await setAsync(`item.${itemId}`, stock);
};

const getCurrentReservedStockById = async (itemId) => {
  const getAsync = promisify(client.get).bind(client);
  const reservedStock = await getAsync(`item.${itemId}`);
  return Number(reservedStock);
};

app.get('/list_products/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const product = getItemById(Number(itemId));
  
  if (!product) {
    res.json({ status: 'Product not found' });
    return;
  }
  
  const currentQuantity = await getCurrentReservedStockById(itemId);
  
  res.json({ ...product, currentQuantity });
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const product = getItemById(Number(itemId));
  
  if (!product) {
    res.json({ status: 'Product not found' });
    return;
  }
  
  const currentQuantity = await getCurrentReservedStockById(itemId);
  
  if (currentQuantity === 0) {
    res.json({ status: 'Not enough stock available', itemId });
    return;
  }
  
  await reserveStockById(itemId, currentQuantity - 1);
  
  res.json({ status: 'Reservation confirmed', itemId });
});

app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});
