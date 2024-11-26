const firstNameElement = document.querySelector('#bannerUserName');
const reportPrompt = document.querySelector('#webiViewFrame');
const bwHome = document.querySelector('#id_93_3sl5j068');
const bwFolders = document.querySelector('#ListingURE_content');
const bwFavorites = document.querySelector('#MyDocs_treeView_treeNode1_name');
const iframeId = window.frameElement ? window.frameElement.id : ''; // Get the iframe's ID if it exists

let popupsEnabled = false; // Toggleable setting to enable/disable popups
let gogglesEnabled = false; // minimized minion
let reportName = '';
let reportIframe;
let gifClicked = false;

function displayPopups() {
  let reportName = '';
  chrome.storage.sync.get(['popupsEnabled'], function(result) {
    popupsEnabled = result.popupsEnabled;
  setTimeout(function() {
    const welcomeMessageElement = document.querySelector('#welcome_message');
    if (welcomeMessageElement) {
      const fullName = welcomeMessageElement.textContent.trim();
      const nameParts = fullName.split(/\s+/);
      const navNodeAnchor = document.querySelector('#navNodeAnchor_1_1');
      if (nameParts.length > 1) {
        const firstName = nameParts[1];
        if (navNodeAnchor) {
          navNodeAnchor.addEventListener('click', function() {
            if (document.querySelectorAll('.fade-in popup')) {
            closeAllPopups();
            }
            console.log('navNodeAnchor_1_1 clicked');
            setTimeout(() => showRelevantPopupSeries(firstName, 'landingPage2'), 1100);
        });
        } else {
          console.warn('navNodeAnchor_1_1 element not found.');
        }
        showRelevantPopupSeries(firstName, 'landingPage');
      } else {
        console.warn('First name not found in welcome message.');
      }
    } else {
      const firstNameElement = document.querySelector('#bannerUserName');
      const reportPrompt = document.querySelector('#webiViewFrame');
      const bwHome = document.querySelector('#id_93_3sl5j068');
      const bwFolders = document.querySelector('#ListingURE_content');
      const bwFavorites = document.querySelector('#MyDocs_treeView_treeNode1_name');
      const firstName = firstNameElement ? firstNameElement.textContent.trim() : 'User';
      // Listen for the message from the injected script
      window.addEventListener('message', (event) => {
          if (event.data.type && event.data.type === 'FROM_PAGE') {
              // This is the data from the injected script
              let reportName = event.data.reportName.split('(')[0].trim();
              chrome.storage.sync.set({ 'reportName': reportName, 'reportIframe': iframeId });
              console.log('Report Name from DS:', reportName + iframeId);
              const reports = {
                "Person": () => console.log('GAL Report'),
                "Flexible employee Report - NON SA": () => console.log("Flex EE Non-SA"),
                "Flexible Employee Data": () => console.log("Flex EE SA"),
                "Flexible Actions Report": () => console.log('Flexible Actions Report'),
                // Add more values and corresponding functions
                "Employee Detail Census": () => console.log('Employee Detail Census'),
                "Compensation Report": () => console.log('Compensation Ad Hoc Report'),
                //"Query 1": () => console.log('Employee Contact Info OR Job Structure Report (Compensation)'),
                // Add more values and corresponding functions
                "Reward & Recognition": () => console.log('GEM Report'),
                "SAP": () => console.log('SAP Salary History Report'),
                // Add more values and corresponding functions
                "OHR": () => console.log('OHR Salary History Report'),
                "Diversity Movement Summary (Actions)": () => console.log('Diversity Movement Summary (Actions)'),
                "Diversity Worforce Summary - PIT": () => console.log('Diversity Worforce Summary - PIT'),
                // Add more values and corresponding functions
                "Employee Headcount Rollup Summary": () => console.log('Employee Headcount Rollup Summary'),
                // Add more values and corresponding functions
                "Query1": () => console.log('Employee Terminations OR Promotions'),
                "Position Status Report": () => console.log('Position Status Report'),
            };
            
            // Check if the value exists as a key in the object and run the corresponding function
            if (reports[reportName]) {
                reports[reportName](); // Call the function for the matched value
            } else {
                console.log('No match found');
                setTimeout(() => showRelevantPopupSeries(firstName, 'generic_report'), 1100);
            }
            setTimeout(() => showRelevantPopupSeries(firstName, reportName), 1100);
          }
      });
      const script = document.createElement('script');
      script.src = chrome.runtime.getURL('inject.js');
      (document.head || document.documentElement).appendChild(script);

      if (reportPrompt && gifClicked) {
        setTimeout(function() {
        chrome.storage.sync.get(['reportName'], function(result) {
          reportName = result.reportName;
          setTimeout(() => showRelevantPopupSeries(firstName, reportName), 1100);
        }
  )},700);} else if (bwHome) {
        showRelevantPopupSeries(firstName, 'bw_landingPage');
      } else if (bwFolders) {
        // Function to find an element based on its inner text
function findElementByText(text) {
  const elements = document.querySelectorAll('span'); // Adjust this selector based on the tag containing the text
  for (let element of elements) {
    if (element.textContent.trim() === text) {
      return element;
    }
  }
  return null; // Return null if not found
}

// Find the element containing "SAP HCM Reports"
const sapHCMFolder = findElementByText('SAP HCM Reports');
        const publicFolder = document.querySelector('#yui-gen0-2-label'); 
        if (sapHCMFolder) { 
      console.log("SAP FOLDER: " + sapHCMFolder);
      setTimeout(function() {
        const intervalId = setInterval(() => {
          if (document.visibilityState === 'visible') {
            publicFolder.click();
      const doubleClickEvent = new MouseEvent('dblclick', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      const dropdownFolder = document.getElementById('ygtvlabelel3');
      const ariaExpanded = dropdownFolder.getAttribute('aria-expanded');
      if (ariaExpanded !== 'true') {
        sapHCMFolder.dispatchEvent(doubleClickEvent);
    }
        setTimeout(function() {
          const elements = document.getElementsByClassName('ygtvcell  ygtvcontent');
          const numberOfElements = elements.length;
          console.log(numberOfElements + " Folders counted");
          console.log('SAP Folder fou<nd' + sapHCMFolder);
          if (numberOfElements > 4) {
          showRelevantPopupSeries(firstName, 'bw_reporting_1');
          console.log('Normal User');
          } else {
            console.log('Reporting Only User');
          showRelevantPopupSeries(firstName, 'bw_reporting_1_ReportingOnly');
          }}, 1200)  } if (document.visibilityState === 'visible') {clearInterval(intervalId);}}, 400) 
      }, 500);
        } 
      } else if (bwFavorites) {
        showRelevantPopupSeries(firstName, 'bw_reporting_3');
      } else { console.log("no elements found for report page");}
    }
  }, 550);
});
};

function showRelevantPopupSeries(firstName, currentPage) {
  console.log(`Showing pop-ups for ${currentPage}`);
  console.log('PopupsEnabled = ' + popupsEnabled);
  chrome.storage.sync.get(['popupsEnabled'], function(result) {
    let popupsEnabled = result.popupsEnabled;
if (!popupsEnabled) return;
  const pageConfig = {
    'landingPage': {
      identifiers: ['#navNodeAnchor_1_1'],
      popups: [
        { position: { top: '45%', left: '35%' }, message: `Hi ${firstName}, Welcome to this BW tutorial! ` },
        { position: { top: '45%', left: '35%' }, message: `This basic tutorial will teach you to:<br><b>1.</b> Access the BW environment</br><b>2.</b> Save a report to your Favorites<br><b>3.</b> Run and Export a report.` },
        { position: { top: '45%', left: '35%' }, message: `Follow the instructions on the pop ups and click <b>Next</b> when you're ready to move on! ` },
        { position: { top: '150px', left: '175px' }, message: `First, Click the tab labeled<br><b>SAP Applications</b>` }
      ]
    },
    'landingPage2': {
      identifiers: ['#navNodeAnchor_2_1'],
      popups: [
        { position: { top: '200px', left: '250px' }, message: `Next, click the tab labeled<br><b>BW HCM Reporting</b> to enter the BW Reporting Environment.` },
        { position: { top: '200px', left: '250px' }, message: `<i> <b>Note:</b> If you do not see this tab, you may not have access to BW and will need to contact the Security team to be granted access.</i>` } 
      ]
    },
    'landingPage3': {
      identifiers: ['#navNodeAnchor_2_1'],
      popups: [
        { position: { top: '375px', left: '700px' }, message: `BW should have opened in a new tab/window. If nothing opened, be sure you have disabled your pop-up blocker.` },
        { position: { top: '375px', left: '700px' }, message: `This is the <b>portal home page</b>.<br>Here, you will see notifications regarding scheduled downtime for BW. If you don't see a message, BW is running as expected!` },
        { position: { top: '375px', left: '700px' }, message: `You may now proceed to the newly opened tab/window to continue the tutorial within the BW reporting environment` },     
      ]
    },
    
    'bw_landingPage': {
      identifiers: ['#id_93_3sl5j068'],
      popups: [
        { position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab to enter the BW Reporting Environment` },
      ]
    },
    'bw_reporting_1': {
      identifiers: ['#ListingURE_content'],
      popups: [
        { position: { top: '135px', left: '200px' }, message: `<b>Welcome to Business Warehouse (BW)!</b> ` },
        { position: { top: '135px', left: '200px' }, message: `You are now viewing the <b>Public Folders</b>. ` },
        { position: { top: '135px', left: '200px' }, message: ` These folders are accessible to many users. To avoid a data breach: <br><b><u> Please do not schedule reports directly from the Public Folders</u></b>.` },
        { position: { top: '135px', left: '200px' }, message: `Instead, you will now learn how to copy reports to your <b>Favorites</b> folder before running them.` },
        { position: { top: '135px', left: '50px' }, message: `First, Click a folder to see the reports within it. Next, Right Click one of the  reports on the right side of the screen and Select <br><b> Organize > Copy.</b>` },
        { position: { top: '40px', left: '350px' }, message: `After you've copied the report, Click the tab labeled <b>My Documents</b> on the top left corner of your screen, and then Click <b>My Favorites</b> below it.` },
        { position: { top: '40px', left: '250px' }, message: `Now that you are in your Favorites folder, Right Click <b>My Favorites</b> and <b>Click Organize > Paste.</b> ` },
        { position: { top: '135px', left: '250px' }, message: `Your desired report should now appear here in your <b>Favorites</b>. Hooray!` },
        { position: { top: '135px', left: '250px' }, message: `You can now double click your report to <b>open</b> it.` }
      ]
    },
      'bw_reporting_1_ReportingOnly': {
        identifiers: ['#ListingURE_content'],
        popups: [
          { position: { top: '135px', left: '200px' }, message: `<b>Welcome to Business Warehouse Reporting Only User (BW)!</b> ` },
          { position: { top: '135px', left: '200px' }, message: `You are now viewing the <b>Public Folders</b>. ` },
          { position: { top: '135px', left: '200px' }, message: ` These folders are accessible to many users. To avoid a data breach: <br><b><u> Please do not schedule reports directly from the Public Folders</u></b>.` },
          { position: { top: '135px', left: '200px' }, message: `Instead, you will now learn how to copy reports to your <b>Favorites</b> folder before running them.` },
          { position: { top: '135px', left: '50px' }, message: `First, Click the folder named <b>GAL Report</b>. Next, Right Click the contained report on the right side of the screen and Select <br> <b>Organize > Copy.</b>` },
          { position: { top: '40px', left: '350px' }, message: `After you've copied the report, Click the tab labeled <b>My Documents</b> on the top left corner of your screen, and then Click <b>My Favorites</b> below it.` },
          { position: { top: '40px', left: '250px' }, message: `Now that you are in your Favorites folder, Right Click <b>My Favorites</b> and Click <b>Organize > Paste.</b> ` },
          { position: { top: '135px', left: '250px' }, message: `Your report should now appear here in your <b>Favorites</b>. Hooray!` },
          { position: { top: '135px', left: '250px' }, message: `Directly beneath your Favorites folder is your <b>Inbox</b>. Click <b>Inbox</b> to open it` },
          { position: { top: '135px', left: '250px' }, message: `Your <b>Inbox</b> is where you will recieve custom built reports that were sent to you. You can copy these reports to your <b>Favorites</b> folder for easy access.` },
          { position: { top: '135px', left: '250px' }, message: `You can now return to your <b>Favorites</b> folder and double click your report to <b>open</b> it.` },
        ]
    },
    'generic_report': {
      identifiers: ['#webiViewFrame'],
      popups: [
        { position: { top: '35%', left: '72%' }, message: `The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        { position: { top: '35%', left: '72%' }, message: `To set filter criteria, Click one of the criteria under <b>Prompts Summary</b>. Type an asterisk (<b>*</b>) into the bottom search bar and hit Enter on your keyboard. Select your desired value(s) from the list and click the right arrow.` },
        { position: { top: '35%', left: '72%' }, message: `Click <b>OK</b> to run the report` },
        { position: { top: '40px', left: '185px' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('export.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        { position: { top: '35%', left: '15%' }, message: `Select File Type <b>Excel (.xslx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        { position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>` }
      ]
    },
    'report_prompt': {
      identifiers: ['#webiViewFrame'],
      popups: [
        { position: { top: '35%', left: '72%' }, message: `The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        { position: { top: '35%', left: '72%' }, message: `To filter by <b>Employee Type</b>, Select the value '<b>Employee</b>', and click the right arrow to bring it to the box on the right side.` },
        { position: { top: '35%', left: '72%' }, message: `Next, Click '<b>Enter value(s) for State</b>'. Type an asterisk (<b>*</b>) into the bottom search bar and hit Enter on your keyboard. You should see the list of values for State. Select <b>New York</b> from the list and click the right arrow.` },
        { position: { top: '35%', left: '72%' }, message: `Click <b>OK</b> to run the report` },
        { position: { top: '40px', left: '185px' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('export.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        { position: { top: '35%', left: '15%' }, message: `Select File Type <b>Excel (.xslx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        { position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>` }
      ]
    },
    'Flexible employee Report - NON SA': {
      identifiers: ['#webiViewFrame'],
      popups: [
        { position: { top: '35%', left: '72%' }, message: `This is the Flexible Employee Report! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.`},
        { position: { top: '35%', left: '72%' }, message: `To filter by Employment Status, Select '<b>Enter values for Employment Status</b>', ` },
        { position: { top: '35%', left: '72%' }, message: `Next, type an asterisk (<b>*</b>) into the bottom search bar and hit Enter on your keyboard. You should see the list of possible values for Employment Status. Select <b>Active</b> and <b>Inactive</b> from the list and click the right arrow to bring it to the box on the right side.` },
        { position: { top: '35%', left: '72%' }, message: `Click <b>OK</b> to run the report` },
        { position: { top: '40px', left: '185px' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('export.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        { position: { top: '35%', left: '15%' }, message: `Select File Type <b>Excel (.xslx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        { position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>` }
      ]
    },
    'Flexible Employee Data': {
      identifiers: ['#webiViewFrame'],
      popups: [
        { position: { top: '35%', left: '72%' }, message: `This is the Flexible Employee Report! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        { position: { top: '35%', left: '72%' }, message: `To filter by Employment Status, Select '<b>Enter values for Employment Status</b>', ` },
        { position: { top: '35%', left: '72%' }, message: `Next, type an asterisk (<b>*</b>) into the bottom search bar and hit Enter on your keyboard. You should see the list of possible values for Employment Status. Select <b>Active</b> and <b>Inactive</b> from the list and click the right arrow to bring it to the box on the right side.` },
        { position: { top: '35%', left: '72%' }, message: `Click <b>OK</b> to run the report` },
        { position: { top: '40px', left: '185px' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('export.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        { position: { top: '35%', left: '15%' }, message: `Select File Type <b>Excel (.xslx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        { position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>` }
      ]
    },
    'Employee Detail Census': {
      identifiers: ['#webiViewFrame'],
      popups: [
        { position: { top: '35%', left: '72%' }, message: `This is the Employee Detail Census! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        { position: { top: '35%', left: '72%' }, message: `The <b>Employee Detail Census</b> will only show results for Active or Inactive (LOA) employees.` },
        { position: { top: '35%', left: '72%' }, message: `Click <b>OK</b> to run the report` },
        { position: { top: '40px', left: '185px' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('export.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        { position: { top: '35%', left: '15%' }, message: `Select File Type <b>Excel (.xslx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        { position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>` }
      ]
    },
    'Person': {
      identifiers: ['#webiViewFrame'],
      popups: [
        { position: { top: '35%', left: '72%' }, message: `This is the GAL report! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        { position: { top: '35%', left: '72%' }, message: `To filter by <b>Employee Type</b>, Select the value '<b>Employee</b>', and click the right arrow to bring it to the box on the right side.` },
        { position: { top: '35%', left: '72%' }, message: `Next, Click '<b>Enter value(s) for State</b>'. Type an asterisk (<b>*</b>) into the bottom search bar and hit Enter on your keyboard. You should see the list of values for State. Select <b>New York</b> from the list and click the right arrow.` },
        { position: { top: '35%', left: '72%' }, message: `Click <b>OK</b> to run the report` },
        { position: { top: '40px', left: '185px' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('export.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        { position: { top: '35%', left: '15%' }, message: `Select File Type <b>Excel (.xslx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        { position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>` }
      ]
    },
    'Flexible Actions Report': {
      identifiers: ['#webiViewFrame'],
      popups: [
        { position: { top: '35%', left: '72%' }, message: `This is the Flexible Actions Report! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        { position: { top: '35%', left: '72%' }, message: `First, filter by your desired date range using <b>Action Start Date (Start)</b> and <b>Action Start Date (End)</b>. ` },
        { position: { top: '35%', left: '72%' }, message: `Next, click <b>OK</b> to run the report` },
        { position: { top: '40px', left: '185px' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('export.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        { position: { top: '35%', left: '15%' }, message: `Select File Type <b>Excel (.xslx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        { position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>` }
      ]
    },
    'Query1': {
      identifiers: ['#webiViewFrame'],
      popups: [
        { position: { top: '35%', left: '72%' }, message: `The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        { position: { top: '35%', left: '72%' }, message: `First, filter by your desired date range using <b>Action Start Date (Start)</b> and <b>Action Start Date (End)</b>. ` },
        { position: { top: '35%', left: '72%' }, message: `Next, click <b>OK</b> to run the report` },
        { position: { top: '40px', left: '185px' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('export.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        { position: { top: '35%', left: '15%' }, message: `Select File Type <b>Excel (.xslx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        { position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>` }
      ]
    },
    'Compensation Report': {
      identifiers: ['#webiViewFrame'],
      popups: [
        { position: { top: '35%', left: '72%' }, message: `This is the Compensation Report! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        { position: { top: '35%', left: '72%' }, message: `To set filter criteria, Click one of the criteria under <b>Prompts Summary</b>. Type an asterisk (<b>*</b>) into the bottom search bar and hit Enter on your keyboard. Select your desired value(s) from the list and click the right arrow.` },
        { position: { top: '35%', left: '72%' }, message: `Click <b>OK</b> to run the report` },
        { position: { top: '40px', left: '185px' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('export.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        { position: { top: '35%', left: '15%' }, message: `Select File Type <b>Excel (.xslx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        { position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>` }
      ]
    },
    'Performance Status SF': {
      identifiers: ['#webiViewFrame'],
      popups: [
        { position: { top: '35%', left: '72%' }, message: `This is the <a href="https://nbcuni.sharepoint.com/sites/thrivelibrary/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2Fthrivelibrary%2FShared%20Documents%2FHR%20Operations%20%26%20Systems%2FGlobal%2FReporting%20Training%2FPerformance%20Status%20Report%20SuccessFactors%20Job%20Aid%2Epdf&parent=%2Fsites%2Fthrivelibrary%2FShared%20Documents%2FHR%20Operations%20%26%20Systems%2FGlobal%2FReporting%20Training" target="_blank">Performance Status Report</a>! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        { position: { top: '35%', left: '72%' }, message: `To set filter criteria, Click one of the criteria under <b>Prompts Summary</b>. Type an asterisk (<b>*</b>) into the bottom search bar and hit Enter on your keyboard. Select your desired value(s) from the list and click the right arrow.` },
        { position: { top: '35%', left: '72%' }, message: `Click <b>OK</b> to run the report` },
        { position: { top: '40px', left: '185px' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('export.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        { position: { top: '35%', left: '15%' }, message: `Select File Type <b>Excel (.xslx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        { position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>` }
      ]
    },
    'Position Status Report': {
      identifiers: ['#webiViewFrame'],
      popups: [
        { position: { top: '35%', left: '72%' }, message: `This is the Position Status Report! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        { position: { top: '35%', left: '72%' }, message: `To set filter criteria, Click one of the criteria under <b>Prompts Summary</b>. Type an asterisk (<b>*</b>) into the bottom search bar and hit Enter on your keyboard. Select your desired value(s) from the list and click the right arrow.` },
        { position: { top: '35%', left: '72%' }, message: `Click <b>OK</b> to run the report` },
        { position: { top: '40px', left: '185px' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('export.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        { position: { top: '35%', left: '15%' }, message: `Select File Type <b>Excel (.xslx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        { position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>` }
      ]
    },
    'Diversity Movement Summary': {
      identifiers: ['#webiViewFrame'],
      popups: [
        { position: { top: '35%', left: '72%' }, message: `This is the Diversity Movement Summary (Actions) Report! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        { position: { top: '35%', left: '72%' }, message: `First, filter by your desired date ranges using <b>Previous Action Effective Date (Start)</b> and <b>Current Action Effective Date (End)</b>. ` },
        { position: { top: '35%', left: '72%' }, message: `Next, click <b>OK</b> to run the report` },
        { position: { top: '40px', left: '185px' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('export.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        { position: { top: '35%', left: '15%' }, message: `Select File Type <b>Excel (.xslx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        { position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>` }
      ]
    },
    'Diversity Worforce Summary - PIT': {
      identifiers: ['#webiViewFrame'],
      popups: [
        { position: { top: '35%', left: '72%' }, message: `This is the Diversity Worforce Summary - PIT Report! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        { position: { top: '35%', left: '72%' }, message: `First, filter by your desired dates using <b>Prior Point in Time Reporting Date (Start)</b> and <b>Point in Time Reporting Date</b>. ` },
        { position: { top: '35%', left: '72%' }, message: `Next, click <b>OK</b> to run the report` },
        { position: { top: '40px', left: '185px' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('export.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        { position: { top: '35%', left: '15%' }, message: `Select File Type <b>Excel (.xslx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        { position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>` }
      ]
    },
  };

  const { identifiers, popups } = pageConfig[currentPage];
  waitForAnyElement(identifiers, function(element) {
    if (element) {
      console.log(`Element found for ${currentPage}:`, element);
      setTimeout(() => showPopupSeries(firstName, popups, 0, []), 250);
    } else {
      console.warn(`Identifier element not found for ${currentPage}`);
    }
  });
});
}

function showPopupSeries(firstName, popupSteps, currentIndex, history) {
  chrome.storage.sync.get(['popupsEnabled'], function(result) {
    let popupsEnabled = result.popupsEnabled;
  if (!popupsEnabled) return;
  if (currentIndex >= popupSteps.length) return;
  const step = popupSteps[currentIndex];
  const { position, message } = step;
  history.push(currentIndex);
  displayPopupAtPosition(position, message, currentIndex, popupSteps.length, () => {
    setTimeout(() => showPopupSeries(firstName, popupSteps, currentIndex + 1, history), 500);
  }, () => {
    if (history.length > 1) {
      history.pop();
      const previousIndex = history.pop();
      setTimeout(() => showPopupSeries(firstName, popupSteps, previousIndex, history), 500);
    }
  });
});
}

function displayPopupAtPosition(position, message, currentIndex, totalSteps, onNext, onBack) {
  const popup = createPopup(message, currentIndex, totalSteps, onNext, onBack);
  if (position.top.endsWith('%')) {
    const topPercentage = parseFloat(position.top) / 100;
    const topPixels = window.innerHeight * topPercentage;
    popup.style.top = `${topPixels}px`;
  } else {
    popup.style.top = position.top;
  }
  if (position.left.endsWith('%')) {
    const leftPercentage = parseFloat(position.left) / 100;
    const leftPixels = window.innerWidth * leftPercentage;
    popup.style.left = `${leftPixels}px`;
  } else {
    popup.style.left = position.left;
  }
  document.body.appendChild(popup);
}

function createPopup(message, currentIndex, totalSteps, onNext, onBack) {
  const popup = document.createElement('div');
  popup.classList.add('fade-in', 'popup');
  popup.style.position = 'absolute';
  popup.style.padding = '10px';
  popup.style.backgroundColor = '#FEF5B1';
  popup.style.border = '2.5px solid #000000';
  popup.style.borderradius = '25px';
  popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
  popup.style.zIndex = 10000;
  popup.style.width = '300px';
  popup.style.height = 'auto';
  popup.style.textAlign = 'center';
  popup.style.fontFamily = 'Rock sans, sans-serif';
  popup.style.fontWeight = '525'; 
  popup.style.fontSize = '18px';
  popup.style.display = 'inline-block';
  popup.style.borderRadius = '20px';

  let isDragging = false;
  let startX, startY;

  // Mouse down event to start dragging
  popup.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX - popup.offsetLeft;
    startY = e.clientY - popup.offsetTop;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    e.preventDefault(); // Prevent text selection during drag
  });

  function onMouseMove(e) {
    if (isDragging) {
      requestAnimationFrame(() => {
        popup.style.left = e.clientX - startX + 'px';
        popup.style.top = e.clientY - startY + 'px';
      });
    }
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  const messageElement = document.createElement('p');
  messageElement.style.marginTop = '30px';
  messageElement.style.marginBottom = '15px';
  popup.appendChild(messageElement);
  messageElement.innerHTML = message;

  if (currentIndex === totalSteps - 1 && reportPrompt) {
    const gif = document.createElement('img');
    gif.src = chrome.runtime.getURL('congrats.webp');
    gif.style.width = '100%'; 
    gif.style.height = 'auto';
    messageElement.innerHTML = message; // + "Step " + (currentIndex + 1) +"/ " + totalSteps;
    popup.appendChild(gif)
  } else {
    messageElement.innerHTML = message; //+ "Step " + (currentIndex + 1) +"/ " + totalSteps;
  }

  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.justifyContent = 'space-between';
  //buttonContainer.style.marginTop = '10px';

  if (currentIndex > 0) {
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.style.fontWeight = '200';
    backButton.style.fontSize = '18px';
    backButton.style.padding = '5px';
    backButton.style.marginRight = '175px';
    backButton.style.cursor = 'pointer';
    backButton.style.borderRadius = '5px';
    backButton.style.fontFamily = 'Rock sans, sans-serif';
    backButton.addEventListener('click', () => {
      popup.remove();
      onBack();
    });
    buttonContainer.appendChild(backButton);
  }

  const nextButton = document.createElement('button');
  nextButton.textContent = currentIndex === totalSteps - 1 ? 'Close' : 'Next';
  nextButton.style.fontFamily = 'Rock sans, sans-serif';
  nextButton.style.fontWeight = '200';
  nextButton.style.fontSize = '18px';
  nextButton.style.padding = '5px';
  nextButton.style.marginRight = '5px';
  nextButton.style.cursor = 'pointer';
  nextButton.style.borderRadius = '5px';
  nextButton.style.marginBottom = '5px';
  nextButton.addEventListener('click', () => {
    minionGuide.src = chrome.runtime.getURL('');
    popup.remove();
    onNext();
    console.log(currentIndex + "/ " + totalSteps);
    if (currentIndex === totalSteps - 1) {
      addGifToggle();
    }
  });
  buttonContainer.appendChild(nextButton);

  const exitButton = document.createElement('button');
  exitButton.style.position = 'absolute';
  exitButton.innerHTML = '&times;';
  exitButton.style.top = '1px';
  exitButton.style.right = '1px';
  exitButton.style.backgroundColor = '#e02d2d';
  exitButton.style.color = 'white';
  exitButton.style.fontSize = '21px';
  exitButton.style.fontWeight = 'bold';
  exitButton.style.padding = '0 5px';
  exitButton.style.cursor = 'pointer';
  exitButton.style.width = '25px';
  exitButton.style.height = '25px';
  exitButton.style.lineHeight = '15px'; 
  exitButton.style.textAlign = 'center';
  exitButton.style.marginBottom = '5px';
  exitButton.style.marginRight = '10px';
  exitButton.style.marginTop = '10px';
  exitButton.style.borderRadius = '5px';
  exitButton.style.fontFamily = 'Rock sans, sans-serif';
  exitButton.onmouseover = function() {
    exitButton.style.background = '#ff7575'; 
  };
  exitButton.onmouseout = function() {
    exitButton.style.background = '#e02d2d'; 
  };
     // Confirm before exiting the tutorial
  exitButton.onclick = function() {
    openConfirmationPopup();
  };

  buttonContainer.appendChild(exitButton);

// Function to create a custom confirmation popup
function openConfirmationPopup(popup) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = '10001';

  // Create confirmation modal
  const confirmPopup = document.createElement('div');
  confirmPopup.style.position = 'fixed';
  confirmPopup.style.top = '50%';
  confirmPopup.style.left = '50%';
  confirmPopup.style.transform = 'translate(-50%, -50%)';
  confirmPopup.style.padding = '20px';
  confirmPopup.style.backgroundColor = '#fff';
  confirmPopup.style.border = '2px solid #000';
  confirmPopup.style.borderRadius = '10px';
  confirmPopup.style.zIndex = '10002';
  confirmPopup.style.textAlign = 'center';

  // Confirmation message
  const message = document.createElement('p');
  message.textContent = "Are you sure you want to exit the tutorial?";
  confirmPopup.appendChild(message);

  // OK Button
  const okButton = document.createElement('button');
  okButton.style.fontFamily = 'Rock sans, sans-serif';
  okButton.textContent = 'OK';
  okButton.style.marginRight = '10px';
  okButton.style.cursor = 'pointer';
  okButton.addEventListener('click', () => {
    // Close the confirmation and exit the tutorial
    document.body.removeChild(overlay);
    document.body.removeChild(confirmPopup);
    closeAllPopups();
    console.log('Pop-ups disabled');
    popupsEnabled = false; // Stop further pop-ups
    chrome.storage.sync.set({ 'popupsEnabled': false });
    addGifToggle();  
  });

  // Cancel Button
  const cancelButton = document.createElement('button');
  cancelButton.style.fontFamily = 'Rock sans, sans-serif';
  cancelButton.textContent = 'Cancel';
  cancelButton.style.cursor = 'pointer';
  cancelButton.addEventListener('click', () => {
    // Close the confirmation without exiting the tutorial
    document.body.removeChild(overlay);
    document.body.removeChild(confirmPopup);
  });

  // Append buttons to the confirmation popup
  confirmPopup.appendChild(okButton);
  confirmPopup.appendChild(cancelButton);

  // Append everything to the document
  document.body.appendChild(overlay);
  document.body.appendChild(confirmPopup);
}

  popup.appendChild(buttonContainer);

  const minionGuide = document.createElement('img');
  var randomNumber = Math.floor(Math.random() * 6) + 1;

// Set the variable based on the random number
var minionEmote;

switch(randomNumber) {
    case 1:
        minionEmote = "groovyminion.gif";
        break;
    case 2:
        minionEmote = "hellominion.gif";
        break;
    case 3:
        minionEmote = "coolminion.gif";
        break;
    case 4:
        minionEmote = "thumbsup.gif";
        break;
    case 5:
        minionEmote = "eurekaminion.gif";
        break;
    case 6:
        minionEmote = "cuteminion.gif";
        break;
}

console.log(minionEmote); // Output the selected string

  
  minionGuide.src = chrome.runtime.getURL(minionEmote);
  minionGuide.style.width = '50%'; 
  minionGuide.style.height = 'auto';
  minionGuide.style.right = '20px';
  popup.appendChild(minionGuide)
  minionGuide.addEventListener('mouseover', () => {
    minionGuide.src = chrome.runtime.getURL('');
    minionGuide.src = chrome.runtime.getURL(minionEmote);
  });

  return popup;
}

function closeAllPopups() {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => popup.remove());
}

function addGifToggle() {
  chrome.storage.sync.get(['gogglesEnabled'], function(result) {
    let gogglesEnabled = result.gogglesEnabled; 

    // Create a wrapper for the minion and chat bubble
    const minionWrapper = document.createElement('div');
    minionWrapper.style.position = 'fixed';
    minionWrapper.style.right = '10px';
    minionWrapper.style.bottom = '20px';
    minionWrapper.style.zIndex = 10000;
    minionWrapper.title = "Click me to start Tutorial!";

    // Create the minion GIF element
    const gifElement = document.createElement('img');
    gifElement.src = chrome.runtime.getURL('confusedminion.webp');
    gifElement.style.position = 'relative';  // Relative to the wrapper
    gifElement.style.width = '10vw';  // Adjust size as needed
    gifElement.style.cursor = 'pointer';
    gifElement.title = "Click me to start Tutorial!";
    gifElement.id = 'tutorialMinion';
    gifElement.style.transition = 'opacity 0.5s ease-in-out';

    // Create a minimize button
    const minimizeButton = document.createElement('div');
    minimizeButton.innerHTML = '&#8722;'; // Minus sign for minimization
    minimizeButton.style.position = 'absolute';
    minimizeButton.style.top = '0';
    minimizeButton.style.right = '0';
    minimizeButton.style.cursor = 'pointer';
    minimizeButton.style.fontSize = '16px';
    minimizeButton.style.background = 'yellow';
    minimizeButton.style.fontWeight = 'bold';
    minimizeButton.style.border = '1px solid #CCC';
    minimizeButton.style.borderRadius = '50%';
    minimizeButton.style.padding = '2px';

    // Create the chat bubble element
    const chatBubble = document.createElement('div');
    chatBubble.style.position = 'absolute';
    chatBubble.style.width = '12vw';  // Adjust width as needed
    chatBubble.style.height = '100px';
    chatBubble.style.top = '-10%'; // Adjust this value to position the bubble above the minion
    chatBubble.style.left = '-80%'; // Adjust this value to position the bubble to the left of the minion
    chatBubble.style.backgroundImage = `url(${chrome.runtime.getURL('speech-bubble1.png')})`;
    chatBubble.style.backgroundSize = 'contain';
    chatBubble.style.backgroundRepeat = 'no-repeat';
    chatBubble.style.zIndex = 10001;
    chatBubble.style.opacity = '0'; // Initially invisible
    chatBubble.style.transition = 'opacity 0.5s ease-in-out';

// Function to inject the script and set up the event listener
function injectScriptAndSetupListener() {
  console.log("heres the iframe:" + iframeId);
  console.log('Running Script Listener 1', reportName);
  console.log('Running Script Listener 2', reportName);
  // Set up the event listener for the injected script
  window.top.addEventListener('message', (event) => {
    console.log('Running Script Listener 3', reportName);
      if (event.data.type && event.data.type === 'FROM_PAGE') {
        console.log('Running Script Listener 4', reportName);
          let reportName = event.data.reportName.split('(')[0].trim();
          chrome.storage.sync.set({ 'reportName': reportName });
          console.log('Report Name from DS:', reportName + iframeId);
          const reports = {
              "Person": () => console.log('GAL Report'),
              "Flexible employee Report - NON SA": () => console.log("Flex EE"),
              "Flexible Actions Report": () => console.log('Flexible Actions Report'),
              "Employee Detail Census": () => console.log('Employee Detail Census'),
              "Compensation Report": () => console.log('Compensation Ad Hoc Report'),
              //"Query 1": () => console.log('Employee Contact Info OR Job Structure Report (Compensation)'),
              "Reward & Recognition": () => console.log('GEM Report'),
              "SAP": () => console.log('SAP Salary History Report'),
              "OHR": () => console.log('OHR Salary History Report'),
              "Diversity Movement Summary (Actions)": () => console.log('Diversity Movement Summary (Actions)'),
              "Diversity Worforce Summary - PIT": () => console.log('Diversity Worforce Summary - PIT'),
              "Employee Headcount Rollup Summary": () => console.log('Employee Headcount Rollup Summary'),
              "Query1": () => console.log('Employee Terminations OR Promotions'),
              "Performance Status SF": () => console.log('Performance Status Report')
          };

          // Check if the report name matches any key and call the corresponding function
          if (reports[reportName]) {
            reports[reportName](); // Call the function for the matched value
        } else {
            console.log('GIF Clicked: No match found');
            setTimeout(() => showRelevantPopupSeries(firstName, 'generic_report'), 1100);
        }
        console.log("GIF Clicked Report Listener");
        setTimeout(() => showRelevantPopupSeries(firstName, reportName), 1100);
      }
  });
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('inject.js');
  (document.head || document.documentElement).appendChild(script);
}

    // Append the minion and chat bubble to the wrapper
    minionWrapper.appendChild(gifElement);
    if (document.querySelector('#navNodeAnchor_1_1')) {
    minionWrapper.appendChild(chatBubble);
    }
    minionWrapper.appendChild(minimizeButton);
    document.body.appendChild(minionWrapper);

    // Minimized mode (eyeballs)
    const eyeballsElement = document.createElement('img');
    eyeballsElement.src = chrome.runtime.getURL('blinking.webp'); // Replace with eyeballs image
    eyeballsElement.style.position = 'fixed';
    eyeballsElement.style.width = '5vw';
    eyeballsElement.style.right = '20px';
    eyeballsElement.style.bottom = '35px';  // Lower position
    eyeballsElement.style.cursor = 'pointer';
    eyeballsElement.style.display = 'none';  // Hidden initially
    eyeballsElement.style.zIndex = 10004;
    eyeballsElement.style.transition = 'opacity 0.5s ease-in-out';
    document.body.appendChild(eyeballsElement);

    // Function to minimize the minion
    function minimizeMinion() {
      gifElement.style.transition = 'opacity 0.5s ease-in-out';  // Smooth transition for fading
      eyeballsElement.style.transition = 'opacity 0.5s ease-in-out';
      minimizeButton.style.transition = 'opacity 0.5s ease-in-out';

      gifElement.style.opacity = '0';  // Fade out the minion
      chatBubble.style.opacity = '0';  // Fade out the chat bubble
      minimizeButton.style.opacity = '0';  // Hide minimize button
      setTimeout(() => {
        gifElement.style.display = 'none';  // Hide the minion after fading out
        chatBubble.style.display = 'none';  // Hide the chat bubble
        minimizeButton.style.display = 'none';  // Hide minimize button
        eyeballsElement.style.opacity = '1';  // Fade in the eyeballs
        eyeballsElement.style.display = 'block';  // Show the eyeballs
      }, 500);  // Delay to allow the fade-out effect
      chrome.storage.sync.set({ 'gogglesEnabled': true });  // Store minimized state
    }

    // Function to restore the minion
    function restoreMinion() {
      gifElement.style.display = 'block';  // Show the minion
      chatBubble.style.display = 'block';  // Show the chat bubble
      minimizeButton.style.display = 'block';  // Show minimize button
      eyeballsElement.style.transition = 'opacity 0.5s ease-in-out';  // Smooth transition for fading
      gifElement.style.transition = 'opacity 0.5s ease-in-out';
      minimizeButton.style.transition = 'opacity 0.5s ease-in-out';

      eyeballsElement.style.opacity = '0';  // Fade out the eyeballs
      setTimeout(() => {
        eyeballsElement.style.display = 'none';  // Hide the eyeballs after fading out
        gifElement.style.opacity = '1';  // Fade in the minion
        chatBubble.style.opacity = '1';  // Fade in the chat bubble
        minimizeButton.style.opacity = '1';  // Show minimize button
      }, 1000);  // Delay to allow the fade-out effect
      chrome.storage.sync.set({ 'gogglesEnabled': false });  // Remove minimized state
    }

    // Event listeners for minimize and restore
    minimizeButton.addEventListener('click', minimizeMinion);
    eyeballsElement.addEventListener('click', restoreMinion);

    // Fade-in effect for the GIF and chat bubble
    setTimeout(() => {
      gifElement.style.opacity = '0.9';
      chatBubble.style.opacity = '1';  // Show the chat bubble right after the minion
    }, 500);

    // Automatically fade out the chat bubble after 5 seconds
    setTimeout(() => {
      chatBubble.style.opacity = '0';  // Hide the chat bubble after 5 seconds
    }, 5000); // Adjust timing as needed

    // Scale the minion dynamically based on the window width
    function scaleMinion() {
      const windowWidth = window.innerWidth;
      if (windowWidth < 1600) {
        gifElement.style.width = '8vw';
        chatBubble.style.top = '-50%'; // Adjust this value to position the bubble above the minion
        chatBubble.style.left = '-132%'; // Adjust this value to position the bubble to the left of the minion
      } else {
        gifElement.style.width = '10vw';
      }
    }

    window.addEventListener('resize', scaleMinion);
    scaleMinion(); // Initial scaling

    // Minion interactions
    gifElement.addEventListener('mouseover', () => {
      gifElement.style.opacity = '1';
      gifElement.src = chrome.runtime.getURL('confusedminion.webp');
    });

    gifElement.addEventListener('mouseout', () => {
      gifElement.style.opacity = '0.9';
    });

    gifElement.addEventListener('click', () => {
      popupsEnabled = true;
      gifClicked = true;
      reportName = '';
      chrome.storage.sync.set({ 'popupsEnabled': true });
      if (document.querySelector('#webiViewFrame')) {
      // Inject the script and set up the listener when the minion is clicked
      console.log('About to run script listener:', reportName);
      injectScriptAndSetupListener();
      // Retrieve the report name after the script has been injected and message has been processed
      chrome.storage.sync.get('reportName', function(result) {
          const reportName = result.reportName;
          if (reportName) {
              displayPopups();
              console.log('Report Name from storage:', reportName);
          } else {
              console.warn('No report name found in storage.');}});
            } else {displayPopups();}
      gifElement.style.transition = 'opacity 0.5s ease-in-out';
      gifElement.style.opacity = '0';
      setTimeout(() => {
        minionWrapper.remove(); // Remove the entire wrapper, including both elements
      }, 500);
    });

    // Call minimizeMinion after everything is initialized
    if (gogglesEnabled) {
      minimizeMinion();  // Minimize if previously minimized
    }
  });
}

window.onload = function() {
  // Retrieve the value of 'popupsEnabled' from chrome.storage.sync
  chrome.storage.sync.get('popupsEnabled', function(result) {
    let popupsEnabled = result.popupsEnabled;
    console.log('popupsEnabled = ' + popupsEnabled);

    const targetDomain = 'bo42corpsysbhp.inbcu.com'; // Replace with your desired domain
    const currentDomain = window.location.hostname; // Get the current domain
    const correctDomain = (currentDomain === targetDomain);
    console.log(currentDomain + " " + correctDomain + " " + targetDomain);

    if (popupsEnabled !== undefined) { // If popupsEnabled exists
      console.log("Window loaded");
      console.log('popupsEnabled = ' + popupsEnabled);

      if (popupsEnabled) {
        popupsEnabled = true;
        displayPopups();
        console.log('Displaying Pop-ups');
      } else {
        if (correctDomain) {
          console.log('BW Environment Loaded');
          console.log(iframeId);
          if (iframeId === 'iframe4681-5055721' || document.querySelector('#webiViewFrame') || iframeId === 'iframeHome-5055721' || document.querySelector('#ListingURE_content')) {
            addGifToggle(); // Initialize the gif toggle on load
            console.log('Displaying Minion');
          }
        } else {
          addGifToggle(); // Initialize the gif toggle on load
          console.log('Displaying Minion');
        }
      }
    } else { // First-time run or no value found
      console.log('popupsEnabled was undefined...first time run');
      popupsEnabled = false; // Default to false
      console.log('Popups disabled');
      addGifToggle(); // Initialize the gif toggle on load
      // Save the default value to storage
      chrome.storage.sync.set({ 'popupsEnabled': false }, function() {
        console.log("Initial popupsEnabled value saved as false");
      });
    }
  });
};

function waitForAnyElement(selectors, callback) {
  const intervalId = setInterval(() => {
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(intervalId);
        callback(element);
        return;
      }
    }


  }, 500);
}