import 'dotenv/config';
import App from './app';
import UserRoute from './routes/user.route';
import IndexRoute from './routes/index.route';
const app = new App([UserRoute, IndexRoute]);

app.listen();
