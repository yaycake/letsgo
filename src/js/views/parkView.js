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
  hikingContent: document.querySelector('.hiking_content'), 
  campingContent: document.querySelector('.camping_content'),
  parkWeather: document.querySelector('.park_weather'),
  parkMapLink: document.querySelector('.park_map')
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
          ${hikesArray[i]["length"]} Miles  | Difficulty: ${hikesArray[i]["difficulty"]} |  ${hikesArray[i]["location"]}
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
}
export const renderMountainContent = (climbsArray) => {
  if (climbsArray.length > 0){
    let i;
    for (i = 0; i < climbsArray.length; i ++){
      const markup = `
        <li>
          <a href="${climbsArray[i]["url"]}""  target="_blank">
            <span class="item_title"><strong> ${climbsArray[i]["name"]} </strong></span>
          </a>
          <p class="item_text">
          Type: ${climbsArray[i]["type"]} |
          ${climbsArray[i]["stars"]} Stars |
          ${climbsArray[i]["rating"]} Rating |
          Pitches: ${climbsArray[i]["pitches"]}
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
}

export const renderWeather = (weather) => {
  console.log(`We're in weather: ${weather}`)

  const markup = `
    <div class = "weather_icon" style="background: url('img/${weather.icon}'); background-repeat: no-repeat; background-position: center; background-size: 75%">
    </div>
    <div class="weather_desc"> ${Math.ceil(weather["currentTemp"])}F ${weather["description"]}</div>
  `
  elements.parkWeather.insertAdjacentHTML('afterbegin', markup)
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

export const renderMapEmbed = (link) => {

  console.log("Im in renderMapEmbed!")

  console.log(`this is the link: ${link}`)
  const markup = `
  <iframe
  width="300"
  height="150"
  frameborder="0" style="border:0"
  src="${link}" allowfullscreen>
  </iframe>
  `
  elements.parkMapLink.insertAdjacentHTML('afterbegin', markup)
}

