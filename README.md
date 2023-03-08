# Airbnb Clone - MERN Stack

- Full Stack Project
- Frontend: React + Tailwind CSS
- Backend: Express

---------------

CURRENT EXPRESS ENDPOINTS:
- POST /login  ->  LOGIN USER  (password encrypted with bcryptjs)
- POST /register  ->  REGISTER USER (password encrypted with bcryptjs)
- GET /profile  ->  CHECK FOR USER IN COOKIES
- POST /logout  ->  CLEAR TOKEN COOKIE TO LOGOUT USER
- POST /upload-by-link  ->  DOWNLOAD IMAGE FROM LINK ON SERVER
- POST /upload  ->  UPLOAD IMAGES FROM DEVICE
- POST /places  ->  ADD A NEW ACCOMODATION
- GET /user-places  ->  ONLY FOR SPECIFIC USER (WHERE OWNER ID = TOKEN ID)
- GET /places/:id  ->  GET PLACE BY ID (ALLOWED TO EVERYONE)
- PUT /places  ->  EDIT PLACE (ONLY IF TOKEN ID AND ID PASSED IN REQUEST ARE THE SAME)
- GET /places  ->  GET ALL PLACES (TO DISPLAY IN INDEXPAGE)
- POST /bookings  ->  BOOK A PLACE
- GET /bookings  ->  GET BOOKINGS (FOR A SPECIFIC USER -> ID FROM TOKEN)

![bnb1](https://user-images.githubusercontent.com/120139042/223871541-398fd2cf-2383-452b-8dcf-abb41bbb0205.png)

![bnb2](https://user-images.githubusercontent.com/120139042/223871690-5b9eb42e-774a-4a20-ba65-7752279ec4c3.png)

![bnb3](https://user-images.githubusercontent.com/120139042/223871767-b1cf415e-6a6a-46bf-baa3-0caa2f9c626b.png)
