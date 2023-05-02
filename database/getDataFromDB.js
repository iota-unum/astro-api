import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()
// console.log(process.env.MONGO_URI, 'MONGOOOOOOURIIIIIII')
export async function connectToDB(){

    const client = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    
    })
    return client

}
export async function getDataFromDB(dateString) {
    const client = await connectToDB()
    const db = client.db(process.env.DB_NAME)
    const collection = db.collection('dailyhoroscopes')
    const result = await collection.find({ date: dateString}).toArray()
    client.close()
    return JSON.parse(JSON.stringify(result))
}


export async function getDataBySign(sign, dayDateString){
    const client = await connectToDB()
  const allData = await  getDataFromDB(dayDateString)
  const signData = allData[0].horoscopes.filter(s => s.sign === sign)
  return signData
}