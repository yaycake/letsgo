import park from './models/Park';
import * as parkView from './views/parkView';
import axios from 'axios';

// National Parks Service API Key:
// LMCWhYBZ0nL2NEDRcXJGidsSEZRyzLxfu19EiQSE


async function getResult(query) {
  const baseUrl = 'http://api.nps.gov/api/v1/'

  const apiKey = 'LMCWhYBZ0nL2NEDRcXJGidsSEZRyzLxfu19EiQSE'

  const res = await axios(`${baseUrl}parks?parkCode=${query}&api_key=${apiKey}`);

  console.log(res)
}

console.log(getResult('acad'));
