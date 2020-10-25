type NCALayerError = {
  code: number
  reason: string
  message: string
}

enum MethodName {
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

type Payload = {
  method: MethodName
  args: any[]
}

class Client {
  private ws: WebSocket
  private err: NCALayerError
  private callback: (data) => {}

  constructor(url?: string) {
    this.err = { code: -1, reason: "", message: "" }
    this.connect(url || "wss://127.0.0.1:13579/")
  }

  // ===========================================================================
  // HELPERS
  // ===========================================================================

  private connect(url: string): void {
    this.ws = new WebSocket(url)

    this.ws.onopen = (e) => {}

    this.ws.onclose = (e) => {
      this.err = e.wasClean
        ? { code: -1, reason: "", message: "" }
        : { code: e.code, reason: e.reason, message: "connection failed" }
    }

    this.ws.onmessage = (e) => {
      if (e.data === "--heartbeat--") {
        return
      }

      this.callback(JSON.parse(e.data))
    }
  }

  private send(data: Payload): void {
    this.ws.send(JSON.stringify(data))
  }

  state(): number {
    return this.ws.readyState
  }

  hasError(): boolean {
    return this.err.code != -1 || this.err.message != ""
  }

  lastError(): NCALayerError {
    return this.err
  }

  reconnect(): void {
    this.connect(this.ws.url)
  }

  // ===========================================================================
  // API
  // ===========================================================================

  browseKeyStore(
    storageName: string,
    fileExtension: string,
    currentDirectory: string,
    callback: (data) => {}
  ): void {
    this.callback = callback
    this.send({
      method: MethodName.BrowseKeyStore,
      args: [storageName, fileExtension, currentDirectory],
    })
  }
}

export { NCALayerError }
export default Client
