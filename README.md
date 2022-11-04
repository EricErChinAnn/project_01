# HealthMAX
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the Project</a>
      <ul>
        <li><a href="#goals">Goals</a></li>
        <li><a href="#target-audience">Target audience</a></li>
      </ul>
    </li>
    <li>
    <a href="#ui-and-ux">UI and UX</a>
    <ul>
        <li><a href="#design">Design</a></li>
        <li><a href="#wireframe">Wireframe</a></li>
    </ul>
    </li>
        <li>
        <a href="#features">Features</a>
        <ul>
        <li><a href="#wireframe">Wireframe</a></li>
        <li><a href="#limitations">Limitations</a></li>
        </ul>
        </li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#testing">Testing</a></li>
        <li><a href="#credits">Credits</a></li>
  </ol>
</details>
<br/>

![Logo of HealthMAX](img/icon/HealthMAX.png)

## About the Project
As Singaporean become more and more health-conscious. The number of people wanting to be more active have been increasing over the years, especially after the COVID-19 pandamic (2020). Thus this concept of a Gym & Studio finder application was birthed to help assist both veterans and new gym-goers. 

This application will benefit new gym-goers by showing them the near-by Gym & Studio with the reviews by actual public. On top of that it shows the food center near the selected gym and the weather. For the vetarans it also provide them with a health tracker system for better self-accessment.

The demo of the live website can be accessed here:
[HealthMax](https://ericerchinann.github.io/project_01/)
<p align="right">(<a href="#healthmax"> Back to top </a>)</p>

## Goals 
### Organization's goals
 Mental and physical health have become more of an issue of importance, one of the few contermeasures are being physically active and joining communities. Our organization's goals are to help ease and assist users to find a suitable active community and encourage community growth and empowerment. 
### User's goals
Our target audience seek a community to stay active and self-improvement. More often then not is it hard take the first step in the search.

Below are some user stories:
| User Stories | Accceptance Criteria |
| ----------- | ----------- |
| A new gym-goer want to find a Gym or Studio near-by their workplace or home | User can search in a location on the map and result will be shown based on given location up to 10km|
| Veterans want to try out a different workout activity that they might not have tried or known| A dropdown list is avaliable for user to further narrow down their search to a type of Gym or Studio eg. Climbing Gym, Boxing Gym, etc.|
| After a workout, user often feels hungry and wish to find a near-by food center.| Application allow user to locate near-by food center within a 500m radius around the selected gym.|
| User want to know the weather in a selected location| Weather can be track real time on a 2 hourly update with accuracy within a 3km radius|

<p align="right">(<a href="#healthmax"> Back to top </a>)</p>

## Target audience
Our target audience are people age between 21 to 50, which can be further broken down into 3 groups :
* *Bronze Age* ( 21 - 30 )
*  *Silver Age* ( 31 - 40 )
* *Golden Age* ( 41 - 50 )

We are also targeting both **veterans** and **new gym-goers** alike. To help user obtain a healthier lifestyle. 

<p align="right">(<a href="#healthmax"> Back to top </a>)</p>

## UI and UX
The aim of the this application is to create a simple and easy to use and understand layout. Forming a theme and developing a wireframe.

## Design
### Colors
![Color choices used](img/readme/Colors.png)
| Color Hex | Feeling it give off |
| ----------- | ----------- |
| #f9da36 ( Yellow ) | Excitement, Enthusiasm, Confidence |
| #f7ae3e ( Orange )| Happy, Motivated, Uplifting |
| #424242 ( Grey )| Neutrality, Balance, Solid, Stable |
| #1e1e1e ( Black )| Sophisticate, Professionalism, Powerful, Luxury, Elegance |

We decided to use an gradient of yellow and orange, grey and black. Not only do they make otherwise flat and solid colors more vibrant and exciting to look at, but they're useful for focusing attention, improving engagement and modern feel to it.
<p align="right">(<a href="#healthmax"> Back to top </a>)</p>

## Wireframe
![Wireframe of the alpha version ](img/readme/wireframes.jpg)
The deployed site have gone through multiple iterations and improvements. Many changes have been made compared to the alpha version of the application. 

### Changes
1. Application have unified theme
2. There is a different landing page
3. Login page have been changed from a page to small offcanvas
4. Added a dropdown list to narrow down the search result
5. Added 2 buttons to the search bar for additional service of the application
<p align="right">(<a href="#healthmax"> Back to top </a>)</p>

## Features
![HealthMAX on different devices](img/readme/device_home.png)
On the landing page, the user will be greeted with randomly generated motivational quote before proceeding to the map. There will also be a loading bar for user's with slower internet ( Shown above on the tablet device )

![HealthMAX on different devices](img/readme/device_used.png)

| Features | Status | Description |
| --- | --- | ---- |
| Search | DONE | User can interact with text input and the dropdown list for define their search. Results of nearby Gym & Studio within 10km radius will display as markers on the map. Show image and reviews (if any) about selected marker as a popup.|
| Food Center Locator | DONE | Search for food center within a 500m radius (shown on map) of the selected location as map markers. Map popup to display infomation and image of food center |
| Weather Display | DONE | Display a 2 hourly real-time track of the current weather of a location with and accuracy within a 3km radius (shown on map) |
| Personal Health Tracking | WIP | User can login or create a new account to have a more personalized experience. Training schedule can be track to provide better pre-workout planning. A easy to understand visual display using charts. |
| Auto Pathing | NOT IMPLEMENTED | Show user the way to get to the location they want using their preferred choice of transportation eg. Walking, Public Transport or Personal Vehicles |
| GPS Location Tracking | NOT IMPLEMENTED | Allow user to use their own location to provide a more accurate search and pathing results |

<p align="right">(<a href="#healthmax"> Back to top </a>)</p>

## Limitations
1. Collection of private data
    * To personalized health tracking, private data will be collected. Without a back-end such collection of data will be prone to leaks
<br/><br/>

2. Editing the accounts details 
    * Being a front-end only web application, there is not back-end database so store the informations
<br/><br/>

3. Allow Auto Pathing
    * Due to time limitation, this was not implemented.
    * However user can change how the map look to allow a more navigatable and infomative map to assist in transit be it by public transport or by personal vehicles

<p align="right">(<a href="#healthmax"> Back to top </a>)</p>

## Built With
* [Visual Studio Code](https://code.visualstudio.com/) ( HTML, CSS, Javascript )
    - A free and easy to use coding programme for beginners
<br/><br/>

* [Leaflet](https://leafletjs.com/)
    - Well written documentation and multiple videos tutorials regarding the use of their map add-ons
<br/><br/>

* [Bootstrap](https://getbootstrap.com/)
    - Designed to enable responsive development of mobile-first websites
<br/><br/>

* [Animate.CSS](https://animate.style/)
    - Easy way to make web pages more dynamic and engaging
<br/><br/>

* [ApexCharts](https://apexcharts.com/)
    - Enable creation beautiful and interactive visualizations of data
<br/><br/>

* [CLIP STUDIO PAINT](https://www.clipstudio.net/)
    - Selections of varying feature create by the software and users
<br/><br/>

<p align="right">(<a href="#healthmax"> Back to top </a>)</p>

## Testing




## Credits
### Logo
* By Eric using [CLIP STUDIO PAINT](https://www.clipstudio.net/)
<br/><br/>

### Map Marker
* By juicy_fish posted on [flaticon](https://www.flaticon.com/packs/location-pins-22)
<br/><br/>

### Different Device Display Demo
* [CreateMockUp](https://www.createmockup.com/generate/)

<p align="right">(<a href="#healthmax"> Back to top </a>)</p>