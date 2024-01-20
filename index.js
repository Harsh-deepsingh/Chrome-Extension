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
                    // "div > div > div.p5 > div.mt3.mb2 > ul > li:nth-child(1) > span > span:nth-child(1) > span > span:nth-child(1)",
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
                if(i === 0) {
                    listItems += `
                    <div class="list1">
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                            <div class='linklogo'>
                                <img src='icon.jpg' alt='Icon' width='50' height='50'>
                                </div>   
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }else if (i === 1) {
                    listItems += `
                    <div class='list'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                                <img src='${leads[i]}' alt='Icon' width='50' height='50'>
                            </a>
                            </div>
                    </li>
                    </div>
                `;
                }else if (i === 5) {
                    listItems += `
                    <div class='list1'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                            <div class='linklogo'>
                                <img src='icon.jpg' alt='Icon' width='50' height='50'>
                            </div>    
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }else if (i === 6)  {
                    listItems += `
                    <div class='list'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                                <img src='${leads[i]}' alt='Icon' width='50' height='50'>
                            </a>  
                        </div>  
                    </li>
                    </div>    
                `;
                } else if (i === 10) {
                    listItems += `
                    <div class='list1'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                            <div class='linklogo'>
                                <img src='icon.jpg' alt='Icon' width='50' height='50'>
                            </div>    
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }else if (i === 11)  {
                    listItems += `
                    <div class='list'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                                <img src='${leads[i]}' alt='Icon' width='50' height='50'>
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }
                else if (i === 15) {
                    listItems += `
                    <div class='list1'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                            <div class='linklogo'>
                                <img src='icon.jpg' alt='Icon' width='50' height='50'>
                            </div>    
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }else if (i === 16)  {
                    listItems += `
                    <div class='list'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                                <img src='${leads[i]}' alt='Icon' width='50' height='50'>
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }
                else if (i === 20) {
                    listItems += `
                    <div class='list1'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                            <div class='linklogo'>
                                <img src='icon.jpg' alt='Icon' width='50' height='50'>
                            </div>    
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }else if (i === 21)  {
                    listItems += `
                    <div class='list'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                                <img src='${leads[i]}' alt='Icon' width='50' height='50'>
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }
                else if (i === 25) {
                    listItems += `
                    <div class='list1'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                            <div class='linklogo'>
                                <img src='icon.jpg' alt='Icon' width='50' height='50'>
                            </div>    
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }else if (i === 26)  {
                    listItems += `
                    <div class='list'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                                <img src='${leads[i]}' alt='Icon' width='50' height='50'>
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }
                else if (i === 30) {
                    listItems += `
                    <div class='list1'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                            <div class='linklogo'>
                                <img src='icon.jpg' alt='Icon' width='50' height='50'>
                            </div>    
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }else if (i === 31)  {
                    listItems += `
                    <div class='list'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                                <img src='${leads[i]}' alt='Icon' width='50' height='50'>
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }
                else if (i === 35) {
                    listItems += `
                    <div class='list1'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                            <div class='linklogo'>
                                <img src='icon.jpg' alt='Icon' width='50' height='50'>
                            </div>    
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }else if (i === 36)  {
                    listItems += `
                    <div class='list'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                                <img src='${leads[i]}' alt='Icon' width='50' height='50'>
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }
                else if (i === 40) {
                    listItems += `
                    <div class='list1'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                            <div class='linklogo'>
                                <img src='icon.jpg' alt='Icon' width='50' height='50'>
                            </div>    
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }else if (i === 41)  {
                    listItems += `
                    <div class='list'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                                <img src='${leads[i]}' alt='Icon' width='50' height='50'>
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }
                else if (i === 45) {
                    listItems += `
                    <div class='list1'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                            <div class='linklogo'>
                                <img src='icon.jpg' alt='Icon' width='50' height='50'>
                            </div>    
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }else if (i === 46)  {
                    listItems += `
                    <div class='list'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                                <img src='${leads[i]}' alt='Icon' width='50' height='50'>
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }
                else if (i === 50) {
                    listItems += `
                    <div class='list1'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                            <div class='linklogo'>
                                <img src='icon.jpg' alt='Icon' width='50' height='50'>
                            </div>    
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }else if (i === 51)  {
                    listItems += `
                    <div class='list'>
                    <li>
                        <div class='${itemClass}'>
                            <a target='_blank' href='${myLeads}'>
                                <img src='${leads[i]}' alt='Icon' width='50' height='50'>
                            </a>
                        </div>
                    </li>
                    </div>
                `;
                }


                // listItems += `
                //     <li>
                //         <div class='${itemClass}'>
                //             <a target='_blank' href='${myLeads}'>
                //                 <img src='${i === 1 ? leads[i] : 'icon.jpg'}' alt='Icon' width='50' height='50'>
                //             </a>
                //         </div>
                //     </li>
                // `;

        } else {
            if (i === 2){
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Postion*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>    
            `;
            } else if (i === 3) {
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Comapany*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 4) {
                listItems += `
                <div class='list2'>
                <li>
                    <div class="temp">Applicants*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;   
            }
            if (i === 7){
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Postion*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 8) {
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Comapany*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 9) {
                listItems += `
                <div class='list2'>
                <li>
                    <div class="temp">Applicants*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;   
            }
            if (i === 12){
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Postion*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 13) {
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Comapany*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 14) {
                listItems += `
                <div class='list2'>
                <li>
                    <div class="temp">Applicants*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;   
            }
            if (i === 17){
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Postion*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 18) {
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Comapany*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 19) {
                listItems += `
                <div class='list2'>
                <li>
                    <div class="temp">Applicants*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;   
            }
            if (i === 22){
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Postion*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 23) {
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Comapany*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 24) {
                listItems += `
                <div class='list2'>
                <li>
                    <div class="temp">Applicants*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;   
            }
            if (i === 27){
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Postion*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 28) {
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Comapany*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 29) {
                listItems += `
                <div class='list2'>
                <li>
                    <div class="temp">Applicants*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;   
            }
            if (i === 32){
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Postion*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 33) {
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Comapany*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 34) {
                listItems += `
                <div class='list2'>
                <li>
                    <div class="temp">Applicants*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;   
            }
            if (i === 37){
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Postion*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 38) {
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Comapany*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 39) {
                listItems += `
                <div class='list2'>
                <li>
                    <div class="temp">Applicants*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;   
            }
            if (i === 42){
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Postion*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 43) {
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Comapany*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 44) {
                listItems += `
                <div class='list2'>
                <li>
                    <div class="temp">Applicants*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;   
            }
            if (i === 47){
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Postion*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 48) {
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Comapany*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 49) {
                listItems += `
                <div class='list2'>
                <li>
                    <div class="temp">Applicants*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;   
            }
            if (i === 52){
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Postion*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 53) {
                listItems += `
                <div class='list'>
                <li>
                    <div class="temp">Comapany*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;
            } else if (i === 54) {
                listItems += `
                <div class='list2'>
                <li>
                    <div class="temp">Applicants*</div>
                    <div class='${itemClass}'>
                    <input type="text" value="${leads[i]}" readonly>
                    </div>
                </li>
                </div>
            `;   
            }

            // if (i === 8){
            //     listItems += `
            //     <li>
            //         <div class="temp">Postion*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;
            // } else if (i === 9) {
            //     listItems += `
            //     <li>
            //         <div class="temp">Comapany*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;
            // } else if (i === 10) {
            //     listItems += `
            //     <li>
            //         <div class="temp">Job Type*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;   
            // } else if (i === 11) {
            //     listItems += `
            //     <li>
            //         <div class="temp">Applicants*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;   
            // }
            // if (i === 14){
            //     listItems += `
            //     <li>
            //         <div class="temp">Postion*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;
            // } else if (i === 15) {
            //     listItems += `
            //     <li>
            //         <div class="temp">Comapany*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;
            // } else if (i === 16) {
            //     listItems += `
            //     <li>
            //         <div class="temp">Job Type*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;   
            // } else if (i === 17) {
            //     listItems += `
            //     <li>
            //         <div class="temp">Applicants*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;   
            // }
            // if (i === 20){
            //     listItems += `
            //     <li>
            //         <div class="temp">Postion*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;
            // } else if (i === 21) {
            //     listItems += `
            //     <li>
            //         <div class="temp">Comapany*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;
            // } else if (i === 22) {
            //     listItems += `
            //     <li>
            //         <div class="temp">Job Type*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;   
            // } else if (i === 23) {
            //     listItems += `
            //     <li>
            //         <div class="temp">Applicants*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;   
            // }
            // if (i === 26){
            //     listItems += `
            //     <li>
            //         <div class="temp">Postion*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;
            // } else if (i === 27) {
            //     listItems += `
            //     <li>
            //         <div class="temp">Comapany*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;
            // } else if (i === 28) {
            //     listItems += `
            //     <li>
            //         <div class="temp">Job Type*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;   
            // } else if (i === 29) {
            //     listItems += `
            //     <li>
            //         <div class="temp">Applicants*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;   
            // }
            // if (i === 32){
            //     listItems += `
            //     <li>
            //         <div class="temp">Postion*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;
            // } else if (i === 33) {
            //     listItems += `
            //     <li>
            //         <div class="temp">Comapany*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;
            // } else if (i === 34) {
            //     listItems += `
            //     <li>
            //         <div class="temp">Job Type*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;   
            // } else if (i === 35) {
            //     listItems += `
            //     <li>
            //         <div class="temp">Applicants*</div>
            //         <div class='${itemClass}'>
            //         <input type="text" value="${leads[i]}" readonly>
            //         </div>
            //     </li>
            // `;   
            // }

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













// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === "complete") {
//         checkTabUrl(tab.url);
//     }
// });


// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     if (tabs.length > 0) {
//         checkTabUrl(tabs[0].url);
//     }
// });

// const green = 'green.png'; 
// const red = 'red.png';

// function checkTabUrl(url) {

//     if (url.includes("youtube.com")) {
//         renderTextOnScreen(green);
//     } else {
//         renderTextOnScreen(red);
//     }
// }

// function renderTextOnScreen(imagePath) {
//     document.body.innerHTML = `<img src="${imagePath}" alt="Status Image" width='50px' height='50px' />`;

// }
