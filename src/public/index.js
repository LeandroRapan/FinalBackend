
const socketClient = io();

socketClient.on('connect', () => {
  console.log('Conectado al servidor de sockets');
});

socketClient.on('disconnect', () => {
  console.log('Desconectado del servidor de sockets');
});

socketClient.on('realtimeproducts', (products) => {
 let data = ''
  products.forEach((p) => {
    data += `
      <div class="product-card">
        <ul>
          <h1>${p.name}</h1>
          <h2>Price: $${p.price}</h2>
          
        </ul>
        <button class="delete-button">Eliminar</button>
      </div>
    `;
  })
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = data;
  console.log('Productos actualizados en tiempo real');
 
});

const productForm = document.getElementById('productForm');
productForm.addEventListener('submit',  (event) => {
  event.preventDefault();
  console.log('Form submitted!');
  const nameInput = document.getElementById('name');
  const priceInput = document.getElementById('price');
  const data = {
    name: nameInput.value,
    price: priceInput.value
  };
  
  socketClient.emit('newprod', data)

  nameInput.value = '';
  priceInput.value = '';
});

function deleteProduct(id) {
  socketClient.emit('deleteProduct', id);
}