if (localStorage.getItem('loggedIn') !== "true") {
    window.location.href = "index.html";
}

const user = localStorage.getItem("username");
document.getElementById("welcomeMessage").textContent =
    "¡Bienvenida  " + user + "!";

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

function toggleFav(button, name, img) {
    let favs = JSON.parse(localStorage.getItem('favorites')) || [];

    const index = favs.findIndex(f => f.name === name);

    if (index !== -1) {
        favs.splice(index, 1);
        button.textContent = '⭐';
    } else {
        favs.push({ name, img });
        button.textContent = '🌟';
    }

    localStorage.setItem('favorites', JSON.stringify(favs));
    loadFavorites();
}

function loadFavorites() {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    const favSection = document.getElementById('favoritosSection');
    const clearBtn = document.getElementById('clearFavBtn');

    favSection.innerHTML = '';

    if (favs.length === 0) {
        favSection.innerHTML =
            '<p class="text-center col-span-full font-semibold">No hay favoritos aún</p>';
        clearBtn.hidden = true;
        return;
    }

    clearBtn.hidden = false;

    favs.forEach(item => {
        const section = document.createElement('section');

        const img = document.createElement('img');
        img.src = item.img;
        img.width = 150;
        img.className = "mx-auto";

        const p = document.createElement('p');
        p.textContent = item.name;
        p.className = "font-bold text-center mt-2";

        section.appendChild(img);
        section.appendChild(p);
        favSection.appendChild(section);
    });
}



function ordenar(criterio) {
    const menu = document.querySelector('main');
    const items = Array.from(menu.querySelectorAll('section'));

    items.sort((a, b) => {
        const nombreA = a.querySelector('h2').textContent.trim();
        const nombreB = b.querySelector('h2').textContent.trim();

        const popA = Number(a.dataset.popular);
        const popB = Number(b.dataset.popular);

        const precioA = Number(
            a.querySelectorAll('p')[1].textContent.match(/[\d.]+/)[0]
        );
        const precioB = Number(
            b.querySelectorAll('p')[1].textContent.match(/[\d.]+/)[0]
        );

        if (criterio === 'popuDesc') return popB - popA;
        if (criterio === 'popuAsc') return popA - popB;

        if (criterio === 'precioAsc') return precioA - precioB;
        if (criterio === 'precioDesc') return precioB - precioA;

        if (criterio === 'nombreAsc') return nombreA.localeCompare(nombreB);
        if (criterio === 'nombreDesc') return nombreB.localeCompare(nombreA);

        return 0;
    });

    items.forEach(item => menu.appendChild(item));
}

function clearFavorites() {
    localStorage.removeItem('favorites');
    loadFavorites();
    syncButtons();
}




function syncButtons() {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];

    document.querySelectorAll("main section").forEach(section =>{
        const name = section.querySelector('h2').textContent.trim();
        const btn = section.querySelector('button');

        if (favs.some(f => f.name === name)) {
            btn.textContent = '🌟';
        } else {
            btn.textContent = '⭐';
        }
    })
}

loadFavorites();
syncButtons();

