import { getDataFromDB } from "../database/getDataFromDB.js";
import { getFormattedDate } from "../helpers/dates.js";
import { generateSingleImage } from "./generateSingleImage.js";
import { saveImgtoFolder } from "./saveImgToFolder.js";

export async function generateAllImages(day) {
  const { dateColons, dateDashes } = getFormattedDate(day);
  const data = await getDataFromDB(dateDashes);
  const horoscopes = data[0].horoscopes;
let imgBuffers = []
  for (let sign of horoscopes) {
    const { sign: signName, horoscope } = sign;

    const imgBuffer = await generateSingleImage(signName, horoscope);
    console.log("image generated");
    // await saveImgtoFolder("twitterCards", signName, imgBuffer);
    imgBuffers.push({signName, imgBuffer})
  }
  console.log("all images saved");
  return imgBuffers
}
