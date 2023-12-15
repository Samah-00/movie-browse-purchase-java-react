[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/7Tmn2VQK)

# Authors
* Name:  Email: Saja Abu Maizar | ID:208072371 | sajaabu@edu.hac.ac.il
* Name:  Email: Samah Rajabi | ID: 211558556 | samahra@edu.hac.ac.il


# Explanations

# Goal
The goal of this project is to build a modern e-commerce website that allows customers to browse movies, add them to a cart, and complete a purchase (without actual payment) without the need for registration.

# Project Architecture
The project architecture consists of a front-end developed using React as a single-page application and a back-end developed using Spring. The front-end communicates with the back-end through a REST API.

# Front-End Development
The front-end of the website is developed using React and utilizes hooks, browser router, effects, and reducers to manage state and navigation. The website has three main pages: a search page, a cart page, and a checkout page.

# Search Page
The search page allows users to search for movies and shows using various attributes. The search functionality is implemented using the TMDB API, which provides data about movies and shows. The search can be performed using a search string, genre, release date, popular movies, or actor name. The search results are displayed as a list, and users can add movies to the cart from this page. The search page also records search history, allowing users to perform previous searches with a single click.

# Cart Page
The cart page displays the contents of the shopping cart. It shows basic information about each item in the cart, including the image, title, release date, and price. Users can remove items from the cart individually or empty the cart altogether.

# Checkout Page
The checkout page allows customers to enter their information, including first name, last name, and email. All fields are mandatory and validated. Upon submitting the form, the purchase details (email, first name, last name, total price) are saved in the database using the provided code. The cart is then reset to be empty, and the user is redirected to the home page.

# Back-End Development
The back-end of the website is developed using Spring and provides a REST API to handle the shopping cart and record purchases. The shopping cart is stored in the user session using Spring session beans. The back-end also connects to a SQL Server database to store completed orders.


# Initializing the template

In order to initialize the project make sure to:

1. When you open the project, if intelliJ propose to "Load Maven Project" do it. You can later reload maven with the "M" icon on the right of the screen, or by right clicking on the pom.xml file and selecting "Maven -> Reload project".
2. You see red lines in the code? Go to File -> Project Structure -> Project Settings -> Project -> SDK -> and choose your Java SDK
3. Still see red stuff? Open the same dialog and click on "Fix" if you see some
4. Edit your configuration "ex4" at the top right. Make sure the "Main class" is set to "hac.DemoApplication" and that Java is set

Everything ok?
1. Run the SQL server as shown in the video (week 6) and create a database named "ex4". The DB credentials are stored in the application.properties file. You may change them if you want.
2. Run the project, you should not see any errors in IntelliJ console

So far the only route you can check is http://localhost:8080/debug/purchases
that returns a list of all purchases in the DB (empty for now).

## Initializing the React client (movie-app)

Open a terminal in *movie-app* and run `npm install` and then `npm start`. You should see the client running on http://localhost:3000.
You can also open another instance of IntelliJ and open the *movie-app* folder as a project. You can then run the client from there.

## Using the provided code to store purchases in the DB

We provide you with ready-to-use code to store purchases in the DB, in order to give you a taste of what Spring can do for you.
Look at the DebugController class. It has a method called "addPurchase" that receives a Purchase object and stores it in the DB.
When you develop your own controller, you must declare the repository member exactly as it is declared in the DebugController class.
Then you can use it to store purchases in the DB (repository.save(purchase)).

## Still have problems? Come to class.
