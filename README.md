# VELLA

#APPROACH
1. MVC architecture is employ for the development of this project.
2. Business logic is separated from the Business UI, this makes debugging easier and also makes the code readable.
3. All the business logic is written in the hooks folder, while the business UI can be found in the component and pages folder.
4. Redux is used for all the global state management.
5. Ionic react(vite) with Typescript framework is use for the development of this application.

   
#BASIC USAGE OF THE APP
1. Once the url is loaded in the web browser, it displays all available products in vella database
2. You can then select the product you wish to buy by clicking on that product
3. On click on the product opens a new page, which displays all neccessary information about that particular product, which includes the product name, image, quatity, and price
4. A button that says "Add To Cart" is at the bottom of the ProductView page, this button add the product your cart collections
5. You can then click on the back button on the top left corner to continue shopping.
6. A cart icon is located at the top left corner which display the number of items present in the your cart collections.
7. On click on the cart icon displays a Cart page, which reveals the Total price to be paid, and also has "Remove button" to remove a particular product from your checkout products,
8. it has the "+ button" and "- button" to increase and decrease the quantity of a particular product respectively.
9. Note that, by the default quantity of all product is 1, which cannot be reduced lower than 1, if need be to reduce the quantity of the product below 1, just remove that product from your cart
10. Checkout button can then be clicked once your satisfy with the quantity and quality of all your selected products including your total payout price
11. On click of checkout button opens a page to input your Name, address, and email.
12. Once all this information is entered correctly, you can then click on the continue button.
13. This displays a modal revealing your name, address, email, and all your selected product(s) together with their quantity, price,image, and name.
14. Total amount to be paid is also displayed, so that you can be sure before finally checking out.
15. If you're satify with all this informations, you can then click on the confirm button on the top right corner of the modal, which then displays a successful checkout screen,
16. Click on done to clear your carts and also go back to home to buy more products, OR.
17. If you want to change some informations before checking out, you can click on the cancel button on the top left corner of the modal to change neccessary informatiions.
18. NOTE THAT: REDUCE THE RESOLUTION TO A MOBILE DEVICE SCREEN OR LOAD THIS APP ON A MOBILE DEVICE BROWSER TO REALLY FEEL THIS APPLICATION.
19. THANKS


 #CHALLENGES
1. The only challenge faced is that the ui is not provided for this assessment, as it would have made the work easier.

   
#IMPROVEMENTS
1. Addition of cool animations would have been added if there's enough time
2. Optimization of the UI would have been made.
