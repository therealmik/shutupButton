/**
 * @fileoverview An extension that mutes all audible tabs.
 */

'use strict';


/**
 * Gets all audible tabs.
 *
 * @return {!Promise<!Array<Tab>>}
 */
function getAudibleTabs() {
  return new Promise(resolve => {
    chrome.tabs.query({audible: true}, resolve);
  });
}


/**
 * Mutes a tab.
 *
 * @param {!Tab} tab The tab that you want muted.
 * @return {!Promise<Tab>}
 */
function muteTab(tab) {
  return new Promise(resolve => {
    chrome.tabs.update(tab.id, {muted: true}, resolve);
  });
}


/**
 * Mutes a list of tabs.
 *
 * @param {!Array<!Tab>} tabs Tabs to be muted.
 * @return {!Promise<!Array<Tab>>}
 */
function muteTabs(tabs) {
  return Promise.all(tabs.map(muteTab));
}


/**
 * Activates a tab.
 *
 * @param {!Tab} tab The tab that you want muted.
 * @return {!Promise<Tab>}
 */
function activateTab(tab) {
  return new Promise(resolve => {
    chrome.tabs.update(tab.id, {active: true}, resolve);
  });
}


/**
 * Handles the click event for the browserAction badge.
 *
 * @param {!Tab} activeTab The tab that was active when the badge was clicked.
 */
function onBrowserActionClicked(activeTab) {
  getAudibleTabs().then(muteTabs);
}


chrome.browserAction.onClicked.addListener(onBrowserActionClicked);
