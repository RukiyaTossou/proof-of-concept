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
    

  const site = await fetchJson('https://fdnd-agency.directus.app/items/frd_site')
  const allScans = await fetchJson('https://fdnd-agency.directus.app/items/frd_scans')
  const nieuwekijkScans = await fetchJson('https://fdnd-agency.directus.app/items/frd_site?filter[scans][_eq]=11&fields=id,title,scans.*')



app.get('/', async function (request, response) {
    response.render('index', {
      site: site.data, allScans: allScans.data, nieuwekijkScans: nieuwekijkScans.data 
    })
  
})

app.get('/site/:id', async function (request, response) {
  const siteId = parse(request.params.id, ); //haal id


  // Filter de scans op frd_site_id
  const filteredScans = allScans.data.filter(scan => scan.frd_site_id === siteId);// Dit filtert de allScans dataset om alleen de scans voor de specifieke site op te halen.

  response.render('main', {
      site: site.data.find(s => s.id === siteId),  
      allScans: filteredScans 
  });
});


app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
