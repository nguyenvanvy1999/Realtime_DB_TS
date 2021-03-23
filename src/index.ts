import App from './app';
import UserRoute from './routes/user.route';
import IndexRoute from './routes/index.route';
import AdminRoute from './routes/admin.route';
import ActorRoute from './routes/actor.router';
import FilmRoute from './routes/film.route';
const app = new App([UserRoute, IndexRoute, AdminRoute, ActorRoute, FilmRoute]);

app.listen();
