import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http'

export default class AlertsController {


    public async getAlerts(httpContext:HttpContext){
        const user:User =    httpContext.auth.user!;
        await user.load("alerts");
        return {"alerts":user.alerts};
    }
}