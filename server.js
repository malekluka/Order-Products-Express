require('dotenv').config();

const app = require('./app'),
      port = process.env.PORT || 5000,
      http = require('http');

http.createServer(app);

app.listen(port , () => console.log(`Server Running on localhost: ${port}`))