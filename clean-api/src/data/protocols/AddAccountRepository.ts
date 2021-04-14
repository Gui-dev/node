import { AddAccountModel } from './../../domain/usercases/AddAccount'
import { AccountModel } from './../../domain/models/AccountModel'

export interface AddAccountRepository {
  add (accountData: AddAccountModel): Promise<AccountModel>
}
