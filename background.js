chrome.runtime.onInstalled.addListener(
    () => {
        chrome.action.setBadgeText({
            text: 'ON'
        });
    }
);

// When the user clicks on the extension action
chrome.action.onClicked.addListener(
    async (tab) => {
        // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
        const prevState = await chrome.action.getBadgeText({});

        // Next state will always be the opposite
        const nextState = prevState === 'ON' ? 'OFF' : 'ON';

        // Set the action badge to the next state
        await chrome.action.setBadgeText({
            text: nextState
        });
    }
);

chrome.tabs.onCreated.addListener(
    async (tab) => {
        const currentState = await chrome.action.getBadgeText({});

        if (currentState == 'OFF') {
            return;
        }

        /**
         * Dealing with New Tab button
         */
        if (tab.pendingUrl == 'chrome://newtab/') {
            // const groupSingle = await chrome.tabs.group({ tabIds: tab.id });
            // await chrome.tabGroups.update(groupSingle, { title: 'New' });

            return;
        }

        /**
         * Check if new tab has an opener.
         * If Yes, and both are not grouped then add them
         * to a newly created group
         */
        if (tab.openerTabId) {
            const openerTab = await chrome.tabs.get(tab.openerTabId);

            if (tab.groupId == -1 && openerTab.groupId == -1) {
                const groupMulti = await chrome.tabs.group({ tabIds: [tab.id, openerTab.id] });
            }
        }
    }
);

chrome.tabs.onRemoved.addListener(
    async (tabId, removeInfo) => {

        tabGroups = [];

        chrome.tabGroups.query(
            { windowId: removeInfo.windowId },
            (group) => {
                console.log(group) // output is array of all groups
                tabGroups = group;
            }
        );

        console.log("pouf");
    }
);
