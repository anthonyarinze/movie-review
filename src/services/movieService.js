import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

axios
  .get(`http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}`)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
