const elements = {
  parkHeader: document.querySelector('.park_header'),
  parkStates: document.querySelector('.states'),
  // parkAlert: document.querySelector('.alerts_ticker_move')
  parkAlert: document.querySelector('.ticker_wrap'),

  activityMenu: document.querySelector('.tab_menu'),
  activityContent: document.getElementsByClassName("activity_content"),
  activityLinks: document.getElementsByClassName("tablinks")

}

// Clear previous park results
export const clearPark = () => {
  elements.parkHeader.innerHTML = ''
}
// Render Park Header: Title + Summary
export const renderParkHeader = (park) => {
  console.log("in renderParkHeader: About to split park title:")

  console.log(park)
  const splitTitle = splitParkTitle(park.name)

  console.log(`here is splitTitle: ${splitTitle}`)


  const markup = `
    <div class="profile_title_summary">
      <div class="park_title">
        <h1>${splitTitle.parkName}</h1>
        <h2>${splitTitle.parkSubname}</h2>
      </div>
      <div class="park_summary">
        <h4>
          ${park.summary}
        </h4>
      </div>
    </div>
  `
  elements.parkHeader.insertAdjacentHTML('afterbegin', markup)
}

export const renderParkVisit = (park) => {
  const statesMarkup = `
    <div class="states_title">
          <h3>States</h3>
        </div>
        <ul class="states_list">
          <li><p>${park.states}</p></li>
        </ul>
  `
  elements.parkStates.insertAdjacentHTML('afterbegin', statesMarkup)
}

// SPLIT AND BUILD PARK TITLE

const splitParkTitle = (parkTitle) => {
  const regex = new RegExp('/(national)/', 'i');
  const split = parkTitle.split('National')
  const title = {
    parkName: split[0],
    parkSubname: `National ${split[1]}`
  }
  return title
}

export const renderParkAlerts = (parkAlerts) => {
  console.log('inside render park alerts')
  console.log(parkAlerts)

  parkAlerts.forEach(function(alert){
    if (alert.url){
      const markup = `
        <div class="alert_item">
          <a class="alert_link" href="${alert.url}" target="_blank">
            ${alert.title}: ${alert.description}
          </a>
        </div>
      `
      elements.parkAlert.insertAdjacentHTML('beforeend', markup)
    } else {
      const markup = `
        <div class="alert_item">
            ${alert.title}:${alert.description}
        </div>
      `
      elements.parkAlert.insertAdjacentHTML('beforeend', markup)
    }
  })
}

export const renderNoParkAlerts = () =>{
  const markup = `
    <div class="alert_item">
      No Alerts For This Park
    </div>
  `
  elements.parkAlert.insertAdjacentHTML('beforeend', markup)
}

export const defaultTabOpen = () => {
  document.querySelector('.hiking_content').style.display= "block"
}

export const viewTabContent = ( activity ) => {
  console.log("you're in ViewTabContent!")
  console.log(activity)


  let i

  for (i = 0; i < elements.activityContent.length; i++) {
    elements.activityContent[i].style.display = "none";
  }

  // for (i=0; i < elements.activityLinks.length; i++){
  //   elements.activityLinks[i].className = elements.activityLinks[i].className.replace(" active", "");
  // }

  document.getElementById(activity).style.display = "block"


}



