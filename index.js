import express from 'express'
import cors from 'cors'
import { getDataFromDB } from './database/getDataFromDB.js'
import { getFormattedDate } from './helpers/dates.js'
import {generateAllImages} from './cards/generateAllImages.js'
import {cronGetHoroscopesAndSaveToDB} from './cronHoroscopes.js'
import { tweetAllImages } from './twitter/tweetImage.js'
const {dateColons, dateDashes} = getFormattedDate(0)

const app = express()
app.use(cors())
app.get('/', (req, res)=> {
  try {
    res.status(200).json({msg:'all right'})
    
  } catch (error) {
    res.status(400).json({error})
    
  }
})
app.get('/getData', async (req, res)=> {

  try {
    const data = await getDataFromDB(dateDashes)
    
    res.status(200).json({res:data})
    
  } catch (error) {
    res.status(400).json(error)
    
  }


})
app.get('/getImages', async (req, res)=> {

  try {
   await generateAllImages(0)
    
    res.status(200).json({msg:'done'})
    
  } catch (error) {
    res.status(400).json(error)
    
  }


})
app.get('/genHoroscopes', async (req, res)=> {
  //generates horoscopes and saves them on DB

  try {
await cronGetHoroscopesAndSaveToDB(2)    
    res.status(200).json({msg:'horoscopes saved'})
    
  } catch (error) {
    res.status(400).json(error)
    
  }


})
app.get('/tweetImages', async (req, res)=> {
  //generates horoscopes and saves them on DB

  try {
await tweetAllImages(-1)  
    res.status(200).json({msg:' images tweeted!'})
    
  } catch (error) {
    res.status(400).json(error)
    
  }


})



app.listen(3000, ()=> console.log('listening'))