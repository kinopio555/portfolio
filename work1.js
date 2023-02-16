const form = document.getElementById('form');
const input = document.getElementById('input');
const ul = document.getElementById('ul');
const things = JSON.parse(localStorage.getItem('todos'));

if(things) {
    things.forEach(thing => {
        add(thing);
    })
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log(input.value);
    add();
});

function add(thing) {
    let thingText = input.value;

    if(thing) {
        thingText = thing.text;
    }
    if(thingText) {
    const li = document.createElement('li');
    li.innerText = thingText;
    li.classList.add('list-group-item');

    if(thing &&thing.completed) {
        li.classList.add('text-decoration-line-through');
    }

    li.addEventListener('contextmenu', function
    (event) {
        event.preventDefault();
        li.remove();
        saveData();
    });

    li.addEventListener('click', function() {
        li.classList.toggle('text-decoration-line-through');
        saveData();
    })
    ul.appendChild(li);
    input.value = '';
    saveData();
    }
}

function saveData() {
    const lists = document.querySelectorAll('li');
    let things = [];
    lists.forEach(list => {
        let thing = {
            text: list.innerText,
            completed: list.classList.contains('text-decoration-line-through')

        };
        things.push(thing);
    });
    localStorage.setItem('things', JSON.stringify(things));
}