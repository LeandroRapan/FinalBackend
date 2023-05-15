
const socketClient = io();

socketClient.on('connect', () => {
  console.log('Conectado al servidor de sockets');
});

socketClient.on('disconnect', () => {
  console.log('Desconectado del servidor de sockets');
});

socketClient.on('realtimeproducts', (products) => {
  console.log('Productos actualizados en tiempo real:', products);
  // Aquí podrías actualizar la vista con los nuevos productos recibidos
});

const productForm = document.getElementById('productForm');
productForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('Form submitted!');
  const nameInput = document.getElementById('name');
  const priceInput = document.getElementById('price');
  const data = {
    name: nameInput.value,
    price: priceInput.value
  };
  console.log(data)
  socketClient.emit('newprod', data)

  nameInput.value = '';
  priceInput.value = '';
});