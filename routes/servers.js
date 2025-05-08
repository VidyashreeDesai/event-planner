const eventRoutes = require('./routes/eventRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/events', eventRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);
