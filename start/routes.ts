/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const ImagesController = () => import('#controllers/images_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
router.group(() => {
  router.post("/signIn",[UsersController, "signIn"]);
  router.post("/signUp",[UsersController, "signUp"]);

  router.post("/getProfile",[UsersController, "index"]).use((middleware.auth({
    guards: ['api']
  })));
  router.post("/setUserName",[UsersController, "setUserName"]).use((middleware.auth({
    guards: ['api']
  })));

  router.post("/refresh-token",[UsersController, "index"]).use((middleware.auth({
    guards: ['api_refresh']
  })));

  router.post("/predict",[ImagesController, "predict"]).use((middleware.auth({
    guards: ['api']
  })));




}).prefix("api");