// HAmburger Menu
const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    hamburgerMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });


    // Navbar weather info

    // Function to update banner content
function updateBanner() {
    // Get current date and time
    let now = new Date();
    let date = now.toLocaleDateString('en-IN'); // Indian date format
    let time = now.toLocaleTimeString();

    // Get weather data using your API key
    let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Mumbai,IN&appid=99d25860666ce054817826f2af903599&units=metric'; // Example for Mumbai
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            let weather = data.weather[0].description;
            let temperature = data.main.temp;
            let flagUrl = './images/flag.png'; // URL to the flag of India image
            let flag = `<img src="${flagUrl}" alt="Flag of India" style="height: 20px;">`; // Use image tag for flag

            // Get air quality index using your API key
            let airQualityUrl = 'https://api.openweathermap.org/data/2.5/air_pollution?lat=19.0760&lon=72.8777&appid=99d25860666ce054817826f2af903599'; // Example for Mumbai coordinates
            fetch(airQualityUrl)
                .then(response => response.json())
                .then(airData => {
                    let airQualityIndex = airData.list[0].main.aqi;
                    let airQualityCategory = getAirQualityCategory(airQualityIndex);

                    // Update banner content with weather and air quality information
                    let banner = document.getElementById('weather-info');
                    banner.innerHTML = `${flag} ${date} ${time} Weather: ${weather}, Temperature: ${temperature}°C, Air Quality: ${airQualityCategory}`;

                    // Add social media icons
                    let socialIcons = document.getElementById('social-icons');
                    socialIcons.innerHTML = `
                        <i class="fab fa-facebook-f"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-instagram"></i>
                        <i class="fab fa-linkedin"></i>
                        <i class="fab fa-youtube"></i>
                    `;
                })
                .catch(error => console.error('Error fetching air quality:', error));
        })
        .catch(error => console.error('Error fetching weather:', error));
}
function getAirQualityCategory(index) {
    if (index <= 50) {
        return 'Good';
    } else if (index <= 100) {
        return 'Moderate';
    } else if (index <= 150) {
        return 'Unhealthy for Sensitive Groups';
    } else if (index <= 200) {
        return 'Unhealthy';
    } else if (index <= 300) {
        return 'Very Unhealthy';
    } else {
        return 'Hazardous';
    }
}
// Call the updateBanner function to update content initially
updateBanner();

// Update content every second (1000 milliseconds)
setInterval(updateBanner, 1000);


// NAvbar search bar
document.querySelector('.search-icon').addEventListener('click', function() {
    document.querySelector('.main-nav').classList.add('nav-blur');
    document.querySelector('.search-form').style.display = 'block';
  });

  document.querySelector('.close-btn').addEventListener('click', function() {
    document.querySelector('.main-nav').classList.remove('nav-blur');
    document.querySelector('.search-form').style.display = 'none';
  });



//   top Stories 

const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const scrollbarThumb = document.querySelector(".slider-scrollbar .scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    let currentScrollLeft = 0;

    const slideImages = (direction) => {
        currentScrollLeft += direction * imageList.clientWidth;
        currentScrollLeft = Math.min(Math.max(currentScrollLeft, 0), maxScrollLeft);
        imageList.scrollTo({ left: currentScrollLeft, behavior: "smooth" });
        updateButtonVisibility();
    };

    const updateButtonVisibility = () => {
        slideButtons[0].style.display = currentScrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = currentScrollLeft >= maxScrollLeft ? "none" : "flex";
    };

    const updateScrollThumbPosition = () => {
        const thumbPosition = (imageList.scrollLeft / maxScrollLeft) * (imageList.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    slideButtons[0].addEventListener("click", () => slideImages(-1));
    slideButtons[1].addEventListener("click", () => slideImages(1));

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const startThumbPosition = parseFloat(scrollbarThumb.style.left) || 0;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = Math.min(Math.max(startThumbPosition + deltaX, 0), imageList.clientWidth - scrollbarThumb.offsetWidth);
            const scrollPosition = (newThumbPosition / (imageList.clientWidth - scrollbarThumb.offsetWidth)) * maxScrollLeft;

            scrollbarThumb.style.left = `${newThumbPosition}px`;
            imageList.scrollLeft = scrollPosition;
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        updateButtonVisibility();
    });

    updateScrollThumbPosition();
    updateButtonVisibility();
};

window.addEventListener("load", initSlider);


// top stories end

