const express = require('express');
const app = express();

const newsRoutes = require('./routers/newsRoutes');

app.use('/api', newsRoutes);

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-eval' ");
    next();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});