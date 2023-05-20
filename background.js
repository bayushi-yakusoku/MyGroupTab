chrome.runtime.onInstalled.addListener(
    () => {
        chrome.action.setBadgeText({
            text: 'OFF'
        });
    }
);

// When the user clicks on the extension action
chrome.action.onClicked.addListener(
    async (tab) => {
        // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
        const prevState = await chrome.action.getBadgeText();

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
        if (tab.title == 'New Tab') {
            const group = await chrome.tabs.group({ tabIds: tab.id });
            // await chrome.tabGroups.update(group, { title: 'New' });
        }
    }
);
