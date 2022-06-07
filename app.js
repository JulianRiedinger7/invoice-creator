let requested = JSON.parse(localStorage.getItem('requested')) || [];
const buttons = document.querySelectorAll('button');
const tasks = document.querySelector('.tasks');
const prices = document.querySelector('.prices');
const totalPrice = document.querySelector('#total');
const send = document.querySelector('.send');

const addService = (evt) => {
	if (evt.target.textContent.toLowerCase().includes('wash')) {
		if (
			!requested.some((service) => service.text.toLowerCase().includes('wash'))
		) {
			requested.push({
				text: 'Wash Car',
				price: 10,
			});
		}
	} else if (evt.target.textContent.toLowerCase().includes('mow')) {
		if (
			!requested.some((service) => service.text.toLowerCase().includes('mow'))
		) {
			requested.push({
				text: 'Mow Lawn',
				price: 20,
			});
		}
	} else {
		if (
			!requested.some((service) => service.text.toLowerCase().includes('pull'))
		) {
			requested.push({
				text: 'Pull Weeds',
				price: 30,
			});
		}
	}
	localStorage.setItem('requested', JSON.stringify(requested));
	renderHTML(requested);
};

const renderHTML = (arr = []) => {
	totalPrice.innerHTML = `$${arr.reduce(
		(acc, service) => acc + service.price,
		0
	)}`;
	tasks.innerHTML = arr
		.map((service) => `<h2>${service.text} <a class='remove'>Remove</a></h2>`)
		.join('');
	prices.innerHTML = arr
		.map((service) => `<h2>$${service.price}</h2>`)
		.join('');
	if (tasks.innerHTML !== '') {
		const removes = document.querySelectorAll('.remove');
		removes.forEach((remove) =>
			remove.addEventListener('click', removeService)
		);
	}
};

const removeService = (evt) => {
	requested = requested.filter(
		(service) =>
			service.text + ' Remove' !== evt.target.parentElement.textContent
	);
	localStorage.setItem('requested', JSON.stringify(requested));
	renderHTML(requested);
};

const sendInvoice = () => {
	requested = [];
	renderHTML(requested);
};

renderHTML(requested);

buttons.forEach((button) => button.addEventListener('click', addService));
send.addEventListener('click', sendInvoice);
