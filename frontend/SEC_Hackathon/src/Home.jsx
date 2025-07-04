import React, {useState, useEffect} from "react";
import "../src/assets/home.css"
import AOS from "aos";
import "aos/dist/aos.css";


export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <main className="home-container" data-aos="fade-up">
        {/* 🏠 Hero Section */}
        <section className="hero">
          <div className="text-content">
            <h1><strong>ExpenseEase</strong></h1>
            <p>
              Your ultimate personal finance tool — track your spending,
              split group expenses, and stay in control of your cash with ease.
            </p>
            <button className="shop-btn" onClick={() => {
              document.getElementById("features").scrollIntoView({ behavior: 'smooth' });
            }}>
              Start Managing
            </button>
          </div>
          <div className="image-content">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbmG5vP828Niz_p6ZnOMGRm4MyWmXFAwBERaonz103D7-pflWw_aQhgoQ5vHhcE3YRFKc&usqp=CAU" alt="Expense Illustration" />
          </div>
        </section>

        <section className="features" id="features" data-aos="fade-up">
          <h2>Why Choose ExpenseEase?</h2>
          <div className="feature-cards">
            <div className="feature">
              <h3>Track All Expenses</h3>
              <p>Easily log your daily expenses and categorize them in a clean UI.</p>
            </div>
            <div className="feature">
              <h3>Split With Friends</h3>
              <p>Create groups, add shared expenses, and settle balances hassle-free.</p>
            </div>
          </div>
        </section>

        <section className="bookaroo-connect" data-aos="fade-up">
          <div className="connect-left">
            <h3>Stay In The Loop</h3>
            <p>
              Get updates when friends add expenses, when someone settles up,
              or when it's time to check your spending habits.
            </p>
            <form>
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Notify Me</button>
            </form>
          </div>

          <div className="connect-right">
            <h3>Join the Community</h3>
            <p>
              Connect with fellow money nerds 💰, share saving tips,
              or suggest cool new features.
            </p>
            <button className="join-btn">Join Us</button>
          </div>
        </section>

        {/* 📜 Footer */}
        <footer className="footer" data-aos="fade-up">
          <p>© {new Date().getFullYear()} ExpenseEase — Made by Dynamix</p>
        </footer>
      </main>
    </>
  );
}