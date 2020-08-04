import { Controller } from './../protocols/Controller'
import { EmailValidator } from './../protocols/EmailValidator'
import { HttpRequest, HttpResponse } from './../protocols/http'
import { MissingParamError } from './../errors/MissingParamError'
import { InvalidParamError } from './../errors/InvalidParamError'
import { badRequest, serverError } from './../helpers/httpHelpers'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredField = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch {
      return serverError()
    }
    return serverError()
  }
}
