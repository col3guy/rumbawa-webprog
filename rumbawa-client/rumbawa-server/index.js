('dotenv').config();
const express = ('express');
const mongoose = ('mongoose');
const cors = ('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected ✓'))
  .catch(err => console.log('Connection failed:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});