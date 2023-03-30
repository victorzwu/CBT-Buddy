import {
    cityVanApiKey
  } from "@env";

  fetch('https://opendata.vancouver.ca/api/v2/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: cityVanApiKey,
    },
    body: JSON.stringify({
      firstParam: 'yourValue',
      secondParam: 'yourOtherValue',
    }),
  });