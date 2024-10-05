import type { HttpContext } from '@adonisjs/core/http'
import { signInValidator } from '#validators/sign_in'
import { signUpValidator } from '#validators/sign_up'

import User from '#models/user'
import { Exception } from '@adonisjs/core/exceptions'
import { log } from 'console'


export default class UsersController {

    public async signIn(httpContext : HttpContext){
        const payload = await httpContext.request.validateUsing(signInValidator)
        const user = await User.verifyCredentials(payload.email, payload.password)
        const refreshToken = await User.refreshTokens.create(user)
        const accessToken = await User.accessTokens.create(user)     
       
        return {"accessToken" : accessToken, "refreshToken" : refreshToken}
      }

      public async signUp(httpContext : HttpContext){
        const payload = await httpContext.request.validateUsing(signUpValidator)
        const user = await User.create(payload);
        const refreshToken = await User.refreshTokens.create(user)
        const accessToken = await User.accessTokens.create(user)     
        return {"accessToken" : accessToken, "refreshToken" : refreshToken}
      }

      public async index(httpContext:HttpContext){
        return httpContext.auth.user;
      }

      public async setUserName(httpContext:HttpContext){
        const userName  = httpContext.request.only(["userName"]).userName;
        console.log(userName)
        const user =  httpContext.auth.user
        if(user){
          user.fullName= userName;
          await user.save()

          return {"userName" : userName};
        }
        throw Exception;
      }

     
}