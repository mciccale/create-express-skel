import app from './app';
import config from './utils/config';

const PORT = config.PORT ?? 3000;

app.listen(PORT, (): void => {
  console.log(`Server listening at port: ${PORT}`);
});
