const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function downloadFile(url, folder, name) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });
    if (!fs.existsSync("./tmp")) {
      fs.mkdirSync("./tmp");
    }
    response.data.pipe(fs.createWriteStream(`./${folder}/${name}`));
    await sleep(500)
    const json = JSON.parse(fs.readFileSync(`./${folder}/${name}`));
    fs.unlinkSync(`./${folder}/${name}`)
    return json;
  } catch (err) {
    fs.unlinkSync(`./${folder}/${name}`)
    throw { error: err }
  }

}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports = { downloadFile, sleep }