import { Controller } from './../protocols/Controller'
import { HttpRequest, HttpResponse } from './../protocols/http'
import { MissingParamError } from './../errors/MissingParamError'
import { badRequest } from './../helpers/httpHelpers'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredField = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return badRequest(new MissingParamError('server'))
  }
}
