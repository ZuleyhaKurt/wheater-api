
const input = document.querySelector(".city")
const buton = document.querySelector(".btn")
const main = document.querySelector(".content")
let name1;
let nameC;
let counter = 0;

const fetchCity = (name) => {
    if (counter > 4) {
        alert("maximum entry is 5")
    }
    else{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=8679780ea9ee4fcdc4514f93f08f4e3f`

    fetch(url)
    .then((res) => {
      if (!res.ok) {
          console.log(`Something went wrong: ${res.status}`);
          renderError()
        throw new Error();
      }
      return res.json();
    })
    .then((data) => renderCity(data))
    .catch((err) => console.log(err));
    }

}
const renderError = () => {
    alert("please enter a valid city name")
}
const renderCity = (data) => {
        
        console.log(data)
        const { name, weather, main: { temp },} = data

        console.log(name);
        console.log(Object.values(weather)[0].description)
        console.log(Object.values(weather)[0].icon)
        console.log(temp);
    const tempC = Math.floor(temp - 273)
    name1 = name.split(" ")
    console.log(name1)
    name1= name1.filter((e) => e!== "Province")
    nameC=name1.join(" ")
    console.log(nameC)

    main.innerHTML +=` 
    <div class="card  ">
        <div class="name">
            <h5>${nameC}</h5>
        </div>
        <div class="tempature">
            ${tempC}&#8451
        </div>
        <div class="sky">
            <img class="icon" src="http://openweathermap.org/img/wn/${Object.values(weather)[0].icon}.png" alt="">
            <p>${Object.values(weather)[0].description}</p>
        </div>
    </div>  
  `
}

    buton.addEventListener("click", () => {
        let inputCity = input.value
        fetchCity(inputCity)
        input.value = ""
        counter++

    })

    window.onload = function () {
        input.focus()
    }

    input.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        buton.click()
        input.value=""
    }
           
   })


