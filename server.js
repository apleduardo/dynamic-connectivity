'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const QuickFind = require('./models/union-find/QuickFind');

// App
const app = express();

app.get('/quick-find/conected/:p/:q', (req, res) => {
  const quickFind = new QuickFind();
  const p = req.params.p;
  const q = req.params.q;
  res.send(quickFind.id + ' - ' + quickFind.showConectedsComponents() + ' - ' + quickFind.conected(p, q));
});

app.get('/quick-find/union/:p/:q', (req, res) => {
  const quickFind = new QuickFind();
  const p = req.params.p;
  const q = req.params.q;
  quickFind.union(p,q);
  res.send(quickFind.id + ' - ' + quickFind.conected(p, q));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
