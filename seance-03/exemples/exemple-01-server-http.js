// Exemple 01 - Serveur HTTP basique (module http, mode modules ES)

import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);

  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bienvenue sur mon serveur HTTP Node.js');
  } else if (req.url === '/hello' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Hello depuis /hello');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Page non trouvée');
  }
});

server.listen(PORT, () => {
  console.log(`Serveur HTTP démarré sur http://localhost:${PORT}`);
});

