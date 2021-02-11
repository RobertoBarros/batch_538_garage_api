const garageName = 'antonio-carlos-motors';
const url = `https://wagon-garage-api.herokuapp.com/${garageName}/cars`

const form = document.getElementById('new-car');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const car = {
    "brand": document.getElementById('brand').value,
    "model": document.getElementById('model').value,
    "plate": document.getElementById('plate').value,
    "owner": document.getElementById('owner').value
  }

  fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(car)
  })
  .then(response => response.json())
  .then((data) => {
    loadCars();
  })

});



const loadCars = () => {
  const carsList = document.querySelector('.cars-list');
  carsList.innerHTML = '';
  fetch(url)
    .then(response => response.json())
    .then((data)=>{
      data.forEach((car)=>{
        carsList.insertAdjacentHTML('beforeend', carHtml(car));
      });
      bindDeleteClick();
    })

}

const carHtml = (car) => {
  return `
      <div class="car">
        <div class="car-image">
          <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
        </div>
        <div class="car-info">
          <h4>${car.brand} ${car.model}</h4>
          <p><strong>Owner:</strong> ${car.owner}</p>
          <p><strong>Plate:</strong> ${car.plate}</p>
          <button class='btn btn-danger delete-btn' data-car-id="${car.id}" >Remove</button>
        </div>
      </div>
      `
}

const bindDeleteClick = () => {
  document.querySelectorAll('.delete-btn').forEach((btn)=>{
    btn.addEventListener('click', (event) => {
      const id = event.currentTarget.dataset.carId;
      const destroyURL = `https://wagon-garage-api.herokuapp.com/cars/${id}`
      fetch(destroyURL, {method: 'DELETE'})
        .then( () => {loadCars();})
    })
  });
}



loadCars();


