export function getItemLS(key) {
  return localStorage.getItem(key);
}
export function setItemLS(key, value) {
  localStorage.setItem(key, value);
}

export function getHasPropertyLS(key) {
  return localStorage.hasOwnProperty(key);
}

export function compareItemLS({ username, password }) {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
      let key = localStorage.key(i);
      const userLS = JSON.parse(localStorage.getItem(key));
      if (userLS.username === username && userLS.password === password) {
        return [userLS.id, userLS.username, userLS.password, userLS.favorites];
      }
    }
  }
}

export function compareFavoritesItemLS(imdb_id) {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  return user.favorites.some((fav) => fav === imdb_id);
}

export function favSavedUser(imdb_id) {
 if(compareFavoritesItemLS(imdb_id)){
   return "fav"
 }else{
   return ""
 }
}

export function removeFavoriteLS(imdb_id) {
 
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const userLS = JSON.parse(localStorage.getItem(user.id));
  const newFav= userLS.favorites.filter((fav) => fav !== imdb_id);
  return newFav
 
}

export function confirmUser(){
  (function() { 
    if(!sessionStorage.getItem('currentUser')){
      document.location.href = "login.html";
    }
})();
}