import weather from 'weather-js';
import animal from 'botanic-zoo-api'

////////Botnaic-Api//////////
animal.getAnimal('lion')
  .then(response => console.log(response))
  .catch(err => console.error(err))

  //////Weather-Api/////////
   
  weather.find({search: 'Rajasthan, India', degreeType: 'F'}, function(err, result) {
    if(err) console.log(err);
   
    console.log(JSON.stringify(result, null, 2));
  });
