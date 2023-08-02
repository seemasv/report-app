import axios from "axios";

//fetch state data from "rapidapi"
export const fetchStates = async () => {
    return axios({
        method: "GET",
        url: "https://mocki.io/v1/b2ac46d3-385d-448a-a77a-9bc2c5b5dcbc",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "9d01bd09b6msh28ecc0191ae81cbp1afa12jsn8977574f94d8",
          useQueryString: true,
        },
      }).then((response) => {
        return response.data;
      });
}
