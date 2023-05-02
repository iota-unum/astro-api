import cron from 'node-cron'
// import { generateAllImages } from './cards/generateAllImages.js'
import { cronGetHoroscopesAndSaveToDB } from './cronHoroscopes.js'
import { getItalianTimestamp } from './helpers/dates.js'

console.log('cron started')


cron.schedule('50 1 * * *', ()=> cronGetHoroscopesAndSaveToDB(4),  {
    scheduled: true,
    timezone: "Europe/Rome"
  })
cron.schedule('*/10 * * * *', ()=> console.log(getItalianTimestamp()),  {
    scheduled: true,
    timezone: "Europe/Rome"
  })







