import { server } from './server';

const port = Number(process.env.PORT) || 3030;

server.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
