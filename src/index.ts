import { server } from './server';

const port = Number(process.env.PORT) || 3030;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`Server running in http://${host}:${port}`);
});
