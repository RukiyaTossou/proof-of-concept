// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates inx
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorgt dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))
    

async function fetchData() {
  const site = await fetchJson('https://fdnd-agency.directus.app/items/frd_site')
  const allScans = await fetchJson('https://fdnd-agency.directus.app/items/frd_scans')
  const nieuwekijkScans = await fetchJson('https://fdnd-agency.directus.app/items/frd_site?filter[scans][_eq]=11&fields=id,title,scans.*')
  return { site: site.data, allScans: allScans.data, nieuwekijkScans: nieuwekijkScans.data }
}

app.get('/', async function (request, response) {
 
    const { site, allScans, nieuwekijkScans } = await fetchData()
    response.render('index', {
      site,
      allScans,
      nieuwekijkScans
    })
  
})

//De route voor de detailpagina van een specifieke site
app.get('/site/:id', async function (request, response) {
  try {
    // Haal de gegevens op
    const { site, allScans, nieuwekijkScans } = await fetchData()
    const siteId = request.params.id
    
    // Zoek de site op basis van de ID
    const currentSite = site.find(s => s.id == siteId)
    
    // Als de site niet gevonden wordt, stuur een 404 foutmelding
    if (!currentSite) {
      return response.status(404).send('Site not found')
    }
    
    // Haal de IDs van de scans op die gerelateerd zijn aan de huidige site lege array 
    const scanIds = currentSite.scans || []
    
    // Filter scans op basis van de gevonden IDs
    const siteScans = allScans.filter(scan => scanIds.includes(scan.id))

    // Log de site, scan IDs en geselecteerde scans  een  snelle check 
    console.log('Current Site:', currentSite)
    console.log('Scan IDs:', scanIds)
    console.log('Site Scans:', siteScans)

    // Render de detailpagina met de opgehaalde gegevens
    response.render('main', {
      site: currentSite,
      allScans: siteScans,
      nieuwekijkScans // misschien nodig voor de detailpagina
    })
  } catch (error) {
    // Stuur een foutmelding als er een fout optreedt bij het ophalen van de gegevens
    console.error('Error fetching data:', error)
    response.status(500).send('Error fetching data')
  }

})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
