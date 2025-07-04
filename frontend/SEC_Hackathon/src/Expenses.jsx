import React, { useState, useEffect } from "react";
import axios from "axios";
import "./assets/expenses.css";

export default function Expenses() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
  });
  const [transactions, setTransactions] = useState([]);

  const userId = localStorage.getItem("userId");

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/expenses/${userId}`);
      setTransactions(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    if (userId) fetchExpenses();
  }, [userId]);

  const handleOpenModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setFormData({ title: "", amount: "", date: "", category: "" });
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("User not logged in!");

    try {
      await axios.post("http://localhost:5000/api/expenses", {
        ...formData,
        userId,
      });
      handleCloseModal();
      fetchExpenses(); // Refresh list after adding
      alert("Expense added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add expense.");
    }
  };

  return (
    <div className="expenses-wrapper">
      <div className={`expenses-page ${showModal ? "blurred" : ""}`}>
        <h2>All Expenses</h2>
        <button className="add-btn" onClick={handleOpenModal}>
          ➕ Add Expense
        </button>

        <ul className="expenses-list">
          {transactions.map((item, index) => (
            <li key={index} className={item.amount > 0 ? "income" : "expense"}>
              <span>{item.title} - {item.category}</span>
              <span>
                {item.amount > 0 ? "+" : "-"} ₹{Math.abs(item.amount)}
              </span>
              <small>{new Date(item.date).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <div className="modal-container">
          <div className="modal">
            <h3>Add New Expense</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                required
              />
              <div className="btn-group">
                <button type="submit" className="submit">Save</button>
                <button type="button" onClick={handleCloseModal} className="cancel">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
