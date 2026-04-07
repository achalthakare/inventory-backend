// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const errorHandler = require('./middleware/errorMiddleware');

// const materialsRoutes = require('./routes/materialsRoutes');
// const requestsRoutes = require('./routes/requestsRoutes');
// const suppliersRoutes = require('./routes/suppliersRoutes');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/materials', materialsRoutes);
// app.use('/requests', requestsRoutes);
// app.use('/suppliers', suppliersRoutes);

// // Error Middleware
// app.use(errorHandler);

// app.listen(process.env.PORT || 5000, () => console.log('Server running on port ' + (process.env.PORT || 5000)));



require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorMiddleware');
const db = require('./config/db'); // 👈 ADD THIS

const materialsRoutes = require('./routes/materialsRoutes');
const requestsRoutes = require('./routes/requestsRoutes');
const suppliersRoutes = require('./routes/suppliersRoutes');

const app = express();

app.use(cors());
app.use(express.json());


// ✅ ADD THIS BLOCK 👇 (DB CONNECTION CHECK)
db.getConnection((err, conn) => {
  if (err) {
    console.error("DB ERROR:", err);
  } else {
    console.log("DB Connected ✅");
    conn.release();
  }
});


// Routes
app.use('/materials', materialsRoutes);
app.use('/requests', requestsRoutes);
app.use('/suppliers', suppliersRoutes);

// Error Middleware
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () =>
  console.log('Server running on port ' + (process.env.PORT || 5000))
);