import { AddAccountRepository } from './../../../../data/protocols/AddAccountRepository'
import { AddAccountModel } from '../../../../domain/usercases/AddAccount'
import { AccountModel } from '../../../../domain/models/AccountModel'
import { MongoHelper } from './../helpers/MongoHelper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = result.ops[0]

    const accountWithoutId = Object.assign({}, account, { id: account._id })
    delete accountWithoutId._id

    return accountWithoutId
  }
}
