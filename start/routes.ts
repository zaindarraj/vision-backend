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
const AlertsController = ()=>import('#controllers/alerts_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import { normalize, sep } from 'path'
import app from '@adonisjs/core/services/app'

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
  router.post("/alerts",[AlertsController, "getAlerts"]).use((middleware.auth({
    guards: ['api']
  })));


const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

router.get('/images/*', ({ request, response }) => {
  const filePath = request.param('*').join(sep)
  const normalizedPath = normalize(filePath)

  if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
    return response.badRequest('Malformed path')
  }

  const absolutePath = app.makePath('', normalizedPath)
  console.log(absolutePath)

  return response.download(absolutePath)
})




}).prefix("api");