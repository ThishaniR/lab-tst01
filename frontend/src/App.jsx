import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/items";

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    description: ""
  });
  const [message, setMessage] = useState("");

  // Load all items when the page first opens.
  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      setMessage("Could not load items. Check if backend is running.");
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          quantity: Number(formData.quantity),
          price: Number(formData.price),
          description: formData.description
        })
      });

      if (!response.ok) {
        setMessage("Failed to add item.");
        return;
      }

      setFormData({
        name: "",
        quantity: "",
        price: "",
        description: ""
      });
      setMessage("Item added successfully.");
      fetchItems();
    } catch (error) {
      setMessage("Could not add item. Check if backend is running.");
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        setMessage("Failed to delete item.");
        return;
      }

      setMessage("Item deleted successfully.");
      fetchItems();
    } catch (error) {
      setMessage("Could not delete item. Check if backend is running.");
    }
  }

  return (
    <main className="app">
      <section className="container">
        <h1>MERN Item Manager</h1>
        <p className="subtitle">Simple CRUD project for lab test practice</p>

        <form className="item-form" onSubmit={handleSubmit}>
          <label>
            Item Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Example: Notebook"
              required
            />
          </label>

          <label>
            Quantity
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Example: 10"
              required
            />
          </label>

          <label>
            Price
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Example: 250"
              required
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Example: Used for lecture notes"
              required
            />
          </label>

          <button type="submit">Add Item</button>
        </form>

        {message && <p className="message">{message}</p>}

        <section className="list-section">
          <h2>Item List</h2>

          {items.length === 0 ? (
            <p className="empty-text">No items found.</p>
          ) : (
            <div className="item-list">
              {items.map((item) => (
                <article className="item-card" key={item._id}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: Rs. {item.price}</p>
                    <p>{item.description}</p>
                  </div>

                  <button className="delete-button" onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
