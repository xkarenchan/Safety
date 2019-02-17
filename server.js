const express = require('express');
const app = express();

const secretApiKey = 'H1MlrkJqLrhplKhmhRS3P1aQQ7F6qSjdaSdRFNbw6EG5';
const uri = `https://apikey:${secretApiKey}@stream.watsonplatform.net/speech-to-text/api/v1/recognize`;

app.get('/', (req, res) => {
  let formData = new FormData();

  // 
  
  formData.append('file', {
    uri,
    name: `recording.${fileType}`,
    type: `audio/x-${fileType}`,
  });
  //where do you pass in query parameters?
  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    },
  };
});

app.listen(3000, () => console.log('App listening on port 3000!'))
