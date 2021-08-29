let myLeads = [];

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const savetabBtn = document.getElementById("savetab-btn");



const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage);

if(leadsFromLocalStorage){
	myLeads = leadsFromLocalStorage;
	render(myLeads);
}


savetabBtn.addEventListener("click", saveTab);
function saveTab(){

    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
    	myLeads.push(tabs[0].url)
		localStorage.setItem("myLeads", JSON.stringify(myLeads))
		render(myLeads)
    })	
}

function render(leads){

	let listItems = "";
	for(let i = 0; i < leads.length; i++ ){
	     //listItems += "<li><a href='" + myLeads[i] + "'  target='_blank'>" +  myLeads[i] + "</a></li>";

	     //using template strings instead
	      listItems += `
	      <li>
		      <a href='${leads[i]}' target='_blank'>
		         ${ leads[i]}
		      </a>
	      </li>
         `
	     //console.log(listItems);
	}
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", clearLeads);
function clearLeads(){

	localStorage.clear();
	myLeads = [];
	render(myLeads);
}


inputBtn.addEventListener("click", saveLead);
function saveLead(){
	myLeads.push(inputEl.value);
	inputEl.value = " ";
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
	render(myLeads);
}



//dynamic functions

/*let welcomeEL = document.getElementById("welcome-el");

function greetUser (greeting, name){

	welcomeEL.textContent = `${greeting}, ${name}`
}

greetUser("Welcome back ", "Suzan");



function add(num1, num2){

	let result = num1 + num2;

	 return result;
}

console.log(add(3, 4));
console.log(add(9, 102));



let arrayList = ["suzan", "juliet", "samuel"];

function getFirst(arr){

	return arr[0];

}

console.log(getFirst(arrayList));

*/




