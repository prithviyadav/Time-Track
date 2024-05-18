let v = "closed";
document.addEventListener("DOMContentLoaded", () => {
  const setTimeLimitButton = document.getElementById("setTimeLimitButton");
  const timeLimitInputDiv = document.getElementById("timeLimitInput");
  const saveTimeLimitButton = document.getElementById("saveTimeLimitButton");
  const timeLimitInput = document.getElementById("timeLimit");

  setTimeLimitButton.addEventListener("click", () => {
    if (v === "closed") {
      timeLimitInputDiv.style.display = "flex";
      v = "open";
    } else {
      timeLimitInputDiv.style.display = "none";
      v = "closed";
    }
  });
});
saveTimeLimitButton.addEventListener("click", () => {
  const timeLimit = parseInt(timeLimitInput.value, 10);
  if (isNaN(timeLimit) || timeLimit <= 0) {
    alert("Please enter a valid time in minutes.");
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    const url = new URL(activeTab.url);
    const site = url.hostname;

    let data = {};
    data[site] = [timeLimit * 60, ""];
    data["timeLimit"] = timeLimit * 60; // Save global time limit
    chrome.storage.local.set(data, () => {
      alert(`Time limit set for ${site}: ${timeLimit} minutes.`);
      timeLimitInputDiv.style.display = "none";
      timeLimitInput.value = "";
    });
  });
});
addRestrictedSiteButton.addEventListener("click", () => {
  const site = restrictedSiteInput.value.trim();
  if (!site) {
    alert("Please enter a valid website.");
    return;
  }

  chrome.storage.local.get("restrictedWebsites", function (result) {
    let restrictedWebsites = result.restrictedWebsites || [];
    if (!restrictedWebsites.includes(site)) {
      restrictedWebsites.push(site);
      chrome.storage.local.set(
        { restrictedWebsites: restrictedWebsites },
        () => {
          alert(`Website ${site} added to restricted list.`);
          restrictedSiteInput.value = "";
        }
      );
    } else {
      alert(`Website ${site} is already in the restricted list.`);
    }
  });
});
// Existing code to add site details
// ...

function addDetails(site, mins, colour, favIcon, total) {
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
  buttonBox.style.display = "none"; // Initially hidden
  buttonBox.style.position = "absolute";
  // buttonBox.style.height = "100vh";
  buttonBox.style.top = "55px";
  buttonBox.style.backgroundColor = "#333";
  buttonBox.style.border = "1px solid #ccc"; // You didn't specify changes to border style, so kept it.
  buttonBox.style.padding = "6px 7px 6px 6px";
  buttonBox.style.borderRadius = "6px";
  buttonBox.style.boxShadow = "0 0 5px rgba(0,0,0,0.2)";
  buttonBox.style.zIndex = "990";
  buttonBox.style.marginBottom = "16px";
  buttonBox.style.transition = "all 0.25s ease-in-out";

  // Define common styles for child buttons
  const buttonStyles = {
    padding: "10px 20px",
    margin: "5px",
    // width : "40px",
    backgroundColor: "#444",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.25s ease-in-out",
    display: "flex-inline",
    alignItems: "center",
    justifyContent: "center",
  };

  // Function to apply styles to an element
  function applyStyles(element, styles) {
    for (let property in styles) {
      element.style[property] = styles[property];
    }
  }

  // Create and style buttons with icons and tooltips
  const button1 = document.createElement("button");
  applyStyles(button1, buttonStyles);
  button1.title = "Restrict Site"; // Tooltip text
  const icon1 = document.createElement("i");
  icon1.className = "fas fa-ban"; // Font Awesome class for restriction icon
  button1.appendChild(icon1);
  buttonBox.appendChild(button1);

  const button2 = document.createElement("button");
  applyStyles(button2, buttonStyles);
  button2.title = "Set Time Limit"; // Tooltip text
  const icon2 = document.createElement("i");
  icon2.className = "fas fa-clock"; // Font Awesome class for clock icon
  button2.appendChild(icon2);
  buttonBox.appendChild(button2);
  let dis = "none";
  const button3 = document.createElement("button");
  applyStyles(button3, buttonStyles);
  button3.title = "Dashboard"; // Tooltip text
  const icon3 = document.createElement("i");
  icon3.className = "fas fa-tachometer-alt"; // Font Awesome class for dashboard icon
  button3.appendChild(icon3);
  buttonBox.appendChild(button3);
  button3.addEventListener("click", () => {
    if (dis === "none") {
      buttonBox.style.display = "block";
      dis = "block";
    } else {
      buttonBox.style.display = "none";
      dis = "none";
    }
  });

  // Add the button box to the main div
  mainDiv.appendChild(buttonBox);
  mainDiv.addEventListener("click", () => {
    if (dis === "none") {
      buttonBox.style.display = "block";
      dis = "block";
    } else {
      buttonBox.style.display = "none";
      dis = "none";
    }
  });

  analytics.appendChild(mainDiv);
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
      barColors = [];

    for (let i = 1; i < dataArr.length; i++) {
      const data = dataArr[i];
      titles.push(data[0]);
      time.push(Math.floor(data[1][0] / 60));
      total += data[1][0];
      barColors.push(colors[i % 34]);
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
        Math.floor(total / 60)
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
