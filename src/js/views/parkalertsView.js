

//clear previous park alerts results

export const renderParkAlerts = (parkAlerts) => {
  console.log('inside render park alerts')
  console.log(parkAlerts)

  parkAlerts.forEach(function(alert){
    const markup = `
      <div class="alert_text">
        <a href="${alert.url}" target="_blank">
          <p><strong>${alert.title}</strong></p>
          <p>${alert.description}</p>
        </a>
      </div>
    `
    elements.parkAlert.insertAdjacentHTML('beforeend', markup)
  })

}

export const renderNoParkAlerts = () =>{
  return "No alerts for this park."
}
