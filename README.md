# MERN CRUD Lab Practice Project

This is a simple beginner-friendly MERN stack CRUD project.

- Frontend: React
- Backend: Node.js + Express
- Database: MongoDB with Mongoose
- Styling: Plain CSS

The project manages a simple list of items. You can:

- Add an item
- View all items
- Delete an item

There is no authentication, no TypeScript, no Redux, and no Tailwind.

## Full Folder Structure

```text
mern-crud-lab/
├── backend/
│   ├── models/
│   │   └── Item.js
│   ├── routes/
│   │   └── itemRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── README.md
```

## How The Frontend Connects To The Backend

The frontend uses `fetch()` to call backend API URLs.

In `frontend/src/App.jsx`, this line stores the backend URL:

```js
const API_URL = "http://localhost:5000/api/items";
```

The React app uses that URL to:

- `GET /api/items` - load all items
- `POST /api/items` - add a new item
- `DELETE /api/items/:id` - delete one item

The backend allows the frontend to call it using `cors()` in `backend/server.js`.

## How To Connect MongoDB

1. Create a MongoDB Atlas account or use a local MongoDB database.
2. Get your MongoDB connection string.
3. In the `backend` folder, create a file named `.env`.
4. Copy the content from `.env.example`.
5. Replace the MongoDB URL with your own connection string.

Example `.env` file:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/mern_lab_db
PORT=5000
```

Important:

- Replace `username` and `password`.
- Make sure your MongoDB Atlas network access allows your IP address.
- Do not upload your real `.env` file to GitHub.

## How To Run The Project

Open two terminals.

### Terminal 1: Run Backend

```bash
cd mern-crud-lab/backend
npm install
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

### Terminal 2: Run Frontend

```bash
cd mern-crud-lab/frontend
npm install
npm run dev
```

Frontend runs at the URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Code File By File

### `backend/package.json`

Contains backend dependencies and scripts.

Main packages:

- `express` creates the API server.
- `mongoose` connects Node.js to MongoDB.
- `cors` allows React to call the backend.
- `dotenv` reads values from `.env`.
- `nodemon` restarts the server when files change.

### `backend/server.js`

This is the backend starting point.

It:

- Loads environment variables
- Connects to MongoDB
- Starts the Express server
- Registers the item API routes

### `backend/models/Item.js`

This file defines the MongoDB document structure.

Current fields:

- `name`
- `quantity`
- `description`

### `backend/routes/itemRoutes.js`

This file contains the API logic.

Routes:

- `GET /api/items`
- `POST /api/items`
- `DELETE /api/items/:id`

### `frontend/package.json`

Contains frontend dependencies and scripts.

Main packages:

- `react`
- `react-dom`
- `vite`

### `frontend/src/main.jsx`

This file renders the React app into the browser.

### `frontend/src/App.jsx`

This is the main UI file.

It:

- Stores form values
- Loads items from backend
- Sends new item data to backend
- Deletes items
- Displays the item list

### `frontend/src/App.css`

This file contains plain CSS only.

## 5 Lab Test Tasks To Practice

1. Add a new field called `category`.
2. Add a new field called `price`.
3. Change the project from Item Manager to Student Manager.
4. Add an update/edit button.
5. Show a message when the item list is empty.

## 5 Common Beginner Mistakes

1. Forgetting to run backend and frontend in separate terminals.
2. Forgetting to create the backend `.env` file.
3. Using the wrong MongoDB connection string.
4. Calling the wrong API URL in React.
5. Forgetting to restart the backend after changing backend files.

## Files To Edit When Adding A New Field

Example: adding a new field called `category`.

Edit these files:

1. `backend/models/Item.js`
   - Add `category` to the Mongoose schema.

2. `backend/routes/itemRoutes.js`
   - Read `category` from `req.body`.
   - Save `category` when creating a new item.

3. `frontend/src/App.jsx`
   - Add `category` to the form state.
   - Add an input field for `category`.
   - Send `category` to the backend.
   - Display `category` in the item list.

4. `frontend/src/App.css`
   - Only edit this if the new field needs styling.

## Easy Modification Tip

For lab tests, follow this order when adding a new field:

1. Add the field to the Mongoose model.
2. Add the field to the backend route.
3. Add the field to React state.
4. Add the input box.
5. Show the field in the list.

