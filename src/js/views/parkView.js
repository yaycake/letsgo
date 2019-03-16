const parkElements = {
  parkHeader: document.querySelector('.profile_header'),
  parkStates: document.querySelector('.states'),
}
// Clear previous park results
export const clearPark = () => {
  parkElements.parkHeader.innerHTML = ''
}
// Render Park Header: Title + Summary
export const renderParkHeader = (park) => {
  const markup = `
    <div class="profile_title_summary">
      <div class="park_title">
        <h1>${park.name}</h1>
      </div>
      <div class="park_summary">
        <h4>
          ${park.summary}
        </h4>
      </div>
    </div>
  `
  parkElements.parkHeader.insertAdjacentHTML('afterbegin', markup)
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
  parkElements.parkStates.insertAdjacentHTML('afterbegin', statesMarkup)
}
