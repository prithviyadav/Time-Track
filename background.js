function restrictSite(site, senderTabId) {
  chrome.storage.local.get([site, "timeLimit", "restrictedWebsites"], function (result) {
    const siteData = result[site];
    const timeLimit = result.timeLimit; // Global time limit in seconds
    const restrictedWebsites = result.restrictedWebsites || [];
    console.log(restrictedWebsites);
    console.log(site);
    // Check if the site is in the restricted websites list
    if (restrictedWebsites.includes(site)) {
      openRestrictedPopup(senderTabId);
      return;
    }

    // If the site is not in the restricted list, proceed with the time limit check
    if (siteData && siteData[0] > timeLimit) {
      openBlockedPopup(senderTabId);
    }
  });
}

function openBlockedPopup(senderTabId) {
  // Get the current window to calculate the center position for the pop-up
  chrome.windows.getCurrent(function (window) {
    let w = 300;
    let h = 200;
    let left = Math.round(window.width / 2 - w / 2 + window.left);
    let top = Math.round(window.height / 2 - h / 2 + window.top);

    chrome.windows.create({
      url: "blocked.html",
      type: "popup",
      width: w,
      height: h,
      left: left,
      top: top,
    });

    // Close the tab using the tab ID passed to the function
    chrome.tabs.remove(senderTabId);
  });
}

function openRestrictedPopup(senderTabId) {
  // Get the current window to calculate the center position for the pop-up
  chrome.windows.getCurrent(function (window) {
    let w = 300;
    let h = 200;
    let left = Math.round(window.width / 2 - w / 2 + window.left);
    let top = Math.round(window.height / 2 - h / 2 + window.top);

    chrome.windows.create({
      url: "restricted.html",
      type: "popup",
      width: w,
      height: h,
      left: left,
      top: top,
    });

    // Close the tab using the tab ID passed to the function
    chrome.tabs.remove(senderTabId);
  });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // Clear local storage data every day
  chrome.storage.local.get(["prevDate"], function (result) {
    if (!result.prevDate) {
      const date = new Date();
      chrome.storage.local.set({ prevDate: [date.getDate() * 100000] });
    } else {
      const curr = new Date();
      if (curr.getDate() != result.prevDate[0] / 100000) {
        chrome.storage.local.clear();
      }
    }
  });

  // Updating or Adding website details in local storage
  async function getTabs() {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    const [tab] = await chrome.tabs.query({ active: true });

    const url = new URL(tab.url);
    const urlP = url.protocol;
    let site = url.hostname;
    if (site.startsWith("www.")) {
      site = site.slice(4);
    }

    if (
      urlP !== "edge:" &&
      urlP !== "file:" &&
      urlP !== "chrome:" &&
      urlP !== "brave:"
    ) {
      chrome.storage.local.get([site], function (result) {
        let data = {};
        const siteData = result[site];
        if (siteData) {
          data[site] = [
            siteData[0] + (tabs.length ? Math.floor(11 / tabs.length) : 10),
            tab.favIconUrl,
          ];
        } else {
          data[site] = [0, tab.favIconUrl];
        }
        chrome.storage.local.set(data);
      });
    }
    // Call restrictSite with the current tab's ID
    restrictSite(site, tab.id);
  }

  getTabs();

  console.log(message);
  sendResponse({ executing: true });
});

// Pass the tabId to the restrictSite function
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.active) {
    // Check if tab.url is defined and is a string
    if (typeof tab.url === "string" && tab.url) {
      try {
        // Attempt to construct a new URL object
        const hostname = new URL(tab.url).hostname;
        restrictSite(hostname, tabId);
      } catch (error) {
        // Log the error if URL construction fails
        console.error("Error constructing URL:", error);
      }
    } else {
      console.error("tab.url is undefined or not a string");
    }
  }
});

// Pass the tabId to the restrictSite function
chrome.tabs.onActivated.addListener(function (activeInfo) {
  // console.log(activeInfo);
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    // console.log(tab);
    // Check if tab.url is defined and is a string
    if (typeof tab.url === "string" && tab.url) {
      try {
        // Attempt to construct a new URL object
        const hostname = new URL(tab.url).hostname;
        restrictSite(hostname, tab.id);
      } catch (error) {
        // Log the error if URL construction fails
        console.error("Error constructing URL:", error);
      }
    } else {
      console.error("tab.url is undefined or not a string");
    }
  });
});
