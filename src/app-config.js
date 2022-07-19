let backendHost = '';

const hostname = window && window.location && window.location.hostname;

console.log("HOSTNAME ", hostname);

if (hostname === "localhost") {
  backendHost = "http://localhost:8090";
}
// else{
//     // backendHost =  hostname;
// }

console.log(backendHost);
export const API_BASE_URL = `${backendHost}`;