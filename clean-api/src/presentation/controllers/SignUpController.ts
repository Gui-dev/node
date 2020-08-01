import { HttpRequest, HttpResponse } from './../protocols/http'
import { MissingParamError } from './../errors/MissingParamError'
import { badRequest } from './../helpers/httpHelpers'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredField = ['name', 'email', 'password']
    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return badRequest(new MissingParamError('server'))
  }
}
