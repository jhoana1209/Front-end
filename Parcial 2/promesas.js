// Función para hacer una pizza
function hacerPizza(ingredientes) {
    const promesaPizza = new Promise(function(resolve, reject) {
        if(ingredientes.includes('piña')) {
            setTimeout(function() {
                reject('🍍....POOOOR?');
            }, 500);
        }
        setTimeout(function() {
            resolve(`aqui esta tu pizza 🍕 con ${ingredientes.join(', ')}`);
        }, 1000);
    });
    return promesaPizza;
}

// Función para mostrar la pizza en el DOM
function mostrarPizza(pizza, tipo) {
    const container = document.getElementById('pizzas-container');
    
    const pizzaCard = document.createElement('div');
    pizzaCard.className = 'pizza-card';
    
    const pizzaImg = document.createElement('img');
    pizzaImg.className = 'pizza-img';
    
    // Asignar imágenes según el tipo de pizza
    if (tipo === 'pepperoni') {
        pizzaImg.src = '/imagenes/pizza-pepperonie.jpg';
        pizzaImg.alt = 'Pizza de Pepperoni';
    } else if (tipo === 'suprema') {
        pizzaImg.src = '/imagenes/pizza-suprema.jpg';
        pizzaImg.alt = 'Pizza Suprema';
    } else if (tipo === 'hawaiiana') {
        pizzaImg.src = '/imagenes/pizza-hawaianna.jpg';
        pizzaImg.alt = 'Pizza Hawaiiana';
    } else {
        pizzaImg.src = '/imagenes/pizza.jpg';
        pizzaImg.alt = 'Pizza Personalizada';
    }
    
    const pizzaInfo = document.createElement('div');
    pizzaInfo.className = 'pizza-info';
    
    const pizzaTitle = document.createElement('h3');
    pizzaTitle.textContent = `Pizza ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
    
    const pizzaDesc = document.createElement('p');
    pizzaDesc.textContent = pizza;
    
    pizzaInfo.appendChild(pizzaTitle);
    pizzaInfo.appendChild(pizzaDesc);
    
    pizzaCard.appendChild(pizzaImg);
    pizzaCard.appendChild(pizzaInfo);
    
    container.appendChild(pizzaCard);
}

// Función para mostrar errores
function mostrarError(error) {
    alert(`Error en tu orden: ${error}`);
    
    const container = document.getElementById('pizzas-container');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'pizza-card';
    
    const errorInfo = document.createElement('div');
    errorInfo.className = 'pizza-info';
    
    const errorTitle = document.createElement('h3');
    errorTitle.textContent = 'Error en tu pedido';
    
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.textContent = `¡Oh no! ${error}`;
    
    errorInfo.appendChild(errorTitle);
    errorInfo.appendChild(errorMsg);
    
    errorDiv.appendChild(errorInfo);
    
    container.appendChild(errorDiv);
}

// Eventos para los botones de pizza predefinidas
document.getElementById('btn-pepperoni').addEventListener('click', function() {
    hacerPizza(['pepperoni'])
        .then(function(pizza) {
            mostrarPizza(pizza, 'pepperoni');
        })
        .catch(function(error) {
            mostrarError(error);
        });
});

document.getElementById('btn-suprema').addEventListener('click', function() {
    hacerPizza(['carne', 'cebolla', 'pimiento rojo', 'pimiento verde', 'pepperoni'])
        .then(function(pizza) {
            mostrarPizza(pizza, 'suprema');
        })
        .catch(function(error) {
            mostrarError(error);
        });
});

document.getElementById('btn-hawaiiana').addEventListener('click', function() {
    hacerPizza(['jamon', 'piña'])
        .then(function(pizza) {
            mostrarPizza(pizza, 'hawaiiana');
        })
        .catch(function(error) {
            mostrarError(error);
        });
});

// Gestión del formulario personalizado
const ingredientesPersonalizados = [];

document.getElementById('btn-agregar').addEventListener('click', function() {
    const input = document.getElementById('nuevo-ingrediente');
    const ingrediente = input.value.trim();
    
    if (ingrediente !== '') {
        ingredientesPersonalizados.push(ingrediente);
        
        const lista = document.getElementById('ingredientes-seleccionados');
        const elemento = document.createElement('span');
        elemento.className = 'ingrediente';
        elemento.textContent = ingrediente;
        lista.appendChild(elemento);
        
        input.value = '';
    }
});

document.getElementById('btn-pedir').addEventListener('click', function() {
    if (ingredientesPersonalizados.length > 0) {
        hacerPizza(ingredientesPersonalizados)
            .then(function(pizza) {
                mostrarPizza(pizza, 'personalizada');
                
                // Limpiar la lista de ingredientes después de hacer el pedido
                ingredientesPersonalizados.length = 0;
                document.getElementById('ingredientes-seleccionados').innerHTML = '';
            })
            .catch(function(error) {
                mostrarError(error);
                
                // Limpiar la lista de ingredientes después de hacer el pedido
                ingredientesPersonalizados.length = 0;
                document.getElementById('ingredientes-seleccionados').innerHTML = '';
            });
    } else {
        alert('Por favor, añade al smenos un ingrediente');
    }
});