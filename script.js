const backgrounds = [
    'images/random1.jpg',
    'images/random2.jpg',
    'images/random3.jpg'
];
document.body.style.backgroundImage = `url(${backgrounds[Math.floor(Math.random() * backgrounds.length)]})`;
// Funzione per aggiungere un nuovo libro
document.getElementById('addBookForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('bookTitle').value;
    const date = document.getElementById('bookDate').value;
    const price = document.getElementById('bookPrice').value;
    const link = document.getElementById('bookLink').value;
    const image = document.getElementById('bookImage').files[0];

    const reader = new FileReader();
    reader.onload = function(event) {
        const card = `
            <div class="card">
                <img src="${event.target.result}" alt="${title}">
                <h3>${title}</h3>
                <p>Data: ${date}</p>
                <p>Prezzo: €${price}</p>
                <a href="${link}" class="detailsLink">Acquista</a>
                <button class="deleteBtn">Elimina</button>
            </div>
        `;
        document.getElementById("bookContainer").innerHTML += card; // Aggiungi la card alla sezione libri
        document.getElementById('addBookForm').reset(); // Resetta il modulo
        saveBooks(); // Salva i libri nella localStorage
    }

    if (image) {
        reader.readAsDataURL(image); // Carica l'immagine selezionata
    }
});

// Funzione di ricerca
document.getElementById('searchInput').addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(filter) ? '' : 'none';
    });
});

// Salvataggio libri nel localStorage
function saveBooks() {
    const books = Array.from(document.querySelectorAll('.card')).map(card => {
        return {
            title: card.querySelector('h3').textContent,
            date: card.querySelector('p:nth-child(2)').textContent.replace('Data: ', ''),
            price: card.querySelector('p:nth-child(3)').textContent.replace('Prezzo: €', ''),
            link: card.querySelector('.detailsLink').href,
            image: card.querySelector('img').src
        };
    });
    localStorage.setItem('books', JSON.stringify(books));
}

// Caricamento libri da localStorage
document.addEventListener('DOMContentLoaded', function() {
    const books = JSON.parse(localStorage.getItem('books'));
    if (books) {
        books.forEach(book => {
            const card = `
                <div class="card">
                    <img src="${book.image}" alt="${book.title}">
                    <h3>${book.title}</h3>
                    <p>Data: ${book.date}</p>
                    <p>Prezzo: €${book.price}</p>
                    <a href="${book.link}" class="detailsLink">Acquista</a>
                    <button class="deleteBtn">Elimina</button>
                </div>
            `;
            document.getElementById("bookContainer").innerHTML += card;
        });
    }
});

// Funzione per eliminare un libro
document.getElementById("bookContainer").addEventListener("click", function(e) {
    if (e.target.classList.contains('deleteBtn')) {
        const card = e.target.closest('.card');
        card.remove();
        saveBooks(); // Salva la tabella aggiornata
    }
});