import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";
import "./assets/dash.css";

export default function Dashboard() {
  const chartRef = useRef(null);
  const [transactions, setTransactions] = useState([]);
  const [totalIncome] = useState(100000); // Fixed income ₹1,00,000
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [balance, setBalance] = useState(0);

  const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("User not logged in!");

    try {
      const res = await axios.get(`http://localhost:5000/api/expenses/${userId}`);
      const expenses = res.data;

      setTransactions(expenses);

      const totalSpent = expenses
        .filter((txn) => txn.amount < 0)
        .reduce((sum, txn) => sum + Math.abs(txn.amount), 0);

      const currentBalance = totalIncome - totalSpent;

      setTotalExpenses(totalSpent);
      setBalance(currentBalance);

      renderChart(currentBalance, totalSpent, totalIncome);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    }
  };

  const renderChart = (balance, expenses, income) => {
    const ctx = document.getElementById("donutChart").getContext("2d");

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Total Balance", "Total Expenses", "Total Income"],
        datasets: [
          {
            data: [balance, expenses, income],
            backgroundColor: ["#7e57c2", "#e53935", "#fb8c00"],
            hoverOffset: 20,
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => formatINR(context.parsed),
            },
          },
        },
        cutout: "70%",
      },
    });
  };

  return (
    <div className="dashboard-container">
      <h1>Expense Tracker</h1>

      {/* Top Cards */}
      <div className="card-row">
        <div className="card purple">
          <div className="icon">💳</div>
          <div className="text">
            <p>Total Balance</p>
            <h2>{formatINR(balance)}</h2>
          </div>
        </div>
        <div className="card orange">
          <div className="icon">📥</div>
          <div className="text">
            <p>Total Income</p>
            <h2>{formatINR(totalIncome)}</h2>
          </div>
        </div>
        <div className="card red">
          <div className="icon">💸</div>
          <div className="text">
            <p>Total Expenses</p>
            <h2>{formatINR(totalExpenses)}</h2>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-row">
        <div className="transactions-card">
          <div className="section-header">
            <h3>Recent Transactions</h3>
            <Link to="/expenses">See All →</Link>
          </div>
          <ul>
            {transactions.slice(0, 5).map((txn, index) => (
              <li key={index} className={txn.amount >= 0 ? "income" : "expense"}>
                <span>{txn.title} - {txn.category}</span>
                <span>
                  {txn.amount >= 0 ? "+" : "-"} {formatINR(Math.abs(txn.amount))}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="chart-card">
          <h3>Financial Overview</h3>
          <canvas id="donutChart" width="250" height="250"></canvas>
          <div className="legend">
            <span><span className="dot purple"></span> Total Balance</span>
            <span><span className="dot red"></span> Total Expenses</span>
            <span><span className="dot orange"></span> Total Income</span>
          </div>
        </div>
      </div>
    </div>
  );
}
