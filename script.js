class Movies {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

//global variabel
let seatCount = 0;

// utility function för att räkna ut pris
function updateTotalPrice() {
    const selectedMoviePrice = parseFloat(document.getElementById("movie").value) || 0;
    const totalPrice = selectedMoviePrice * seatCount;
    document.getElementById('total').innerHTML = totalPrice.toFixed(2);
}


//### fetcha movies och sätt pris
async function fetchMovies() {

    const selectedMovie = document.getElementById("movie");

    const response = await fetch('https://gist.githubusercontent.com/MhatteBoi/f5fd22a9be604c579de5ac206859cf07/raw/7abc653e30716376b830f65f126ced6c70201eff/movies.json');
    const data = await response.json();
    const movies = data.map(movie => new Movies(movie.name, movie.price));
    console.log(movies); // så man kan se filmerna i consolen

    //töm det som finns i dropdown
    selectedMovie.innerHTML = '';

    //fyll på med json data
    movies.forEach(movie => {
        const option = document.createElement('option');
        option.value = movie.price;
        option.text = movie.name;
        selectedMovie.appendChild(option);
    });

    //updatera priset från json data baserat på den som är vald i option, 
    selectedMovie.addEventListener('change', updateTotalPrice);

    return movies;
};



async function selectSeat() {

    const seats = document.querySelectorAll('.seat');
    const seatsSelected = document.getElementById('count')

    seats.forEach(seat => {
        seat.addEventListener('click', () => {
            if (seat.classList.contains('occupied')) {
                return; // gör inget om seat is occupied
            }

            // gör en toggle för om sätet är selected eller ej
            if (seat.classList.contains('selected')) { //kollar först om den är selected
                seat.classList.remove('selected');
                seatCount -= 1;
            }
            else {
                seat.classList.add('selected');
                seatCount += 1;
            }
            seatsSelected.innerHTML = seatCount;
            updateTotalPrice();
            console.log(seatCount)
        })
    }
    )
};


selectSeat();
fetchMovies();