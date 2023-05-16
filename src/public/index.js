
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
      <div style="border: 1px solid black; margin-bottom: 10px; width: 450px;">
        <ul>
          <h1>${p.name}</h1>
          <h2>Price: $${p.price}</h2>
          
        </ul>
        <button style="padding: 5px" onclick="deleteProduct(${p.id})">Eliminar</button>
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