import http from 'http';
import app from './app';

http
  .createServer(app)
  .listen(app.get('port'), () => {
    console.log(`Listening on http://localhost:${app.get('port')}`);
    console.log('Press CTRL-C to stop');
  });
