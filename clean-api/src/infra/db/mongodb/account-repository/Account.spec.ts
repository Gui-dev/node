import { MongoHelper } from './../helpers/MongoHelper'
import { AccountMongoRepository } from './AccountMongoRepository'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    const uri: any = process.env.MONGO_URL
    await MongoHelper.connect(uri)
  })

  afterAll(async () => {
    await MongoHelper.desconnect()
  })

  test('Should return an account on success', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email')
    expect(account.password).toBe('any_password')
  })
})
