function addDetails(site, mins, colour, favIcon, total, timelim) {
  const analytics = document.getElementById("analytics");

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("siteDetails");
  mainDiv.style.boxShadow = `0 0 5px ${colour}`;
  mainDiv.addEventListener("mouseenter", function () {
    mainDiv.style.boxShadow = `0 0 10px ${colour}`;
  });
  mainDiv.addEventListener("mouseleave", function () {
    mainDiv.style.boxShadow = `0 0 5px ${colour}`;
  });

  const img = document.createElement("img");
  img.setAttribute("src", favIcon);
  img.setAttribute("alt", "icon");
  img.classList.add("favIcon");
  mainDiv.appendChild(img);

  const divParent = document.createElement("div");
  divParent.classList.add("detailsParent");
  mainDiv.appendChild(divParent);

  const div1 = document.createElement("div");
  div1.classList.add("details");
  divParent.appendChild(div1);

  const title = document.createElement("span");
  title.innerText = site;
  div1.appendChild(title);

  const time = document.createElement("span");
  time.innerText = `${mins} m`;
  div1.appendChild(time);

  const div2 = document.createElement("div");
  div2.classList.add("hourProgress");
  div2.style.backgroundColor = colour;
  div2.style.width = `${(mins / total) * 100}%`;
  divParent.appendChild(div2);

  const buttonBox = document.createElement("div");
  buttonBox.classList.add("buttonBox");
  mainDiv.appendChild(buttonBox);

  mainDiv.addEventListener("click", () => {
    displayButtonBox(site, mins, colour, favIcon, total, timelim);
  });

  analytics.appendChild(mainDiv);
}

function displayButtonBox(site, mins, colour, favIcon, total, timelim) {
  const buttonBox = document.createElement("div");
  buttonBox.classList.add("buttonBox");
  buttonBox.style.position = "fixed";
  buttonBox.style.top = "0";
  buttonBox.style.left = "0";
  buttonBox.style.width = "100vw";
  buttonBox.style.height = "100vh";
  buttonBox.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  buttonBox.style.border = "none";
  buttonBox.style.padding = "20px";
  buttonBox.style.boxShadow = "none";
  buttonBox.style.zIndex = "999";

  const megab = document.createElement("div");
  // megab.style.margin = "auto";
  megab.style.position = "relative";
  megab.style.width = "100vw";
  megab.style.marginTop = "35px";
  megab.style.display = "flex";
  megab.style.flexDirection = "column";
  megab.style.justifyContent = "space-between";
  megab.style.alignItems = "right";

  const buttonRow1 = document.createElement("div");
  buttonRow1.style.display = "flex";

  const buttonRow2 = document.createElement("div");
  buttonRow2.style.display = "flex";

  const buttonRow3 = document.createElement("div");

  const buttonStyles = {
    padding: "10px 20px",
    margin: "5px",
    backgroundColor: "#444",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.25s ease-in-out",
    display: "flex-inline",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1003",
  };

  function applyStyles(element, styles) {
    for (let property in styles) {
      element.style[property] = styles[property];
    }
  }

  const button1 = document.createElement("button");
  applyStyles(button1, buttonStyles);
  button1.title = "Back";
  const icon1 = document.createElement("i");
  icon1.className = "fas fa-arrow-left";
  button1.appendChild(icon1);
  buttonRow1.appendChild(button1);

  const button4 = document.createElement("button");
  applyStyles(button4, buttonStyles);
  button4.title = "Go to Site";
  const icon4 = document.createElement("i");
  icon4.className = "fas fa-external-link-alt";
  button4.style.marginLeft = "160px";
  button4.appendChild(icon4);
  buttonRow1.appendChild(button4);

  const button2 = document.createElement("div");
  button2.innerText = "Restrict the Site ! -> ";
  applyStyles(button2, buttonStyles);
  button2.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
  // button2.style.boxShadow = "0 0 5px rgba(255, 255, 255, 0.8)";
  button2.style.color = "white";
  button2.style.marginRight = "20px";
  button2.style.background =
    "linear-gradient(0deg, rgba(51, 51, 51, 1) 0%, rgba(255, 0, 0, 0.67) 100%)";
  button2.style.borderRadius = "8px";
  button2.style.fontWeight = "bold";
  button2.style.fontSize = "1.3em";
  button2.style.letterSpacing = "0.8px";
  button2.style.cursor = "cursor";
  buttonRow2.appendChild(button2);

  const button3 = document.createElement("button");
  applyStyles(button3, buttonStyles);
  button3.title = "Restrict Site";
  const icon3 = document.createElement("i");
  icon3.className = "fas fa-ban";
  button3.appendChild(icon3);
  buttonRow2.appendChild(button3);

  // Create the time limit section
  const timeLimitSection = document.createElement("div");
  timeLimitSection.id = "timeLimitSection";
  timeLimitSection.style.margin = "20px 20px 70px 20px";
  timeLimitSection.style.marginLeft = "0";
  timeLimitSection.style.padding = "10px 15px";
  timeLimitSection.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
  timeLimitSection.style.borderRadius = "6px";
  timeLimitSection.style.position = "relative";
  timeLimitSection.style.zIndex = "1002";
  timeLimitSection.style.display = "flex";
  timeLimitSection.style.flexDirection = "column";
  timeLimitSection.style.width = "80%";

  // Create the set time limit button
  const setTimeLimitButton = document.createElement("button");
  setTimeLimitButton.id = "setTimeLimitButton";
  setTimeLimitButton.textContent = "Set Time Limit";
  setTimeLimitButton.style.background =
    "linear-gradient(0deg, rgba(51, 51, 51, 1) 0%, rgba(51, 51, 255, 0.67) 100%)";
  setTimeLimitButton.style.border = "none";
  setTimeLimitButton.style.padding = "10px 20px";
  setTimeLimitButton.style.borderRadius = "4px";
  setTimeLimitButton.style.color = "white";
  setTimeLimitButton.style.fontSize = "14px";
  setTimeLimitButton.style.width = "100%";
  setTimeLimitButton.style.cursor = "pointer";

  // Create the time limit input container
  const timeLimitInputDiv = document.createElement("div");
  timeLimitInputDiv.id = "timeLimitInput";
  timeLimitInputDiv.style.display = "flex";
  timeLimitInputDiv.style.flexDirection = "column";
  timeLimitInputDiv.style.alignItems = "center";
  timeLimitInputDiv.style.justifyContent = "center";
  timeLimitInputDiv.style.marginTop = "15px";

  // Create the time limit input field
  const timeLimitInput = document.createElement("input");
  timeLimitInput.type = "number";
  timeLimitInput.id = "timeLimit";
  timeLimitInput.placeholder = "Enter time in minutes";
  timeLimitInput.style.border = "1px solid #ccc";
  timeLimitInput.style.padding = "8px";
  timeLimitInput.style.borderRadius = "4px";
  timeLimitInput.style.fontSize = "14px";
  timeLimitInput.style.width = "calc(100% - 18px)";
  timeLimitInput.style.marginBottom = "10px";

  // Create the save time limit button
  const saveTimeLimitButton = document.createElement("button");
  saveTimeLimitButton.id = "saveTimeLimitButton";
  saveTimeLimitButton.textContent = "Save";
  saveTimeLimitButton.style.width = "30%";
  saveTimeLimitButton.style.background =
    "linear-gradient(0deg, rgba(51, 51, 51, 1) 0%, rgba(51, 51, 255, 0.67) 100%)";
  saveTimeLimitButton.style.border = "none";
  saveTimeLimitButton.style.color = "white";
  saveTimeLimitButton.style.padding = "3px 6px";
  saveTimeLimitButton.style.borderRadius = "4px";
  saveTimeLimitButton.style.cursor = "pointer";

  // Append the input field and save button to the input container
  timeLimitInputDiv.appendChild(timeLimitInput);
  timeLimitInputDiv.appendChild(saveTimeLimitButton);
  timeLimitInputDiv.style.display = "none";

  // Append the set time limit button and input container to the time limit section
  timeLimitSection.appendChild(setTimeLimitButton);
  timeLimitSection.appendChild(timeLimitInputDiv);

  // Add hover effect for buttons
  setTimeLimitButton.addEventListener("mouseover", () => {
    setTimeLimitButton.style.backgroundColor = "#005b";
  });
  setTimeLimitButton.addEventListener("mouseout", () => {
    setTimeLimitButton.style.backgroundColor = "#0074d9";
  });
  saveTimeLimitButton.addEventListener("mouseover", () => {
    saveTimeLimitButton.style.backgroundColor = "#005b";
  });
  saveTimeLimitButton.addEventListener("mouseout", () => {
    saveTimeLimitButton.style.backgroundColor = "#0074d9";
  });
  setTimeLimitButton.addEventListener("click", () => {
    if (timeLimitInputDiv.style.display == "none") {
      timeLimitInputDiv.style.display = "flex";
    } else {
      timeLimitInputDiv.style.display = "none";
    }
  });

  saveTimeLimitButton.addEventListener("click", () => {
    const timeLimit = parseInt(timeLimitInput.value, 10);
    if (isNaN(timeLimit) || timeLimit <= 0) {
      alert("Please enter a valid time in minutes.");
      return;
    }
    addTimeLimit(site, timeLimit * 60);
    timeLimitInputDiv.style.display = "none";
    timeLimitInput.value = "";
  });
  buttonRow3.appendChild(timeLimitSection);

  buttonBox.appendChild(megab);
  megab.appendChild(buttonRow1);
  megab.appendChild(buttonRow2);
  megab.appendChild(buttonRow3);

  buttonRow2.style.marginTop = "30px";
  buttonRow2.style.height = "50px";
  buttonRow2.style.marginLeft = "-10px";

  document.body.appendChild(buttonBox);

  button1.addEventListener("click", () => {
    buttonBox.remove();
  });
  button4.addEventListener("click", () => {
    // Open the site in a new tab
    window.open("https://" + site, "_blank");
  });
  button3.addEventListener("click", () => {
    chrome.storage.sync.get(["restrictedSites"], function (result) {
      const restrictedSites = result.restrictedSites || [];

      const siteIndex = restrictedSites.indexOf(site);
      if (siteIndex === -1) {
        restrictedSites.push(site);
        button2.innerText = "Unrestrict the Site ! -> ";
        button3.title = "Unrestrict Site";
        icon3.className = "fas fa-check";
      } else {
        restrictedSites.splice(siteIndex, 1);
        button2.innerText = "Restrict the Site ! -> ";
        button3.title = "Restrict Site";
        icon3.className = "fas fa-ban";
      }

      chrome.storage.sync.set(
        { restrictedSites: restrictedSites },
        function () {
          alert(
            `Site ${siteIndex === -1 ? "restricted" : "unrestricted"}:`,
            site
          );
        }
      );
    });
  });
  // You can add event listeners to button1 and button2 here
}
chrome.storage.sync.get("siteDetails", function (result) {
  if (result.siteDetails) {
    result.siteDetails.forEach((siteDetail) => {
      addDetails(
        siteDetail.site,
        siteDetail.mins,
        siteDetail.colour,
        siteDetail.favIcon,
        siteDetail.total,
        siteDetail.timelim
      );
    });
  }
});
function addTimeLimit(site, newT) {
  chrome.storage.local.get(site, function (result) {
    if (result[site]) {
      // Update the time limit for the site
      siteData[2] = newT;
      chrome.storage.local.set({ [site]: siteData }, () => {
        alert(`Time limit updated for ${site}.`);
      });
    } else {
      alert(`Site ${site} not found.`);
    }
  });
}

const colors = [
  "rgb(200, 234, 255)",
  "rgb(0, 255, 204)",
  "rgb(0, 183, 255)",
  "rgb(255, 158, 3)",
  "rgb(234, 255, 3)",
  "rgb(24, 255, 3)",
  "rgb(255, 3, 221)",
  "rgb(250, 35, 146)",
  "rgb(3, 234, 255)",
  "rgb(211, 35, 250)",
  "rgb(213, 3, 255)",
  "rgb(250, 60, 35)",
  "rgb(185, 250, 35)",
  "rgb(169, 161, 255)",
  "rgb(250, 137, 137)",
  "rgb(156, 250, 137)",
  "rgb(255, 3, 146)",
  "rgb(156, 250, 137)",
  "rgb(232, 32, 229)",
  "rgb(232, 32, 229)",
  "rgb(237, 146, 71)",
  "rgb(237, 201, 71)",
  "rgb(220, 237, 71)",
  "rgb(143, 237, 71)",
  "rgb(71, 237, 140)",
  "rgb(71, 237, 193)",
  "rgb(71, 231, 237)",
  "rgb(71, 207, 237)",
  "rgb(71, 160, 237)",
  "rgb(71, 160, 237)",
  "rgb(237, 71, 223)",
  "rgb(237, 71, 190)",
  "rgb(237, 71, 140)",
  "rgb(237, 71, 96)",
  "rgb(175, 238, 238)",
  "rgb(237, 166, 166)",
];

// Retrieve data from local storage and update it
chrome.storage.local.get(null, function (result) {
  if (result) {
    const dataArr = Object.entries(result).sort((a, b) => b[1][0] - a[1][0]);

    const noDataPic = document.getElementById("noData");
    if (dataArr.length < 2) {
      noDataPic.style.display = "block";
    } else {
      noDataPic.style.display = "none";
    }

    let total = 0;
    let titles = [],
      time = [],
      barColors = [],
      timeLimit = [];
    // console.log(data);
    for (let i = 1; i < dataArr.length; i++) {
      const data = dataArr[i];
      titles.push(data[0]);
      time.push(Math.floor(data[1][0] / 60));
      total += data[1][0];
      barColors.push(colors[i % 34]);
      timeLimit.push(data[1][2]);
    }

    const timeUsage = document.getElementById("timeUsage");
    const totalId = document.getElementById("total");
    if (total < 60) {
      timeUsage.style.display = "block";
      totalId.style.display = "none";
    } else {
      timeUsage.style.display = "none";
      totalId.style.display = "block";
    }

    for (let i = 1; i < dataArr.length; i++) {
      const data = dataArr[i];
      addDetails(
        data[0],
        Math.floor(data[1][0] / 60),
        colors[i % 34],
        data[1][1],
        Math.floor(total / 60),
        data[1][2]
      );
    }

    // Setting up the Total Time
    total = total / 60;
    let hrs = Math.floor(total / 60);
    if (hrs < 10) hrs = `0${hrs}`;
    let mins = Math.floor(total % 60);
    if (mins < 10) mins = `0${mins}`;
    totalId.querySelector("p strong").innerText = hrs;
    totalId.querySelector("p:last-child strong").innerText = `${mins}`;
    console.log("titles", titles);
    console.log("time", time);
    console.log("barColors", barColors);
    const siteChart = document.getElementById("siteChart");
    new Chart("siteChart", {
      type: "doughnut",
      data: {
        labels: titles,
        datasets: [
          {
            borderWidth: 1,
            borderColor: "rgba(50, 50, 50, 1)",
            backgroundColor: barColors,
            data: time,
          },
        ],
      },
      options: {
        legend: { display: false },
      },
    });
  }
});
