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
    <div class="park_image" alt="park image" style="background:url(${park.imageUrl}); background-position: center; background-size: cover;">
    </div>
  `
  const markup2 = `
    <div class="park_image_2" alt="park image" style="background:url(${park.imageUrl}); background-position: center; background-size: cover;">
    </div>
  `
  elements.parkBody.insertAdjacentHTML('afterbegin', markup)
  elements.parkBody.insertAdjacentHTML('beforeend', markup2)
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
    <img class="icon_alert" alt="alerticon" src="img/icon_alert.png">
  `
  elements.parkAlert.insertAdjacentHTML('afterbegin', alerticon)

  if (parkAlerts.length > 0){
    parkAlerts.forEach(function(alert){
      
      if (alert.url){
        
        const markup = `
          <p class="alert_item">
            <a class="alert_link" href="${alert.url}" target="_blank" rel="noopener">
              ${alert.title}: ${alert.description}
            </a>
          </p>
        `
        elements.parkAlert.insertAdjacentHTML('beforeend', markup)
      } else {
        const markup = `
          <p class="alert_item">
              ${alert.title}:${alert.description}
          </p>
        `
        elements.parkAlert.insertAdjacentHTML('beforeend', markup)
      }
    })

  } else {
    const markup = `
      <p class="alert_item">
        No Alerts For This Park; Enjoy Your Visit!
      </p>
    `
    elements.parkAlert.insertAdjacentHTML('beforeend', markup)
  }
}

export const renderNoParkAlerts = () =>{
  const markup = `
    <p class="alert_item">
      No Alerts For This Park
    </p>
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
          <ul class="item_list">
            <li class="item_title"><a class="item_link" href="${hikesArray[i]["url"]}" target="_blank" rel="noopener"><strong>${hikesArray[i]["name"]}</strong></a>
            </li>
            <li class="item_li item_text"><p>${hikesArray[i]["summary"]}</p></li>
            <li class="item_li item_text">
              <p>
                <img class="icon_small" src="img/icon_distance.png" alt="distance">${hikesArray[i]["length"]} miles 
                <img src="img/icon_terrain.png" class="icon_small" alt="distance">${parseHikeLevel(hikesArray[i]["difficulty"])}
              </p>
            </li>
            <li class="item_li item_text"><img src="img/icon_map.png" class="icon_small" alt="distance"><p>${hikesArray[i]["location"]}</p></li>
          </ul>
        </li>
      `;
      elements.hikingContent.insertAdjacentHTML('beforeend', markup)
    }
  } else {
    const markup = `
    <li>
      <p>Not a lot of hikes nearby.</p>
    </li>
  `;
  elements.hikingContent.insertAdjacentHTML('beforeend', markup)
  }
  renderHikesTablink();
}

const renderHikesTablink = () => {
  const markup = `
  <img src="img/icon_hike.png" alt="hikingicon" class="activity_icon">
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
          <ul class="item_list">
            <li class="item_title"><a class="item_link" href="${climbsArray[i]["url"]}" target="_blank" rel="noopener"> <strong> ${climbsArray[i]["name"]} </strong> </a></li>
            <li class="item_text item_li">
              <p>
                <img class="icon_small" src="img/icon_type.png" alt="type">${climbsArray[i]["type"]}
                <img class="icon_small" src="img/icon_stars.png" alt="stars"> ${climbsArray[i]["stars"]} stars 
                <img class="icon_small" src="img/icon_rate.png" alt="rate"> ${climbsArray[i]["rating"]} Rating 
              </p>
            </li>
            <li class="item_text item_li"><img class="icon_small" src="img/icon_map.png" alt="rate"><p>${locationString}</p></li>
          </ul>
        </li>
      `
      elements.mountainContent.insertAdjacentHTML('beforeend', markup)
    }
  } else {
    const markup = `
      <li><p>No Climbs Nearby; Go Hiking!</p></li>
    `
    elements.mountainContent.insertAdjacentHTML('beforeend', markup)
  }
  renderClimbsTablink();
}

const renderClimbsTablink = () => {
  const markup = `
  <img src="img/icon_climb.png" alt="climbingicon" class="activity_icon">
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
        <a href="https://www.nps.gov/${currentParkCode}/planyourvisit/index.htm" target="_blank" rel="noopener">
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
          <p>
          No camping; maybe 
          <a href="https://www.bbcgoodfood.com/recipes/collection/picnic" target="_blank" rel="noopener">plan a picnic!</a>
          </p>
        </li>
      `
      elements.campingContent.insertAdjacentHTML('beforeend', markup)
  }
  renderCampsTablink();
}

const renderCampsTablink = () => {
  const markup = `
  <img src="img/icon_camp.png" alt="campingicon" class="activity_icon">
  <span class="activity_label">Camping</span>
  `
  elements.campingTab.insertAdjacentHTML('afterbegin', markup)
}

export const renderWeather = (weather) => {
  // console.log(`We're in weather: ${weather}`)
  const markup = `
    <div class="park_weather">
      <strong><p>Current Conditions: </p></strong>
      <img src="img/${weather.icon}" alt="weathericon" class="weather_icon">
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
  <img src="img/icon_map.png" alt="mapicon" class="activity_icon">
  <span class="activity_label">Map</span>
  `
  elements.mapTab.insertAdjacentHTML('afterbegin', markup)
}


export const renderMapEmbed = (link) => {

  console.log("Im in renderMapEmbed!")

  console.log(`this is the link: ${link}`)
  const markup = `
  <iframe
  width="100%"
  height="400"
  frameborder="0" style="border:0"
  src="${link}" allowfullscreen>
  </iframe>
  `
  elements.parkMapLink.insertAdjacentHTML('afterbegin', markup)

  renderMapTablink();
}


export const renderLoader = () => {
  setTimeout(showPage, 3000);
}
const showPage=()=> {
  // document.getElementById("load").style.display = "none";
  // document.getElementById("pagebody").style.display = "grid";

  document.getElementById("load").style.display = "none";
  document.getElementById("pagebody").style.display = "grid";
}
