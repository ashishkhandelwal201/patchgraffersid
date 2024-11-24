Companies rating website (JS Stack & mongoDB)
Created By: Aashish Khandelwal
Contact No.: 9691536456, 9406600788
Email: ashish.khandelwal201@gmail.com
Applied for: JS Stack Developer with 2+ years of experience

------------------------------------------------------------------------------------------------------------------
Modern and best practices which I have followed in this assignment -
-> Class-based architecture
-> Asynchronous programming with async/await
-> JWT authentication
-> Singleton design pattern
-> Use of bcrypt for password hashing
-> MVC architecture
-> Centralized import handling in utils > imports.js
-> Error handling with try/catch
-> Proper naming conventions
-> Using of .env file for environment variables
------------------------------------------------------------------------------------------------------------------

1. Login
The POST /login API checks whether the username is valid.
After confirming the username, it compares the password with the hashed password stored in the database.
If the password is correct, the system generates JWT Access and Refresh Tokens and returns them to the user.

2. Companies
After the login /companies api call where it fetch the all active comapnies list with their logo
It also show some related information about the company like Founded on and all

3. Add Companies
User can add more companies with clicking on button add company where the popup appears.
Fill the desired info about the company and upload company logo and hit the add-company POST API.
User will see the list of added companies in the below in sorted manner.


4. Search Companies
User can search the companies from the list as shown in the video.
The perfect match will appear at the top of the table.

5. Reviews
User can also see the companies reviews by clicking the button get review 
Thriugh this /reviews/:company_id API gets hitted whhich fetch the copany details and also its related reviews from 2 different collections.

6. Add Reviews
Add the reviews on the same company with clicking on add review where the modal appears which asks about name and review.
Submit the review form and then it attaches with the company review details and can be visible to user. 

------------------------------------------------------------------------------------------------------------------

Controllers in the Application
There are four primary controllers:
User Controller: Manages the login operations for users.
Company Controller: Handles showing registered companies(/companies), search option for company , Can add more company(/add-company).
Review Controller: Fetch reviews of selected company(/reviews/:company_id), can add more reviews (/add-reviews/:company_id).

------------------------------------------------------------------------------------------------------------------
MYSQL DB Table structure : -

1. User -
_id: Unique identifier for each user.
name : name of the registered user
username : username through which user can login into application
password : stored in hash form
role : can be of 2 types - user and admin
is_deleted : Implement soft delete check in the DB

2. company - 
_id : Unique identifier for each company.
company_name : Company name is kept here.
location: Address of the company.
city: City of the copany.
logo: Consists path of the logo image
foundedon : Date of foundation of the company
is_deleted : Implement soft delete check in the DB

3. Reviews -
_id : Unique identifier for each review.
company_id (foreign key): The ID of the company that this review is associated with.
subject: it is the subject of the review.
review_text: It is the long text which describes the review.
rating: This consists the rating of the company.
is_deleted : Implement soft delete check in the DB
info : Consists the date, when it was created

Code Scalability & Modularity
No Hardcoding: There is no hardcoded logic in the application. All database operations, business logic, and API routes are dynamically handled.
Scalable Design: The use of Singleton Design Pattern for authentication ensures that resources are shared efficiently across requests.
Modular Code: The application is divided into distinct modules (controllers, services, and routes) for easy maintenance and scalability.