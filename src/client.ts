export type Callback = (data: any) => void

export default class Client {
  private cb: Callback
  private ws: WebSocket

  constructor(ws: WebSocket) {
    this.cb = (data) => {
      if (data.result?.version) console.log("version: " + data.result.version)
    }

    this.ws = ws
    this.ws.onmessage = (e) => {
      const data = JSON.parse(e.data)
      if (data) {
        this.cb(data)
      } else {
        console.log("could not parse message data")
      }
    }
  }

  close() {
    this.ws.close()
  }

  send(data: any) {
    this.ws.send(JSON.stringify(data))
  }

  browseKeyStore(
    storageName: string,
    fileExtension: string,
    currentDirectory: string,
    callback: Callback
  ) {
    this.cb = callback
    this.send({
      method: "browseKeyStore",
      args: [storageName, fileExtension, currentDirectory],
    })
  }
}
