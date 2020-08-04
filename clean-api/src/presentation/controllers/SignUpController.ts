import { Controller } from './../protocols/Controller'
import { EmailValidator } from './../protocols/EmailValidator'
import { HttpRequest, HttpResponse } from './../protocols/http'
import { MissingParamError } from './../errors/MissingParamError'
import { InvalidParamError } from './../errors/InvalidParamError'
import { ServerError } from '../errors/ServerError'
import { badRequest } from './../helpers/httpHelpers'

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
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
    return badRequest(new ServerError())
  }
}
