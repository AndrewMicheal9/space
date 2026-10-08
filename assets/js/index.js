// WRITE YOUR JS CODE HERE
const apodDate = document.getElementById("apod-date");
const apiKey = "5AOepOePNYOjh7KpJJ7Cu3kaZDg6oUKRWNUfNXfX";
const apodDateInfo = document.querySelector("#apod-date-info");
const loadingSpinner = document.querySelector("#apod-loading");
const apodImage = document.querySelector("#apod-image");
const apodTitle = document.querySelector("#apod-title");
const apodExplanation = document.querySelector("#apod-explanation");
const apodDateDetail = document.querySelector("#apod-date-detail");
const apodDateInput = document.querySelector("#apod-date-input");
const launcheSection = document.querySelector("#launches");

const launchesLink = document.querySelector(".nav-link[data-section = 'launches']");
const todayInSpaceLink = document.querySelector(".nav-link[data-section = 'today-in-space']");
const launchesPlanets = document.querySelector(".nav-link[data-section = 'planets']");

const todayInSpace = document.querySelector("#today-in-space");
const leadingTight = document.querySelector(".leading-tight");
const dataFaSvg = document.querySelector("i svg.fa-building");

const lanuchTitle = document.querySelector("#lanuchTitle");
const lanuchRocket = document.querySelector("#lanuchRocket");
const lanuchDate = document.querySelector("#lanuchDate");
const lanuchDateContent = document.querySelector("#lanuchDateContent");
const lanuchTimeContent = document.querySelector("#lanuchTimeContent");
const lanuchLocation = document.querySelector("#lanuchLocation");
const lanuchCountry = document.querySelector("#lanuchCountry");
const lanuchDescription = document.querySelector("#lanuchDescription");
const launchGrid = document.querySelector("#launches-grid");

const planetsSection = document.querySelector("#planets");
const planetDetailName = document.querySelector("#planet-detail-name");
const planetDetailImage = document.querySelector("#planet-detail-image");
const planetDetailDescription = document.querySelector("#planet-detail-description");
const planetCards = document.querySelectorAll(".planet-card");
const planetDiscoverer = document.querySelector("#planet-discoverer");
const planetDiscoveryDate = document.querySelector("#planet-discovery-date");
const planetBodyType = document.querySelector("#planet-body-type");
const planetVolume = document.querySelector("#planet-volume");

let today = new Date();
let loading = true;

async function getApodDate() {
  if (loading) {
    loadingSpinner.classList.remove("hidden");
    apodImage.classList.add("hidden");
  }
  let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
  response = await response.json();
  if (response.code == "500") {
    apodDate.firstElementChild.innerHTML = `Invalid Date`;
    apodDateInfo.innerHTML = `Invalid Date`;
  } else {
    loading = false;
    loadingSpinner.classList.add("hidden");
    apodDate.firstElementChild.innerHTML = `${response.date}`;
    apodDateInfo.innerHTML = `${response.date}`;
    apodTitle.innerHTML = `${response.title}`;
    apodExplanation.innerHTML = `${response.explanation}`;
    apodDateDetail.innerHTML = `${response.date}`;
    apodDateInput.value = `${response.date}`;
    apodDateInput.nextElementSibling.innerHTML = `${response.date}`;
    apodImage.classList.remove("hidden");
    apodImage.setAttribute("src", `${response.url}`)

  }
}

async function getLanunches() {
  let response = await fetch(`https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=12`);
  response = await response.json();
  console.log('====================================');
  console.log(response);
  console.log('====================================');
  leadingTight.innerHTML = response.results[0].name;
  lanuchTitle.innerHTML = response.results[0].launch_service_provider.name;
  lanuchRocket.innerHTML = response.results[0].rocket.configuration.name;
  lanuchDate.innerHTML = response.results[0].pad.location.celestial_body.length_of_day.split("")[0]
  const date = response.results[0].net;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  lanuchDateContent.innerHTML = formattedDate;
  lanuchTimeContent.innerHTML = response.results[0].net.split("T0")[1].replace(/:00Z$/, "");

  const dateObj = new Date(response.results[0].net);
  const hours = dateObj.getUTCHours();
  const amPm = hours < 12 ? "AM" : "PM";
  lanuchTimeContent.innerHTML += ` ${amPm} UTC`;
  lanuchLocation.innerHTML = response.results[0].pad.location.name;
  lanuchCountry.innerHTML = response.results[0].pad.country.name
  lanuchDescription.innerHTML = response.results[0].mission.description;

  getLanunchesData(response.results);
}

todayInSpaceLink.addEventListener("click", function () {
  todayInSpace.classList.remove("hidden");
  todayInSpace.classList.add("block");
  todayInSpaceLink.classList.add("bg-blue-500/10", "text-blue-400");
  todayInSpaceLink.classList.remove("text-slate-300");

  launchesPlanets.classList.remove("bg-blue-500/10", "text-blue-400");
  launchesPlanets.classList.add("text-slate-300");
  planetsSection.classList.add("hidden");
  planetsSection.classList.remove("block");

  launchesLink.classList.remove("bg-blue-500/10", "text-blue-400");
  launchesLink.classList.add("text-slate-300");
  launcheSection.classList.add("hidden");
  launcheSection.classList.remove("block");
});

launchesLink.addEventListener("click", function () {
  todayInSpace.classList.add("hidden");
  todayInSpace.classList.remove("block");
  todayInSpaceLink.classList.remove("bg-blue-500/10", "text-blue-400");
  todayInSpaceLink.classList.add("text-slate-300");

  launchesPlanets.classList.remove("bg-blue-500/10", "text-blue-400");
  launchesPlanets.classList.add("text-slate-300");
  planetsSection.classList.add("hidden");
  planetsSection.classList.remove("block");

  launchesLink.classList.add("bg-blue-500/10", "text-blue-400");
  launchesLink.classList.remove("text-slate-300");
  launcheSection.classList.remove("hidden");
  launcheSection.classList.add("block");


});

launchesPlanets.addEventListener("click", function () {
  todayInSpace.classList.add("hidden");
  todayInSpace.classList.remove("block");
  todayInSpaceLink.classList.remove("bg-blue-500/10", "text-blue-400");
  todayInSpaceLink.classList.add("text-slate-300");

  launcheSection.classList.add("hidden");
  launcheSection.classList.remove("block");
  launchesLink.classList.remove("bg-blue-500/10", "text-blue-400");
  launchesLink.classList.add("text-slate-300");

  launchesPlanets.classList.add("bg-blue-500/10", "text-blue-400");
  launchesPlanets.classList.remove("text-slate-300");
  planetsSection.classList.remove("hidden");
  planetsSection.classList.add("block");
});

function getLanunchesData(data) {
  let launchContainer = ``;
  console.log(data);
  for (let i = 1; i <= data.length - 1; i++) {

    const date = new Date(data[i].net);

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const time = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC"
    });

    launchContainer += `
         <div
               class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
             >
               <div
                 class="relative h-48 bg-slate-900/50 flex items-center justify-center"
               >
                 ${data[i].pad.image !== null ? `<img src="${data[i].image.image_url}" alt="${data[i].name}" class="w-full h-full object-cover" />` : `<i class="fas fa-space-shuttle text-5xl text-slate-700"></i>`}
                 <div class="absolute top-3 right-3">
                   <span
                     class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                   >
                     Go
                   </span>
                 </div>
               </div>
               <div class="p-5">
                 <div class="mb-3">
                   <h4
                     class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                   >
                     ${data[i].name}
                   </h4>
                   <p class="text-sm text-slate-400 flex items-center gap-2">
                     <i class="fas fa-building text-xs"></i>
                     ${data[i].launch_service_provider.name}
                   </p>
                 </div>
                 <div class="space-y-2 mb-4">
                   <div class="flex items-center gap-2 text-sm">
                     <i class="fas fa-calendar text-slate-500 w-4"></i>
                     <span class="text-slate-300">${formattedDate}</span>
                   </div>
                   <div class="flex items-center gap-2 text-sm">
                     <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${time} UTC</span>
                   </div>
                   <div class="flex items-center gap-2 text-sm">
                     <i class="fas fa-rocket text-slate-500 w-4"></i>
                     <span class="text-slate-300">${data[i].rocket.configuration.name}</span>
                   </div>
                   <div class="flex items-center gap-2 text-sm">
                     <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                     <span class="text-slate-300 line-clamp-1">${data[i].pad.location.name}</span>
                   </div>
                 </div>
                 <div
                   class="flex items-center gap-2 pt-4 border-t border-slate-700"
                 >
                   <button
                     class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                   >
                     Details
                   </button>
                   <button
                     class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                   >
                     <i class="far fa-heart"></i>
                   </button>
                 </div>
               </div>
             </div>`
  }
  launchGrid.innerHTML = launchContainer;
}

async function getPlanetsData(data) {
  let response = await fetch(`https://solar-system-opendata-proxy.vercel.app/api/planets`);
  response = await response.json();
  const planetInfo = response.bodies.find(planet => planet.englishName.toLowerCase() == data.toLowerCase());
  getPlanetsDataInfo(planetInfo);

}


for (let i = 0; i < planetCards.length; i++) {
  planetCards[i].addEventListener("click", function () {
    const planetInfo = this.getAttribute("data-planet-id");
    getPlanetsData(planetInfo);
  })
}

function getPlanetsDataInfo(data) {
  planetDetailName.innerHTML = data.englishName;
  planetDetailImage.setAttribute("src", `${data.image}`);
  planetDetailDescription.innerHTML = data.description;
  planetDiscoverer.innerHTML = data.discoveredBy ? data.discoveredBy : "Known since antiquity";
  planetDiscoveryDate.innerHTML = data.discoveryDate ? data.discoveryDate : "Ancient times";
  planetBodyType.innerHTML = data.bodyType ? data.bodyType : "Unknown";
  planetVolume.innerHTML = data.vol ? `${data.vol.volValue} x 10^${data.vol.volExponent} km³` : "Unknown";
}

getApodDate();
getLanunches();
getPlanetsData("Earth");
