let floating_btn = document.getElementById('floating_btn');
let modal = document.getElementById('modal');
let modal_bg = document.getElementById('modal_bg');
let addlist_form = document.getElementById('addlist_form');
let root = document.getElementById('root');
let subtitle = document.getElementById('subtitle');

let shopping_list = [];

//add date to subtitle
subtitle.innerHTML = new Date().toLocaleDateString();

console.info({ modal, floating_btn, modal_bg, addlist_form, root, subtitle });

floating_btn.addEventListener('click', () => {
  if (modal.style.display == 'none') {
    showModal();
    return;
  }
  hideModal();
});

modal_bg.addEventListener('click', () => {
  hideModal();
});

addlist_form.addEventListener('submit', (event) => {
  event.preventDefault();

  let item = event.target.item.value;
  let price = event.target.price.value;

  shopping_list.push({
    item_name: item,
    item_price: price,
    date: new Date().toLocaleDateString(),
  });

  console.info(shopping_list);

  event.target.item.value = '';
  event.target.price.value = '';

  hideModal();
  renderToHTML();
});

//START FUNCTION
function hideModal() {
  modal.style.display = 'none';
  floating_btn.style.backgroundColor = 'darkslateblue';
  floating_btn.style.transform = 'rotate(0deg)';
}

function showModal() {
  modal.style.display = 'flex';
  floating_btn.style.backgroundColor = 'gray';
  floating_btn.style.transform = 'rotate(45deg)';
}

function renderToHTML() {
  root.innerHTML = '';

  shopping_list.forEach((e, i) => {
    root.innerHTML += `
      <div class="card">
        <small> ${e.date}</small>
        <div>
          ${e.item_name} <span> Rp. ${e.item_price}</span>
        </div>
        <button onclick="deleteList(${i})">Done</button>
      </div>
    `;
  });
}

function deleteList(index) {
  let confirmDel = confirm('Are you sure want to complete the order?');

  if (!confirmDel) {
    return;
  } else {
    shopping_list.splice(index, 1);

    alert('Shopping completed successfully!');
  }
  renderToHTML();
}
//END FUNCTION
