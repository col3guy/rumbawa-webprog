require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

const seedUsers = async () => {
  try {
    const defaultAdminEmail = 'admin@rumbawa.dev';
    const defaultAdminExists = await User.exists({ email: defaultAdminEmail.toLowerCase() });
    if (defaultAdminExists) return;

    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      existingAdmin.email = defaultAdminEmail.toLowerCase();
      existingAdmin.password = bcrypt.hashSync('Admin123!', 10);
      existingAdmin.username = 'admin';
      await existingAdmin.save();
      console.log('Updated existing admin account to default admin credentials');
      return;
    }

    const usersCount = await User.countDocuments();

    const adminUser = {
      firstName: 'Admin',
      lastName: 'User',
      age: '30',
      gender: 'male',
      contactNumber: '09171234567',
      email: defaultAdminEmail,
      role: 'admin',
      username: 'admin',
      password: 'Admin123!',
      address: 'Sampaloc, Manila, Metro Manila',
      isActive: true,
    };

    const initialUsers = [adminUser];

    if (usersCount === 0) {
      initialUsers.push(
        {
          firstName: 'Marco',
          lastName: 'Santos',
          age: '31',
          gender: 'male',
          contactNumber: '09182345678',
          email: 'marco.santos@robles.dev',
          role: 'viewer',
          username: 'marcosantos',
          password: 'Marco123!',
          address: 'Tondo, Manila, Metro Manila',
          isActive: true,
        },
        {
          firstName: 'Bianca',
          lastName: 'Cruz',
          age: '26',
          gender: 'female',
          contactNumber: '09193456789',
          email: 'bianca.cruz@robles.dev',
          role: 'editor',
          username: 'biancacruz',
          password: 'Bianca123!',
          address: 'Quezon City, Metro Manila',
          isActive: true,
        }
      );
    }

    const seeded = initialUsers.map((user) => ({
      ...user,
      email: user.email.toLowerCase(),
      password: bcrypt.hashSync(user.password, 10),
    }));

    await User.insertMany(seeded);
    console.log('Seeded default admin user');
  } catch (error) {
    console.error('Could not seed users:', error.message);
  }
};

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Rumbawa';

mongoose.connect(mongoUri)
  .then(async () => {
    console.log('MongoDB connected ✓');
    await seedUsers();
  })
  .catch(err => console.log('Connection failed:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});