import App from './app';
import UserRoute from './routes/user.route';
import IndexRoute from './routes/index.route';
import AdminRoute from './routes/admin.route';

const app = new App([UserRoute, IndexRoute, AdminRoute]);

app.listen();
