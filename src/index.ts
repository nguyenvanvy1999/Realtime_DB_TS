import App from './app';
import UserRoute from './routes/user.route';
import IndexRoute from './routes/index.route';
import AuthRoute from './routes/auth.router';

const app = new App([UserRoute, IndexRoute, AuthRoute]);

app.listen();
