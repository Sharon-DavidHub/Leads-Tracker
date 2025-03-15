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
const pickDelBtn = document.getElementById("deleteIt")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )  // Use myLeads as the key
const tabBtn = document.getElementById("tab-btn")


// Load leads from local storage if they exist
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


// Function to save the leads to local storage
function saveLeads() {
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
}



function render(leads) {
    let listItems = " ";
    
    for (let i = 0; i < leads.length; i++) {
        // Using template strings to reflect the needed HTML elements
        listItems += `
            <li>
               <button>
                      <a target='_blank' href='${leads[i]}'> 
                              ${leads[i]}
                      </a>
               </button>
            </li>
        ` 
    } 
    ulEl.innerHTML = listItems // Append the listItems to the ul element
}




inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)     // Add the new lead to the array
    inputEl.value = ""              // Clear the input field
    saveLeads()                     // Save the updated leads to local storage
    
    render(myLeads)                 // Render the leads to the page
    
})




deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
    alert('Delete button double-clicked!')
})




// Event listener for the Save Tab button
tabBtn.addEventListener("click", function(){    
        chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
            const url = tabs[0].url;
            myLeads.push(url)
            saveLeads() // Save leads to localStorage
            render(myLeads)

        });

})




// Event listener for the Pick To Delete button
pickDelBtn.addEventListener("click", () => {
    ulEl.classList.toggle('delete-mode');
    
    // Handle item removal
    ulEl.addEventListener('click', (e) => {
        if (ulEl.classList.contains('delete-mode')) {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
                e.preventDefault();
                const listedUrls = e.target.closest('li');     // Get the parent <li> element
                listedUrls.remove();
                const urlToRemove = listedUrls.querySelector('a').href;     // Get the URL to remove
                myLeads = myLeads.filter((lead) => lead !== urlToRemove);     // Remove the URL from the array
                saveLeads();     // Save the updated array to local storage
            }
        }
    });
});



// pickDelBtn.addEventListener("click", function() {
//     let idAndLeads = []; // Ensure idAndLeads is empty before starting
    
//     for (let i = 0; i < myLeads.length; i++) {
//         var innerArray = [];
//         innerArray.push(myLeads[i]);

//         for (let j = 0; j < 1; j++) { // Change the loop to run for one iteration
//             let uppLetter4Id = randomUppLetters4Id();
//             let lowLetter4Id = randomLowLetters4Id();
//             let idCreator1 = Math.floor(Math.random() * 9);
//             let idCreator2 = Math.floor(Math.random() * 9);
//             let innerDimensionValue = idCreator1 + uppLetter4Id + idCreator2 + lowLetter4Id;
//             innerArray.push(innerDimensionValue);
//         }
//         idAndLeads.push(innerArray);
        
//     }
//     console.log(idAndLeads);
//     var idOnly_Array = idAndLeads.map(subArray => subArray[1])
    
//     let neededListItem = render(myLeads, idOnly_Array)
//     neededListItem.addEventListener("click", () => {
//         console.log(idOnly_Array)
        
//     })
// });
// function randomUppLetters4Id() {
//     const UpperCaseLetters = "ABCFEGDIHJMRYNWKOPTLUVQSXZ!"
//     const idLetterPicker = Math.floor(Math.random() * UpperCaseLetters.length) 
    
//     return UpperCaseLetters[idLetterPicker];
// }

// function randomLowLetters4Id() {
//     const LowerCaseLetters = "abcfegdihjmrynwkoptluvqsxz!"
//     const idLetterPicker = Math.floor(Math.random() * LowerCaseLetters.length) 
    
//     return LowerCaseLetters[idLetterPicker]
// }







// function render(lead) {
//     let listItem = " "
    
//     for (let i = 0; i < lead.length; i++) {
//         // Wrap the lead in an anchor tag (<a>) inside the <li>
//         // Can you make the link open in a new tab?
//         listItem = document.createElement("li")     // Create the list item
//         let button = document.createElement("button")     // Create the button
   
//         let anchor = document.createElement("a")     // Create the anchor
//         anchor.setAttribute("target", "_blank")
//         anchor.setAttribute("href", lead[i])
//         anchor.textContent = lead[i]

//         button.appendChild(anchor);         // Append the anchor to the button
//         listItem.appendChild(button);       // Append the button to the listitem
//          ulEl.appendChild(listItem); 
//      }
    
//     return listItem
// }




