const form = document.querySelector('form');
const itemsList = document.querySelector('ul');
const items = JSON.parse(localStorage.getItem('plates')) || [];

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false
    };
    items.push(item);
    populateList(items, itemsList); //Parameters: Empty Array of Objects and ul element
    localStorage.setItem('plates', JSON.stringify(items));
    this.reset();
}

function toggleDone(e) {
    if (!e.target.matches('input')) return;
    const el = e.target;  //Take target on click
    const index = el.dataset.index;  //Access data-index attribute from input element
    items[index].done = !items[index].done; // Change the done property on click
    localStorage.setItem('plates', JSON.stringify(items)); //Update the local Storage
    populateList(items, itemsList); //Dump it into the latest items
} 

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
          <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked':''}>
            <label for="item${i}">${plate.text}</label>
          </li>
        `;
    }).join('');
}

form.addEventListener('submit', addItem); 
itemsList.addEventListener('click', toggleDone); 
populateList(items, itemsList);