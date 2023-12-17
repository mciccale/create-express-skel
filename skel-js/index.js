const app = require('./app');
const config = require('./utils/config');

const PORT = config.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});
