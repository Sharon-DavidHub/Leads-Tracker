// function saveInput() {
//     let message = "Button clicked from onclick attribute!";
//     return console.log(message);
// }


// You can also use addEventListener which is more professional
// let inputBtn = document.getElementById("input-btn");
// inputBtn.addEventListener("click", function saveInput() {
//     let message = "Button clicked from addEventListener!";
//     console.log(message)
// })
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click", function(){    
    let url = " ";
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        url = tabs[0].url;
        myLeads.push(url)
        render(myLeads)
    });
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )

})

function render(lead) {
    let listItems = ""
    for (let i = 0; i < lead.length; i++) {
        // Wrap the lead in an anchor tag (<a>) inside the <li>
        // Can you make the link open in a new tab?
        listItems += `
             <li>
                 <a target='_blank' href="${lead[i]}">
                    ${lead[i]}
                 </a>
             </li>
        `
    }
    ulEl.innerHTML = listItems  
}


deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    console.log(myLeads)
    myLeads = []
    render(myLeads)
    console.log(myLeads)
    alert('Delete button double-clicked!')
})


inputBtn.addEventListener("click", function() {
    ulEl.innerHTML = " "
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    
    render(myLeads)
    
})