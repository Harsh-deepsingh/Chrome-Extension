let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        const new_url = tabs[0].url
        if (new_url.includes("linkedin.com/jobs/view")){
            if (myLeads.includes(new_url)){
                alert("This URL is already saved!")
            }
            else{
                myLeads.push(tabs[0].url)
                localStorage.setItem("myLeads", JSON.stringify(myLeads) )
            }
        }
        else{
            alert("This is not a valid LinkedIn job webpage.")
        }

    })
})
tabBtn.addEventListener("click", async function () {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
                const imgElement = document.querySelector(".EntityPhoto-square-3")
                if (imgElement) {
                    let imgSrc = imgElement.src;
                    chrome.runtime.sendMessage({ imgSrc });
                }
            }
    });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.imgSrc) {
        if (!myLeads.includes(message.imgSrc)) {
            myLeads.push(message.imgSrc);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);
        }
    }
});
tabBtn.addEventListener("click", async function () {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const tabUrl = tab.url;
    
    if (tabUrl.includes("linkedin.com/jobs/view")) {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                const selectors = [
                    "div.display-flex.justify-space-between.flex-wrap > h1",
                    "div.job-details-jobs-unified-top-card__primary-description-container > div > a",
                    "div > div > div.p5 > div.mt3.mb2 > ul > li:nth-child(1) > span > span:nth-child(1) > span > span:nth-child(1)",
                    "div > div > div.p5 > div.job-details-jobs-unified-top-card__primary-description-container > div > span:nth-child(6)"
                ];
    
                selectors.forEach(selector => {
                    const h1Element = document.querySelector(selector);
                    let h1Text = "";
                    if (h1Element) {
                        h1Text = h1Element.textContent.trim();
                        chrome.runtime.sendMessage({ h1Text });
                    }
                });
            }
        });
    }
});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.h1Text) {
        if (!myLeads.includes(message.h1Text)) {
            myLeads.push(message.h1Text);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);
        }
    }
});

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        let itemClass = `class${i}`;
            if (isValidURL(leads[i])) {
                listItems += `
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                                <img src='${i === 1 ? leads[i] : 'icon.jpg'}' alt='Icon' width='50' height='50'>
                            </a>
                        </div>
                    </li>
                `;

        } else {
            listItems += `
                <li>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
            `;
        }
    }
    ulEl.innerHTML = listItems;
}

function isValidURL(url) {

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
}

deleteBtn.addEventListener("click", function() {
    if(myLeads.length !== 0){
        const deleteconfirm = confirm("Are you sure to delete all URLs?")
        if(deleteconfirm){    
            localStorage.clear()
            myLeads = []
            render(myLeads) 
        }
    }
})

