import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

// // console.log('Evaluate extension loaded on:', window.location.href);

// function getAllPageText() {
//   const bodyText = document.body.innerText;

//   return bodyText;
// }

// // Listen for messages from the popup or background script
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === 'getPageInfo') {
//     sendResponse({
//       title: document.title,
//       // url: window.location.href,
//       timestamp: new Date().toISOString(),
//     });
//     return true;
//   }

//   if (request.action === 'copyAllText') {
//     const allText = getAllPageText();
//     sendResponse({
//       success: true,
//       textLength: allText.length,
//       content: allText,
//       message: 'New Text logged to console',
//     });
//     return true;
//   }

//   return false;
// });
