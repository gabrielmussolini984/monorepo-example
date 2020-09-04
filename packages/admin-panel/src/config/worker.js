console.log('worker started');
const CategoryRepository = require('../../Category/repositories/CategoryRepository');
const queue = require('./configRabbitMQ');

queue.consume('fila1', message => {
  // process the message
  console.log(`processing ${message.content.toString()}`);
});
queue.consume('createCategory', message => {
  const categoriaComToString = JSON.parse(message.content.toString());
  console.log(`Categoria Criada ${categoriaComToString.name}`);
  const { name, description, tenant_id } = JSON.parse(message.content);
  console.log(name, description, tenant_id);
  return 'Enviado para fila';
});
