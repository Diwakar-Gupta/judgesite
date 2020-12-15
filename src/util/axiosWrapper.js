import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://127.0.0.1:8000/";

// function getCookie(name) {
//   var cookieValue = null;
//   if (document.cookie && document.cookie !== "") {
//     var cookies = document.cookie.split(";");
//     for (var i = 0; i < cookies.length; i++) {
//       var cookie = cookies[i].trim();
//       // Does this cookie string begin with the name we want?
//       if (cookie.substring(0, name.length + 1) === name + "=") {
//         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//         break;
//       }
//     }
//   }
//   return cookieValue;
// }
// let csrftoken = getCookie("csrftoken");

// const axiosBase = axios.create({
//   baseURL: "http://127.0.0.1:8000/",
//   withCredentials: true,
//   headers: { "X-CSRFToken": csrftoken },
//   // header:{
//   //   'Access-Control-Allow-Credentials': true
//   // }
//   /* other custom settings */
// });

export default axios;
