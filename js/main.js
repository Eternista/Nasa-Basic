const dateInp = document.getElementById("dateInp");//DATA INPUT
const numberInp = document.getElementById("numberInp");//NUMBER INPUT
const gallery = document.getElementById("gallery");//GALLERY
let check = false; //WERYFIKACJA / VERYFICATION

//USTAWIENIE LIMITU NA DZIEJSZY DZIEN W DATE-INPUT / SETTING LIMIT FOR TODAY'S DATE

const dateMax = () => {
    let today = new Date(); //Dzisiejsza Data/ TODAY'S DATE
    let dd = today.getDate();//Dzień / DAY
    let mm = today.getMonth() + 1;//Miesiąc Styczeń posiada wartość 0 dlatego zwiększamy to o 1; / MOUNTH, Jenuary normaly has value = 0, so increase that by 1
    let yyyy = today.getFullYear();//Rok / YEAR

    if (dd < 10) {
    dd = '0' + dd; //DODANIE ZERA PRZED CYFRY 1-9 / ADDING 0 BEFORE NUMBERS 1-9
    }

    if (mm < 10) {
    mm = '0' + mm;// Tak jak wyzej / UP
    } 
        
    today = yyyy + '-' + mm + '-' + dd; //Polaczenie / CONNECTION
    dateInp.setAttribute("max", today);
}

dateMax();

numberInp.addEventListener("change", () => {
    //input number poprawa limit / input number a little fix for limit
    if(numberInp.value > 50) {
        numberInp.value = 50;
    }
})

//FUNKCJA DO ZAŁADOWANIA ZDJ / FUNCTION TO LOAD IMAGES
const nasaLoad = function () {
    //RESET WERYFIKACJI / VERYFICATION RESET
    check = false;
    //ILOSC ZDJ
    let limit = numberInp.value;
    //DATA
    let dateSet = dateInp.value; 
    const xhttp = new XMLHttpRequest();
    //RESET GALLERY
    gallery.innerHTML = "";
    //UZYCIE API / API USAGE
    xhttp.onload = function() {
        const data = JSON.parse(this.responseText);
    // JEZELI ISTNIEJE PIERWSZE ZDJ / IF FIRST IMAGE EXIST  
      if(data.photos[0]) {
          for(let i = 0;i < limit; i++){
              const box = document.createElement("div");
              box.classList.add("single-image");
              box.setAttribute("data-src",data.photos[i].img_src);
              box.innerHTML = 
              `
                <img src="${data.photos[i].img_src}">
                <div class="single-image__text">
                    <strong>${data.photos[i].id}</strong>
                    <small>${data.photos[i].earth_date}</small>
                </div>
              `
              gallery.appendChild(box);
          }
      }
      else {
        gallery.innerHTML = 
        `
            <strong class="no-photos">
                No photos found for a date
            </strong>
        `;
      }
    }
    // POLACZENIE Z API / CONNECTION WITH API
    xhttp.open("GET", "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + dateSet + "&api_key=UGneafCkBqGLXQlciFN2yOqxGMK3WoMUvSo2uEuQ");
    // WYSLANIE ZAPYTANIA / ASK FOR PREMISION
    xhttp.send();
    var lightGalleryCheck = setInterval(() => {
        // JEZELI ILOSC DZIECI JEST WIEKSZA OD 0 I NIE ISTENIJE ELEMENT O KLASIE no-photos TO WYKONAJ INSTRUKCJE
        //IF NUMBER OF CHILDREN IS LARGER THAN 0 AND ELEMENT WITH CLASS "no-photos" DOESN'T EXIST DO AN INSTRUCTION
        if(gallery.children.length > 0 && !(gallery.querySelector(".no-photos"))) {
            //POTWIERDZENIE ZE ZNALAZL / CONFIRMATION THAT IT'S FOUND
            check = true;
            lightGallery(document.getElementById('gallery'), {
                plugins: [lgZoom],
                thumbnail: true,
            });
            //WYLACZ SETINTERVAL / TURN OFF SETINTERVAL
            clearInterval(lightGalleryCheck);
        }
        }, 500)

  }
  
  document.querySelector(".loadPhotos").addEventListener("click", nasaLoad);