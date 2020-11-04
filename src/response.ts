export default class Response {
  private result: string
  private secondResult: string
  private errorCode: string

  constructor(result: string, secondResult: string, errorCode: string) {
    this.result = result || ""
    this.secondResult = secondResult || ""
    this.errorCode = errorCode || ""
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

  isOk(): boolean {
    return this.errorCode === "NONE"
  }

  isPasswordAttemptsError(): boolean {
    return this.isPasswordError() && +this.result > -1
  }

  isPasswordError(): boolean {
    return this.errorCode === "WRONG_PASSWORD"
  }

  isKeyTypeError(): boolean {
    return this.errorCode === "EMPTY_KEY_LIST"
  }

  isRdnNotFoundError(): boolean {
    return this.errorCode === "RDN_NOT_FOUND"
  }

  isXmlParseError(): boolean {
    return this.errorCode === "XML_PARSE_EXCEPTION"
  }

  isSignatureValidationError(): boolean {
    return this.errorCode === "SIGNATURE_VALIDATION_ERROR"
  }

  isCommonError(): boolean {
    return this.errorCode === "COMMON"
  }

  isKeyStoreError(): boolean {
    return this.errorCode === "LOAD_KEYSTORE_ERROR"
  }

  isUnknownStorageError(): boolean {
    return this.errorCode === "UNKNOWN_STORAGE"
  }

  isFileReadError(): boolean {
    return this.errorCode === "FILE_READ_ERROR"
  }
}
