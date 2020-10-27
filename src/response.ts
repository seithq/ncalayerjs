import { isNone, isNullOrEmpty } from "./helpers"

export default class Response {
  private result: string
  private secondResult: string
  private errorCode: string

  constructor(result: string, secondResult: string, errorCode: string) {
    this.result = result || ""
    this.secondResult = secondResult || ""
    this.errorCode = errorCode || ""
  }

  isOk(): boolean {
    return isNone(this.errorCode) && !isNullOrEmpty(this.result)
  }

  getResult(): string {
    return this.result
  }

  getResultObject(): any {
    return this.getResult()
  }

  getSecondResult(): string {
    return this.secondResult
  }

  getErrorCode(): string {
    return this.errorCode
  }

  isWrongPasswordWithAttempts(): boolean {
    return this.isWrongPassword() && +this.result > -1
  }

  isWrongPassword(): boolean {
    return this.errorCode === "WRONG_PASSWORD"
  }

  isWrongKeyType(): boolean {
    return this.errorCode === "EMPTY_KEY_LIST"
  }

  isRdnNotFound(): boolean {
    return this.errorCode === "RDN_NOT_FOUND"
  }

  isWrongXml(): boolean {
    return this.errorCode === "XML_PARSE_EXCEPTION"
  }

  isWrongSignature(): boolean {
    return this.errorCode === "SIGNATURE_VALIDATION_ERROR"
  }
}
