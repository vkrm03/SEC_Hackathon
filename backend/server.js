const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Expense = require('./models/Expenses');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'Expense_Track';

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ExpenseEase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

app.get('/', (req, res) => {
  res.send('🚀 ExpenseEase Backend is Running...');
});

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists!' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Registered successfully!' });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

app.post('/api/expenses', async (req, res) => {
  const { title, amount, date, category, userId } = req.body;

  try {
    if (!title || !amount || !date || !category || !userId) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const expense = new Expense({ title, amount, date, category, userId });
    await expense.save();

    res.status(201).json({ message: 'Expense added successfully!', expense });
  } catch (err) {
    console.error('Expense Error:', err);
    res.status(500).json({ message: 'Server error. Could not add expense.' });
  }
});

app.get('/api/expenses/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    console.error("Fetch Expenses Error:", err);
    res.status(500).json({ message: "Server error. Could not fetch expenses." });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials!' });

    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: { name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
