const main = document.getElementById('main') 
const addUserBtn = document.getElementById('add-user') 
const doubleBtn = document.getElementById('double') 
const showMillionairesBtn = document.getElementById('show-millionaires') 
const sortBtn = document.getElementById('sort') 
const calculateWealthBtn = document.getElementById('calculate-wealth') 

let data = [];

getRandomData();


//get data from API
async function getRandomData(){
    const res = await fetch('https://randomuser.me/api');
    const data =  await res.json();
    const user = data.results[0];

    const newUser ={
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 10000000)
    }
    addData(newUser);
}

//double money
function doubleMoney(){
    data = data.map(item => {
        return {...item , money: item.money *2};
    })
    updateDOM();
}

//sort persons
function sortUsers(){
    data =  data.sort((a, b) => b.money - a.money);
    updateDOM();
}

//show only millionaires
function showMillionaires(){
data = data.filter(user => user.money > 1000000); 
updateDOM();
}

//calculate Wealth
function calculateWealth(){
const wealth= data.reduce((acc,  user) => (acc += user.money ),0);
const wealthEl = document.createElement('div');
wealthEl.innerHTML = (`<h3>Wealth <strong>${formatMoney(wealth)} </strong></h3> `);
main.appendChild(wealthEl);

}
//add new object to data arr
function addData(obj){
 data.push(obj);

 updateDOM();
}

// add users to DOM
function updateDOM(providedData = data){
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    
    providedData.forEach(item => {
        const element =  document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);  
    })
}

//format number as money
function formatMoney(number){
    return "$" + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//event listeners
addUserBtn.addEventListener('click',getRandomData );
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click',sortUsers);
showMillionairesBtn.addEventListener('click',showMillionaires);
calculateWealthBtn.addEventListener('click',calculateWealth);









