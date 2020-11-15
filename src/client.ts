import Response from "./response"

export enum Method {
  None = "none",
  BrowseKeyStore = "browseKeyStore",
  ShowFileChooser = "showFileChooser",
  GetKeys = "getKeys",
  SetLocale = "setLocale",
  GetNotBefore = "getNotBefore",
  GetNotAfter = "getNotAfter",
  GetSubjectDN = "getSubjectDN",
  GetIssuerDN = "getIssuerDN",
  GetRdnByOid = "getRdnByOid",
  SignPlainData = "signPlainData",
  VerifyPlainData = "verifyPlainData",
  CreateCMSSignature = "createCMSSignature",
  VerifyCMSSignature = "verifyCMSSignature",
  CreateCMSSignatureFromFile = "createCMSSignatureFromFile",
  VerifyCMSSignatureFromFile = "verifyCMSSignatureFromFile",
  SignXml = "signXml",
  VerifyXml = "verifyXml",
  SignXmlByElementId = "signXmlByElementId",
  VerifyXmlByElementId = "verifyXmlByElementId",
  GetHash = "getHash",
}

export type Payload = {
  module?: string
  method: Method
  args: any[]
}

export type Callback = (resp: Response) => void

export type ClientError = { message: string }

export default class Client {
  private cb: Callback
  private ws: WebSocket
  private err: ClientError = { message: "" }

  method: Method = Method.None
  version: string = ""

  constructor(ws: WebSocket) {
    if (ws) {
      this.cb = (resp: Response) => {
        this.version = resp.getResultObject()?.version
      }

      this.ws = ws
      this.ws.onmessage = (e) => {
        // Skip this because setLocale returns nothing.
        if (this.method === Method.SetLocale) return

        const data = JSON.parse(e.data)
        if (data) {
          this.cb(new Response(data.result, data.secondResult, data.errorCode))
        } else {
          console.log(
            "onmessage: proper callback is not set or wrong data format:"
          )
          console.log(JSON.stringify(e.data))
        }
      }

      return
    }

    this.err = { message: "init: websocket instance is null or undefined" }
  }

  readyState(): number {
    return this.ws.readyState
  }

  close() {
    this.ws.close()
  }

  hasError(): boolean {
    return this.err?.message != ""
  }

  getError(): ClientError {
    return this.err
  }

  send(data: Payload, callback: Callback) {
    // Return none if client has error.
    if (this.hasError()) return Method.None

    this.method = data.method
    this.ws.send(JSON.stringify(data))
  }

  browseKeyStore(
    storageName: string,
    fileExtension: string,
    currentDirectory: string,
    callback: Callback
  ) {
    this.send(
      {
        method: Method.BrowseKeyStore,
        args: [storageName, fileExtension, currentDirectory],
      },
      callback
    )
  }

  showFileChooser(
    fileExtension: string,
    currentDirectory: string,
    callback: Callback
  ) {
    this.send(
      {
        method: Method.ShowFileChooser,
        args: [fileExtension, currentDirectory],
      },
      callback
    )
  }

  getKeys(
    storageName: string,
    storagePath: string,
    password: string,
    type: string,
    callback: Callback
  ) {
    this.send(
      {
        method: Method.GetKeys,
        args: [storageName, storagePath, password, type],
      },
      callback
    )
  }

  setLocale(lang: string, callback: Callback) {
    this.send(
      {
        method: Method.SetLocale,
        args: [lang],
      },
      callback
    )
  }

  getNotBefore(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    callback: Callback
  ) {
    this.send(
      {
        method: Method.GetNotBefore,
        args: [storageName, storagePath, keyAlias, password],
      },
      callback
    )
  }

  getNotAfter(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    callback: Callback
  ) {
    this.send(
      {
        method: Method.GetNotAfter,
        args: [storageName, storagePath, keyAlias, password],
      },
      callback
    )
  }

  getSubjectDN(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    callback: Callback
  ) {
    this.send(
      {
        method: Method.GetSubjectDN,
        args: [storageName, storagePath, keyAlias, password],
      },
      callback
    )
  }

  getIssuerDN(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    callback: Callback
  ) {
    this.send(
      {
        method: Method.GetIssuerDN,
        args: [storageName, storagePath, keyAlias, password],
      },
      callback
    )
  }

  getRdnByOid(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    oid: string,
    oidIndex: number,
    callback: Callback
  ) {
    this.send(
      {
        method: Method.GetRdnByOid,
        args: [storageName, storagePath, keyAlias, password, oid, oidIndex],
      },
      callback
    )
  }

  signPlainData(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    toSign: string,
    callback: Callback
  ) {
    this.send(
      {
        method: Method.SignPlainData,
        args: [storageName, storagePath, keyAlias, password, toSign],
      },
      callback
    )
  }

  verifyPlainData(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    toVerify: string,
    signature: string,
    callback: Callback
  ) {
    this.send(
      {
        method: Method.VerifyPlainData,
        args: [
          storageName,
          storagePath,
          keyAlias,
          password,
          toVerify,
          signature,
        ],
      },
      callback
    )
  }

  createCMSSignature(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    toSign: string,
    attached: boolean,
    callback: Callback
  ) {
    this.send(
      {
        method: Method.CreateCMSSignature,
        args: [storageName, storagePath, keyAlias, password, toSign, attached],
      },
      callback
    )
  }

  verifyCMSSignature(toVerify: string, signature: string, callback: Callback) {
    this.send(
      {
        method: Method.VerifyCMSSignature,
        // swap params due to NCALayer' inconvenient order
        args: [signature, toVerify],
      },
      callback
    )
  }

  createCMSSignatureFromFile(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    filePath: string,
    attached: boolean,
    callback: Callback
  ) {
    this.send(
      {
        method: Method.CreateCMSSignatureFromFile,
        args: [
          storageName,
          storagePath,
          keyAlias,
          password,
          filePath,
          attached,
        ],
      },
      callback
    )
  }

  verifyCMSSignatureFromFile(
    filePath: string,
    signature: string,
    callback: Callback
  ) {
    this.send(
      {
        method: Method.VerifyCMSSignatureFromFile,
        // swap params due to NCALayer' inconvenient order
        args: [signature, filePath],
      },
      callback
    )
  }

  signXml(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    toSign: string,
    callback: Callback
  ) {
    this.send(
      {
        method: Method.SignXml,
        args: [storageName, storagePath, keyAlias, password, toSign],
      },
      callback
    )
  }

  verifyXml(signature: string, callback: Callback) {
    this.send(
      {
        method: Method.VerifyXml,
        args: [signature],
      },
      callback
    )
  }

  signXmlByElementId(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string,
    toSign: string,
    elementName: string,
    idAttrName: string,
    parentElementName: string,
    callback: Callback
  ) {
    this.send(
      {
        method: Method.SignXmlByElementId,
        args: [
          storageName,
          storagePath,
          keyAlias,
          password,
          toSign,
          elementName,
          idAttrName,
          parentElementName,
        ],
      },
      callback
    )
  }

  verifyXmlByElementId(
    signature: string,
    idAttrName: string,
    parentElementName: string,
    callback: Callback
  ) {
    this.send(
      {
        method: Method.VerifyXml,
        args: [signature, idAttrName, parentElementName],
      },
      callback
    )
    this.method = Method.VerifyXmlByElementId
  }

  getHash(input: string, digestAlg: string, callback: Callback) {
    this.send(
      {
        method: Method.GetHash,
        args: [input, digestAlg],
      },
      callback
    )
  }
}
