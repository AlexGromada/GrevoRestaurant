# My Restaurant App (Frontend)

## Overview

This is the React frontend for a restaurant web application. It allows users to browse the menu, view individual dishes, manage their cart, make orders, and access their profile. The app integrates with a backend API for authentication, cart management, and order history.

----------------------------------------------------------------------------------------------------

## Technologies Used

- **React** – for building the frontend UI.  
- **React Router DOM** – for handling client-side routing.  
- **Context API** – to manage global state (user data, cart, orders).  
- **SCSS** – for styling components and pages.  
- **Fetch API** – for communicating with the backend server.  


------------------------------------------------------------------

## Routing

All routes are defined in `router.jsx` using `createBrowserRouter`:

- `/` → Homepage  
- `/menu` → FoodMenu  
- `/menu/menu-item/:id` → MenuItemPage (dynamic route for individual dishes)  
- `/about-us` → AboutUs  
- `/reservation` → Reservation  
- `/contact-us` → ContactUs  
- `/profile` → UserProfile (requires login)  
- `/authentication` → AuthenticationPage (login/register)  
- `/cart` → Cart  

------------------------------------------------------------------

## Global State (Context API)

The `UserDataContext` handles:

- User authentication state  
- Cart contents  
- Order history  

It automatically:

1. Checks login status on page load.  
2. Fetches the cart for the logged-in user.  
3. Fetches the order history.  

This ensures smooth navigation and persistent state across pages without reloads.

------------------------------------------------------------------

## Notes on UX & Features

- Dynamic routes allow deep linking to individual menu items.  
- Cart updates are synced with the backend after each change.  
- Users can view their order history in their profile.  
- Conditional rendering of the profile and cart icons based on login status.  

------------------------------------------------------------------

## Styling

- Reset CSS is applied globally (`reset.css`).  
- SCSS structure separates common styles, components, and pages for maintainability.  
- Pages and components follow a modular approach for easier updates.

----------------------------------------------------------------------------------------------------















# FRONT-END

----------------------------------------------------------------------------------------------------

# Homepage Overview

The **Homepage** is the landing page of the Grevo restaurant app. It introduces users to the restaurant’s philosophy, highlights its key features, and provides easy access to actions like making a reservation or contacting the restaurant. The page integrates several reusable components to maintain consistency across the app.

## Structure & Components

### 1. Header
- Displays the restaurant logo and main navigation links: `Home`, `Menu`, `About`, `Reservation`.
- Shows dynamic **Cart** and **Profile** icons that update based on the active page.
- Uses **React Router DOM's NavLink** to indicate the current active route.
- Includes a responsive **mobile popup menu** (`NavigationMenuPopup`) that appears when the screen width is below 1024px.
- Handles click outside to close the menu and displays active-state icons for Cart and Profile.

### 2. Main Section (`homepage-main`)
- **Introduction Block**: Features a headline, descriptive paragraph about the restaurant’s philosophy, and a “Book a Table link.
- **Feature Section (`homepage-aside`)**: Highlights the restaurant’s commitment to local and seasonal ingredients.

### 3. Action Section (`homepage-section`)
- Provides quick access links to `Contact Us` and `Reservation` pages.
- Enhances user experience with icons representing each action (`MailPicture` for contact, `CalendarPicture` for reservations).

### 4. Footer
- Displays the restaurant’s contact info, working hours, and social media links (YouTube, Instagram, Facebook, TikTok).
- Includes additional navigation links to pages like `Chef’s Specials`, `Gift Cards`, `Events`, and `FAQ`.
- Consistent across all pages for a unified layout and navigation experience.

## Supporting Components

- **NavigationBar**: Renders a list of page links with active state highlighting.
- **NavigationMenuPopup**: A mobile-friendly navigation popup with clickable icons and links.
- **Reusable Header/Footer**: Ensure consistency in layout, navigation, and visual design across all pages.

## Features / Logic

- Responsive design using React state (`MenuState`) and window resize events.
- Dynamic icons for Cart and Profile based on login state and active page.
- SPA navigation with React Router DOM to avoid full page reloads.
- Static content emphasizes the restaurant’s values and encourages user engagement.

----------------------------------------------------------------------------------------------------




----------------------------------------------------------------------------------------------------

# FoodMenu Page Overview

The **FoodMenu** page displays the restaurant’s full menu and allows users to filter items by category. It leverages dynamic React components and state to provide a smooth, responsive experience.

## Structure & Components

### 1. FoodMenu Page
- Wraps the page with **Header** and **Footer** for consistent navigation and layout.
- Maintains `category` state to filter food items (`none` for full menu by default).
- Smoothly scrolls to the top whenever the category changes.
- Handles a responsive **mobile filter popup** using `MenuFilterState`.
- Filters items based on type from `food.json`.

### 2. FoodFilter
- Displays categories (`Full Menu`, `Meals`, `Salads`, `Pizzas`, `Desserts`, `Drinks`) as clickable items.
- Highlights the currently selected category.
- Toggling the filter icon opens or closes the mobile popup menu.
- Works in tandem with `FoodFilterPopup` for mobile screens.

### 3. FoodFilterPopup
- A mobile-friendly overlay that displays the same category filter options as `FoodFilter`.
- Clicking outside the popup closes it.
- Reuses the **FoodFilter** component internally to keep UI consistent.

### 4. MenuItem
- Represents an individual food item with an image and name.
- Links to the **MenuItemPage** for detailed information about the dish.
- Includes fallback handling with a placeholder image if the original image fails to load.

### 5. Data Source (food.json)
- The menu items are loaded from a local `food.json` file.
- Each item contains:
  - `id` — unique identifier for the dish.
  - `type` — category (e.g., meal, salad, pizza, dessert, drink).
  - `name` — name of the dish.
  - `description` — detailed text describing the dish.
  - `image` — path to the dish image.
  - `price` — cost of the dish in UAH.
  - `ingredients` — an array of ingredient name/quantity pairs.
  - `bestWith` — an array of other dish IDs recommended as pairings.
- This structure allows filtering by `type` and displaying detailed information on the **MenuItemPage**.

## Features / Logic

- **Filtering Logic**: Uses `category` state to dynamically filter items from `food.json`.
- **Responsive Design**: Desktop shows inline category list, while mobile uses a popup overlay.
- **Reusable Components**: `MenuItem` and `FoodFilter` are designed to be reused across pages.
- **Smooth Scrolling**: Ensures the user view resets to the top when filtering changes.
- **Error Handling**: Menu items use a placeholder image if the original fails to load.
- **Outlet Integration**: Allows nested routing for future subpages or menu item details.

----------------------------------------------------------------------------------------------------




----------------------------------------------------------------------------------------------------

# Menu Item Page Overview

The **MenuItemPage** displays detailed information about a single menu item. It allows users to view the item’s description, ingredients, price, and recommended pairings, and provides functionality to add the item to the cart.

## Structure & Components

### 1. Header & Navigation
- Reuses the **Header** component for consistent layout and navigation.
- Dynamic **Cart** and **Profile** icons update based on user login state and current page.
- Mobile-friendly popup menu (`NavigationMenuPopup`) is included for small screens.

### 2. Main Content Section
- **Item Details (`main-info`)**: Shows the item’s image, name, description, and price.
- **Add to Cart Button**: Allows logged-in users to add the item to their cart or increase quantity if already present.
- **Fallback Handling**: Displays a placeholder image if the item image fails to load.

### 3. Ingredients Section (`ingredients-container`)
- Lists all ingredients with quantities in a structured format.
- Provides users with clear insight into the dish composition.

### 4. Recommendations Section (`recommendations-container`)
- **Best with** section: Displays other dishes from `food.json` using the `MenuItem` component.
- Helps users explore complementary items for a better dining experience.

### 5. Footer
- Standard **Footer** component with contact info, navigation links, and social media links.
- Maintains consistency with other pages.

## Supporting Components
- `MenuItem` — used for recommended dishes.
- `Header` & `Footer` — maintain unified layout and navigation.
- `UserDataContext` — provides user and cart data for dynamic functionality.

## Features / Logic
- **Dynamic Data Loading**: Finds the correct menu item using the `id` parameter from the URL.
- **User Authentication Check**: Redirects to Authentication page if a non-logged-in user tries to add to cart.
- **Cart Management**: Updates `cart` state in Context for real-time updates across components.
- **Error Handling**: Placeholder image fallback for missing images, and "Not found" message for invalid `id`.
- **Recommendations**: Dynamically renders related dishes from `food.json`.
- **Frontend Only**: While backend APIs are used to persist cart changes, this page focuses on frontend behavior.

----------------------------------------------------------------------------------------------------




----------------------------------------------------------------------------------------------------

# Authentication Page Overview

The **AuthenticationPage** provides users with the ability to either log in or register a new account. It manages the visibility of the `LoginForm` and `RegisterForm` components and integrates the app's shared `Header` and `Footer`.

## Structure & Components

### 1. AuthenticationPage
- Wraps the page with **Header** and **Footer** for consistent navigation and layout.
- Uses a state variable `form` to switch between `login` and `register` forms.
- Displays the appropriate form based on user interaction.

### 2. LoginForm
- Collects user credentials (email and password) to log in.
- Validates input and displays errors if authentication fails.
- On successful login:
  - Stores the user token in `localStorage`.
  - Updates `UserDataContext` with user information.
  - Redirects the user to `/profile`.
- Provides a link to switch to the registration form.

### 3. RegisterForm
- Collects email, password, and password confirmation to create a new account.
- Validates that passwords match before submission.
- On successful registration:
  - Automatically logs the user in.
  - Stores the user token in `localStorage`.
  - Updates `UserDataContext` with user information.
  - Redirects to `/profile`.
- Provides a link to switch back to the login form.
- Handles and displays errors during registration or login.

## State & Context
- `useState` manages form input values and which form is visible.
- `UserDataContext` provides `setUser` to update the global user state.
- `useNavigate` from React Router is used for programmatic navigation after login or registration.

## Features / Logic
- **Conditional rendering:** Only the currently selected form is displayed.
- **Form switching:** Users can toggle between login and registration seamlessly.
- **Error handling:** Shows inline messages for invalid credentials, password mismatches, or failed requests.
- **Integration with global state:** Ensures that `Header` and other components reflect the logged-in state immediately.
- **SPA Navigation:** Uses React Router to redirect users without full page reloads.

----------------------------------------------------------------------------------------------------




----------------------------------------------------------------------------------------------------

# Cart Page Overview

The **Cart** page displays all items currently added to the user's cart. It allows users to adjust quantities, remove items, view the total price, and proceed to payment. The page uses `UserDataContext` to manage the cart and ensure real-time updates across the app.

## Structure & Components

### 1. Cart Page
- Wraps the page with **Header** and **Footer** for consistent navigation and layout.
- Retrieves `cart` and `user` from **UserDataContext**.
- Uses `food.json` to display item details such as name, image, and price.
- Displays a message when the cart is empty.

### 2. Cart List
- Each cart item shows:
  - **Image** of the dish with a placeholder fallback if loading fails.
  - **Name** of the dish.
  - **Quantity controls** to increase or decrease the number of items.
  - **Price** calculated as `price × quantity`.
  - **Remove button** to delete the item from the cart.

### 3. Total & Payment
- Calculates the total price of all items in the cart.
- Provides a **Pay button** to place the order.
- Clears the cart locally and updates the backend after payment.

## State & Context
- **Context:** `UserDataContext` provides `cart`, `setCart`, and `user`.
- **Local State:** Quantity adjustments are managed per item via map/filter operations.
- **Backend Integration:** Updates the server-side cart and orders via `fetch` requests using the stored token.

## Features / Logic
- **Quantity Adjustment:** Users can increase or decrease item quantities; decreases never go below 1.
- **Remove Item:** Deletes a specific item from the cart.
- **Total Calculation:** Automatically updates as items are added, removed, or quantities are changed.
- **Payment Functionality:** Sends the order to the backend, clears the cart, and updates the server.
- **Error Handling:** Uses placeholder images if the original dish image fails to load.
- **Responsive UI:** Designed to display neatly for varying screen sizes.
- **SPA Integration:** Changes reflect immediately in other components like the cart icon in the `Header`.

----------------------------------------------------------------------------------------------------




----------------------------------------------------------------------------------------------------

# UserProfile Page Overview

The **UserProfile** page displays the logged-in user's personal information and order history. It allows users to view their email, log out, and review past orders. This page relies on `UserDataContext` for managing user data and orders.

## Structure & Components

### 1. UserProfile Page
- Wraps the page with **Header** and **Footer** for consistent navigation and layout.
- Retrieves `user`, `orders`, and `loading` from **UserDataContext**.
- Shows a loading message while user data is being fetched.

### 2. Profile Info Section
- Displays:
  - **Profile Picture** (static image).
  - **Email** of the user (falls back to "No email" if unavailable).
  - **Log Out button** that clears localStorage, resets user and cart state, and redirects to the homepage.

### 3. Order History Section
- Lists all previous orders:
  - Each order displays **dishes**, **total price**, and **date**.
  - Shows a fallback message if no orders have been made yet.

## State & Context
- **Context:** `UserDataContext` provides `user`, `orders`, and `loading`.
- **Local Operations:** Log out clears Context states (`user`, `cart`, `orders`) and localStorage token.

## Features / Logic
- **User Authentication State:** Only displays data if a user is logged in.
- **Order History:** Dynamically renders all past orders from the `orders` array.
- **Responsive Layout:** Designed for clean display on different screen sizes.
- **SPA Integration:** Changes in user or orders state immediately reflect across the app, including the `Header` icons.
- **Error Handling:** Fallback values and messages ensure the page remains readable even when data is missing.

----------------------------------------------------------------------------------------------------




----------------------------------------------------------------------------------------------------

# UserDataContext Overview

The **UserDataContext** provides global state management for user-related data across the Grevo restaurant app. It enables seamless communication between pages like `FoodMenu`, `MenuItemPage`, `Cart`, `AuthenticationPage`, and `UserProfile` without having to pass props manually through multiple component levels.

## Purpose
- Manage the **current logged-in user** (`user`).
- Track the **shopping cart** (`cart`) and allow real-time updates.
- Store the **order history** (`orders`) for the user.
- Provide a **loading state** (`loading`) while fetching user data from the server.
- Enable any component in the app to access and update this state easily.

## Provided Values
`UserDataContext.Provider` exposes the following to child components:

- **`user`** — the currently logged-in user object. If no one is logged in, this will be `null`.  
- **`setUser`** — a function to update the `user` state. You can call this after login, logout, or when updating user info.  
- **`cart`** — an array containing all the items currently in the user's shopping cart.  
- **`setCart`** — a function to modify the `cart`. Use this to add items, remove items, or change quantities.  
- **`orders`** — an array of the user’s past orders. Each order typically includes a list of dishes, total price, and date.  
- **`setOrders`** — a function to update the `orders` array, for example after a new purchase is completed.  
- **`loading`** — a boolean indicating whether user data is being fetched from the server. While `true`, the app can show a loading spinner or placeholder content.

## How It Works
1. On app load, `UserDataProvider` checks for a token in **localStorage**.
2. If a token exists:
   - Sends a request to check if the user is still logged in.
   - Fetches the current cart from the backend.
   - Fetches past orders from the backend.
3. Updates the corresponding state variables (`user`, `cart`, `orders`) with fetched data.
4. All child components have access to this data via `useContext(UserDataContext)`.

## Example Usage Across Pages

### FoodMenu / MenuItemPage
- Accesses `cart` and `setCart` to update cart when a user adds items.
- Optionally redirects to `AuthenticationPage` if the user is not logged in.

### Cart Page
- Reads `cart` to display items.
- Updates quantities or removes items using `setCart`.
- Synchronizes cart state with the server for logged-in users.

### AuthenticationPage (Login / Register)
- Updates `user` state after successful login or registration.
- Stores authentication token in **localStorage** for persistence.

### UserProfile Page
- Displays `user` information and `orders`.
- Provides log out functionality, clearing user-related state and token.

## Features / Logic
- **Centralized State Management**: Avoids prop drilling and keeps user data consistent across the app.
- **Persistent Authentication**: Reads token from localStorage to maintain login sessions.
- **Server Sync**: Updates cart and orders in real time with backend endpoints.
- **Reactive Updates**: Any changes to `cart`, `user`, or `orders` immediately reflect in all components consuming the context.
- **Error Handling**: Resets state on fetch failure and logs errors for debugging.

----------------------------------------------------------------------------------------------------















# BACK-END

----------------------------------------------------------------------------------------------------

# .env Overview

The **`.env`** file contains the environment variables required for the backend to connect to the database, run the server, and handle authentication. It is essential for proper configuration but does not contain code logic.

## Variables

- `DB_USER` — Username for connecting to the PostgreSQL database.  
- `DB_PASS` — Password for the PostgreSQL user.  
- `DB_HOST` — Host address of the PostgreSQL database.  
- `DB_PORT` — Port on which the database is listening.  
- `DB_NAME` — Name of the database to use.  
- `PORT` — Port on which the Node.js server will run.  
- `JWT_SECRET` — Secret key used to sign JWT tokens for authentication.

----------------------------------------------------------------------------------------------------




----------------------------------------------------------------------------------------------------

# server.js Overview

The **`server.js`** file is the entry point of the backend. It sets up the Express server, handles middleware, and connects the routes.

## Key Points

- Imports necessary modules: `express`, `cors`, `dotenv`, and route handlers like `userRoutes`.
- Configures **CORS** to allow requests from the frontend (adjust origin based on deployment).
- Uses `express.json()` middleware to parse incoming JSON request bodies.
- Mounts all user-related routes under the `/auth` path.
- Reads the `PORT` from environment variables, defaulting to `3000` if not set.
- Starts the server and logs a message when running.

----------------------------------------------------------------------------------------------------




----------------------------------------------------------------------------------------------------

# usersData.js Overview

The **`usersData.js`** module handles all interactions with the PostgreSQL database for user-related data, including user accounts, cart contents, and order history. It uses the `pg` package to connect to the database and dotenv to manage environment variables.

## Database Connection

- Uses `Pool` from the `pg` package for connection pooling.
- Reads connection details from `.env`:
  - `DB_USER`
  - `DB_HOST`
  - `DB_NAME`
  - `DB_PASS`
  - `DB_PORT`

This ensures secure and flexible configuration.

## Functions

### 1. `getUser(email)`
- Fetches a user from the `users` table by email.
- Returns a single user object or `undefined` if not found.

### 2. `getUserById(userId)`
- Fetches a user by their unique ID.
- Returns the user object or `undefined` if not found.

### 3. `addUser(email, password, userName)`
- Inserts a new user into the `users` table.
- Stores email, hashed password, and username.

### 4. `getCart(userId)`
- Retrieves the cart for a given user.
- Parses the `items` field from JSON string to array.
- Returns an empty array if no cart exists.

### 5. `updateCart(userId, items)`
- Updates or inserts the user's cart.
- Stores the cart as a JSON string in the `cart` table.
- Uses `ON CONFLICT` to ensure the cart is updated if the user already has one.

### 6. `getOrderHistory(userId)`
- Fetches the user’s past orders from the `order_history` table.
- Returns an array of orders or an empty array if none exist.

### 7. `addOrder(userId, order)`
- Adds a new order to the user's order history.
- Fetches current orders, appends the new one, and updates the table.
- Ensures proper JSON parsing if the stored orders are in string format.
- Uses `ON CONFLICT` to update existing rows if needed.

## Notes

- All functions are `async` and return Promises.
- Error handling is included for JSON parsing and database queries.
- The module abstracts database operations, allowing frontend routes to call these functions without directly dealing with SQL queries.

----------------------------------------------------------------------------------------------------




----------------------------------------------------------------------------------------------------

# user.js Overview

The **`user.js`** module defines all Express routes related to user authentication, cart management, and order history. It uses `bcrypt` for password hashing, `jsonwebtoken` for authentication, and the helper functions from `usersData.js` to interact with the database.

## Router Setup

- Uses `express.Router()` to define the routes.
- Imports database helper functions:
  - `getUser`, `getUserById`, `addUser`
  - `getCart`, `updateCart`
  - `getOrderHistory`, `addOrder`
- Protects sensitive routes with `authMiddleware`.

## Middleware

### `authMiddleware`
- Checks for an `Authorization` header with a Bearer token.
- Verifies the token using `jwt.verify()` and the `JWT_SECRET`.
- Attaches `req.userId` for downstream route handlers.
- Returns `401 Unauthorized` if no token is present or the token is invalid.

## Routes

### 1. Registration (`POST /register`)
- Receives `email`, `password`, and `userName` in the request body.
- Hashes the password using `bcrypt`.
- Calls `addUser` to insert the user into the database.
- Returns `{ success: true }` on success or `{ success: false, error: "Registration failed" }` on failure.

### 2. Login (`POST /login`)
- Receives `email` and `password`.
- Retrieves the user by email using `getUser`.
- Compares the provided password with the stored hash using `bcrypt.compare`.
- Generates a JWT token valid for 1 day if login succeeds.
- Returns `{ loggedIn: true, token, user }` on success, excluding the password.
- Returns `{ loggedIn: false, message }` if credentials are invalid.

### 3. Check Login (`GET /check`)
- Protected by `authMiddleware`.
- Verifies the token and fetches user data by ID.
- Returns `{ loggedIn: true, user }` if the user exists.
- Returns `{ loggedIn: false }` if no user is found or an error occurs.

### 4. Cart Routes
- **GET /cart** — Returns the current user’s cart items as `{ products }`.
- **POST /cart** — Updates the user’s cart in the database with `{ products }`.
- Both routes are protected with `authMiddleware`.

### 5. Orders Routes
- **GET /orders** — Returns the user’s order history as `{ orders }`.
- **POST /orders** — Adds a new order to the user’s history:
  - Receives `products` (array of dish names) and `totalPrice`.
  - Adds `date` automatically.
  - Calls `addOrder` to update the database.
- Both routes are protected with `authMiddleware`.

## Notes

- All sensitive routes require JWT authentication.
- Responses are JSON objects with success or error messages.
- Uses async/await for all database operations.
- Abstracts database logic through `usersData.js`, keeping routes clean and focused on request/response handling.

----------------------------------------------------------------------------------------------------