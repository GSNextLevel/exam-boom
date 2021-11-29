let backendHost = '';

const hostname = window && window.location && window.location.hostname;

console.log("HOSTNAME ", hostname);

if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
}
else{
    backendHost =  hostname + ":8080";
}

console.log(backendHost);
export const API_BASE_URL = backendHost; // `${backendHost}`;