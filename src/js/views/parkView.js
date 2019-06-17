import { fadeIn } from '../models/base';

export const elements = {
  parkHeader: document.querySelector('.park_header'),
  parkBody: document.querySelector('.body_grid'),
  // parkStates: document.querySelector('.states'),
  parkAlert: document.querySelector('.ticker_wrap'),
  activityMenu: document.querySelector('.tab_menu'),
  activityContent: document.getElementsByClassName("activity_content"),
  activityLinks: document.getElementsByClassName("tablinks"),
  mountainContent: document.querySelector('.mountain_content'), 
  climbingTab: document.querySelector('.climbing'),
  hikingContent: document.querySelector('.hiking_content'), 
  hikingTab: document.querySelector('.hiking'),
  campingContent: document.querySelector('.camping_content'),
  campingTab: document.querySelector('.camping'),
  parkWeather: document.querySelector('.park_weather'),
  // parkMapLink: document.querySelector('.park_map'), 
  mapTab: document.querySelector('.mapping'),
  parkMapLink: document.getElementById('map'),


  loader: document.querySelector('.loader')
}

// Clear previous park results
export const clearPark = () => {
  elements.parkHeader.innerHTML = ''
}
// Render Park Header: Title + Summary
export const renderParkHeader = (park) => {
  console.log("in renderParkHeader: About to split park title:")

  console.log(park)
  // const splitTitle = splitParkTitle(park.name)
  // console.log(`here is splitTitle: ${splitTitle}`)

  const markup = `
    <div class="profile_title_summary">
      <div class="park_title">
        <h1>${park.name}</h1>
        <h2>${park.parkType}</h2>
      </div>
      <div class="park_summary">
        <p>
          ${park.summary}
        </p>
      </div>
    </div>
  `
  elements.parkHeader.insertAdjacentHTML('afterbegin', markup)
}

export const renderParkImage = (park) => {
  const markup = `
    <div class="park_image" style="background:url(${park.imageUrl}); background-position: center; background-size: cover;">
    </div>
  `
  elements.parkBody.insertAdjacentHTML('afterbegin', markup)
  elements["parkImage"] = document.querySelector('.park_image')
}

// export const selectParkImage = () => {
//   elements.parkImage = document.querySelector('.park_image')
// }

// export const renderParkVisit = (park) => {
//   const statesMarkup = `
//     <div class="states_title">
//           <h3>States</h3>
//         </div>
//         <ul class="states_list">
//           <li><p>${park.states}</p></li>
//         </ul>
//   `
//   elements.parkStates.insertAdjacentHTML('afterbegin', statesMarkup)
// }

// SPLIT AND BUILD PARK TITLE

// const splitParkTitle = (parkTitle) => {
//   const regex = new RegExp('/(national)/', 'i');
//   const split = parkTitle.split('National')
//   const title = {
//     parkName: split[0],
//     parkSubname: `National ${split[1]}`
//   }
//   return title
// }

export const renderParkAlerts = (parkAlerts) => {
  console.log('inside render park alerts')
  console.log(parkAlerts)

  const alerticon = `
    <img class="icon_alert" src="img/icon_alert.png">
  `

  elements.parkAlert.insertAdjacentHTML('afterbegin', alerticon)

  if (parkAlerts.length > 0){

    console.log("AYE THERE BE PARK ALERTS")
    parkAlerts.forEach(function(alert){
      
      if (alert.url){
        console.log("RENDERING PARK ALERT + URL")
        
        const markup = `
          <div class="alert_item">
            <a class="alert_link" href="${alert.url}" target="_blank">
              ${alert.title}: ${alert.description}
            </a>
          </div>
        `
        
        elements.parkAlert.insertAdjacentHTML('beforeend', markup)
      } else {
        console.log("RENDERING PARK ALERT NO URL")
        const markup = `
          <div class="alert_item">
              ${alert.title}:${alert.description}
          </div>
        `
        elements.parkAlert.insertAdjacentHTML('beforeend', markup)
      }
    })

  } else {
    const markup = `
      <div class="alert_item">
        No Alerts For This Park; Enjoy Your Visit!
      </div>
    `
    elements.parkAlert.insertAdjacentHTML('beforeend', markup)
  }
  
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
  let i;
  for (i = 0; i < elements.activityContent.length; i++) {
    elements.activityContent[i].style.display = "none";
  }
  document.getElementById(activity).style.display = "block"
}

export const activeTabButton = (activity) => {
  console.log("you're in ActiveTabButton!")
  console.log(activity)
  let i;
  for (i=0; i < elements.activityLinks.length; i ++){
    elements.activityLinks[i].style.borderBottom = "none"
  }
  document.querySelector(`.${activity}`).style.borderBottom="2px solid whitesmoke"
}
export const renderHikesContent = (hikesArray) => {
  if (hikesArray.length > 0) {
    let i; 
    for (i =0; i < hikesArray.length; i ++) {
      const markup = `
        <li>
          <a href="${hikesArray[i]["url"]}" target="_blank">
          <span class="item_title"><strong>${hikesArray[i]["name"]}</strong></span> </a>
          <p class="item_text">${hikesArray[i]["summary"]}
          ${hikesArray[i]["length"]} Miles  | ${parseHikeLevel(hikesArray[i]["difficulty"])} |  ${hikesArray[i]["location"]}
          </p>
        </li>
      `;
      elements.hikingContent.insertAdjacentHTML('beforeend', markup)
    }
  } else {
    const markup = `
    <li>
      Not a lot of hikes nearby. 
    </li>
  `;
  elements.hikingContent.insertAdjacentHTML('beforeend', markup)
  }
  renderHikesTablink();
}

const renderHikesTablink = () => {
  const markup = `
  <img src="img/icon_hike.png" alt="" class="activity_icon">
  <span class="activity_label">Hiking</span>
  `
  elements.hikingTab.insertAdjacentHTML('afterbegin', markup)
}

const parseHikeLevel = (color) => {
  if (color == "green"){
    return "No obstacles; flat ground"
  } else if (color == "greenBlue"){
    return "Some uneven terrain, but mostly flat"
  } else if (color == "blue") {
    return "Uneven terrain and small inclines"
  } else if (color == "blueBlack"){
    return "Moderate inclines and some exciting obstacles, like rocks or roots "
  } else if (color == "black"){
    return "Tricky and steep terrain: not for beginners"
  } else {
    return "Experts only: potentially hazardous terrain; very steep"
  }
}


export const renderMountainContent = (climbsArray) => {
  if (climbsArray.length > 0){
    let i;
    for (i = 0; i < climbsArray.length; i ++){

      const locationString = climbsArray[i]["location"].reverse().join(', ')
      console.log(locationString)
      
      const markup = `
        <li>
          <a href="${climbsArray[i]["url"]}""  target="_blank">
            <span class="item_title"><strong> ${climbsArray[i]["name"]} </strong></span>
          </a>
          <p class="item_text">
          Type: ${climbsArray[i]["type"]} |
          ${climbsArray[i]["stars"]} Stars |
          ${climbsArray[i]["rating"]} Rating | ${locationString}
         
          </p>
        </li>
      `
      elements.mountainContent.insertAdjacentHTML('beforeend', markup)
    }
  } else {
    const markup = `
      <li>No Climbs Nearby; Go Hiking!</li>
    `
    elements.mountainContent.insertAdjacentHTML('beforeend', markup)
  }
  renderClimbsTablink();
}

const renderClimbsTablink = () => {
  const markup = `
  <img src="img/icon_climb.png" alt="" class="activity_icon">
  <span class="activity_label">Climbing</span>
  `
  elements.climbingTab.insertAdjacentHTML('afterbegin', markup)
}

export const renderCampingContent = (campsArray, currentParkCode) => {
  console.log("inside rendercamping content")
  
  if (campsArray.length > 0){
    let i;
    for (i=0; i <campsArray.length; i++){
      const markup = `
        <li>
        <a href="https://www.nps.gov/${currentParkCode}/planyourvisit/index.htm" target="_blank">
        // <span class="item_title"><strong> ${campsArray[i]["name"]}</strong></span>
        </a>
          <p class="item_text">
            
            <span>${campsArray[i]["description"]}</span>
          </p>
          
        </li>
      `

      elements.campingContent.insertAdjacentHTML('beforeend', markup)
    }
  } else {
    const markup = `
        <li>
          No camping; maybe 
          <a href="https://www.bbcgoodfood.com/recipes/collection/picnic" target="_blank">plan a picnic!</a>
        </li>
      `

      elements.campingContent.insertAdjacentHTML('beforeend', markup)
  }
  renderCampsTablink();
}

const renderCampsTablink = () => {
  const markup = `
  <img src="img/icon_camp.png" alt="" class="activity_icon">
  <span class="activity_label">Camping</span>
  `
  elements.campingTab.insertAdjacentHTML('afterbegin', markup)
}

export const renderWeather = (weather) => {
  console.log(`We're in weather: ${weather}`)

  // const markup = `
  //   <div class = "weather_icon" style="background: url('img/${weather.icon}'); background-repeat: no-repeat; background-position: center; background-size: 75%">
  //   </div>
  //   <div class="weather_desc"> ${Math.ceil(weather["currentTemp"])}F ${weather["description"]}</div>
  // `

  const markup = `
    <div class="park_weather">
      <p>Current Conditions: </p>
      <img src="img/${weather.icon}" alt="weather" class="weather_icon">
      <p class="weather_desc"> ${Math.ceil(weather["currentTemp"])}F ${weather["description"]} </p>
    </div>
  `
  // elements.parkWeather.insertAdjacentHTML('afterbegin', markup)

  elements.parkHeader.insertAdjacentHTML('beforeend', markup)
}


// export const renderMapLink = (mapLink) => {
//   console.log(`In renderMapLink: ${mapLink}`)
//   const markup = `
//   <a href="${mapLink}" target="_blank">
//     Directions
//   </a>
//   `

//   console.log(elements.parkMapLink)
//   elements.parkMapLink.insertAdjacentHTML('afterbegin', markup)
// }

const renderMapTablink = () => {
  console.log("in renderMapTabLink")
  const markup = `
  <img src="img/icon_map.png" alt="" class="activity_icon">
  <span class="activity_label">Map</span>
  `
  elements.mapTab.insertAdjacentHTML('afterbegin', markup)
}


export const renderMapEmbed = (link) => {

  console.log("Im in renderMapEmbed!")

  console.log(`this is the link: ${link}`)
  const markup = `
  <iframe
  width="500"
  height="400"
  frameborder="0" style="border:0"
  src="${link}" allowfullscreen>
  </iframe>
  `
  elements.parkMapLink.insertAdjacentHTML('afterbegin', markup)

  renderMapTablink();
}

