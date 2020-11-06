# NCALayerJS

A small wrapper around [NCALayer](https://pki.gov.kz/en/ncalayer-2/) websocket API.

## Installation

```sh
npm install @seithq/ncalayer
```

or

```sh
yarn add @seithq/ncalayer
```

## Usage

```javascript
import Client from "@seithq/ncalayer"

// Initialize websocket connection with running NCALayer.
let ws = new WebSocket("wss://127.0.0.1:13579/")

// Handle onopen, onerror and onclose events as you want.
ws.onopen = (e) => {
  // your code goes here
}

ws.onerror = (e) => {
  // your code goes here
}

ws.onclose = (e) => {
  // your code goes here
}

// Initialize client to work with API.
const client = new Client(ws)

// Call API method.
client.browseKeyStore("PKCS12", "P12", "", (data) => {
  // on success
  if (data.isOk()) {
    // some action
  }

  // on failure
  console.error(data)
})
```

> NOTE: You have to pass `WebSocket` for `Client` constructor without modifying its `onmessage` event listener. Under the hood `Client` instance listen for `onmessage` and performs its internal callback inside it.

## API

List of types and methods.

## Method

List of values `Method` can take.

- `none`
- `browseKeyStore`
- `showFileChooser`
- `getKeys`
- `setLocale`
- `getNotBefore`
- `getNotAfter`
- `getSubjectDN`
- `getIssuerDN`
- `getRdnByOid`
- `signPlainData`
- `verifyPlainData`
- `createCMSSignature`
- `verifyCMSSignature`
- `createCMSSignatureFromFile`
- `verifyCMSSignatureFromFile`
- `signXml`
- `verifyXml`
- `signXmlByElementId`
- `verifyXmlByElementId`
- `getHash`

## Payload

JSON payload to be sent to NCALayer.

| Property | Type                | Description                 |
| -------- | ------------------- | --------------------------- |
| `method` | [`Method`](#method) | Method name to be invoked   |
| `args`   | `any[]`             | Arguments related to method |

## Response

JSON payload returned by NCALayer.

| Method                     | Return Type | Description                                                                  |
| -------------------------- | ----------- | ---------------------------------------------------------------------------- |
| getResult                  | `string`    | Result field returned by NCALayer                                            |
| getResultObject            | `any`       | Result field returned by NCALayer without concrete type                      |
| getSecondResult            | `string`    | Second result field returned by NCALayer                                     |
| getErrorCode               | `string`    | Error code field returned by NCALayer                                        |
| isOk                       | `boolean`   | True of error code is equal to `NONE`                                        |
| isPasswordAttemptsError    | `boolean`   | True of error code is equal to `WRONG_PASSWORD` and result contains attempts |
| isPasswordError            | `boolean`   | True of error code is equal to `WRONG_PASSWORD`                              |
| isKeyTypeError             | `boolean`   | True of error code is equal to `EMPTY_KEY_LIST`                              |
| isRdnNotFoundError         | `boolean`   | True of error code is equal to `RDN_NOT_FOUND`                               |
| isXmlParseError            | `boolean`   | True of error code is equal to `XML_PARSE_EXCEPTION`                         |
| isSignatureValidationError | `boolean`   | True of error code is equal to `SIGNATURE_VALIDATION_ERROR`                  |
| isCommonError              | `boolean`   | True of error code is equal to `COMMON`                                      |
| isKeyStoreError            | `boolean`   | True of error code is equal to `LOAD_KEYSTORE_ERROR`                         |
| isUnknownStorageError      | `boolean`   | True of error code is equal to `UNKNOWN_STORAGE`                             |
| isFileReadError            | `boolean`   | True of error code is equal to `FILE_READ_ERROR`                             |

## Callback

Is an alias to function `(resp: Response) => void`.

## ClientError

Raised if pinging version of NCALayer returns error or nothing.

- `err` - Error message by itself.

## Client

### Public properties

| Property | Type                | Description                 |
| -------- | ------------------- | --------------------------- |
| method   | [`Method`](#method) | Last method has been called |
| version  | `string`            | Current NCALayer version    |

### Public methods

| Method     | Input type            | Return type                   | Description                              |
| ---------- | --------------------- | ----------------------------- | ---------------------------------------- |
| readyState |                       | `number`                      | Returns `WebSocket`'s readyState         |
| close      |                       | `void`                        | Closes `WebSocket` connection            |
| hasError   |                       | `boolean`                     | Checks whether `Client` has error or not |
| getError   |                       | [`ClientError`](#clienterror) | Returns `Client` error                   |
| send       | [`Payload`](#payload) | `void`                        | Sends `Payload` to NCALayer              |

### browseKeyStore

| Argument         | Type                    | Description                                                                                                          |
| ---------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| storageName      | `string`                | Storage name. Available values: `PKCS12`, `AKKaztokenStore`, `AKKZIDCardStore`, `AKEToken72KStore`, `AKJaCartaStore` |
| fileExtension    | `string`                | File extension. Usually: `P12`                                                                                       |
| currentDirectory | `string`                | Directory to browse. By default it's home directory                                                                  |
| callback         | [`Callback`](#callback) | Callback function to be performed on API response                                                                    |

### showFileChooser

| Argument         | Type                    | Description                                         |
| ---------------- | ----------------------- | --------------------------------------------------- |
| fileExtension    | `string`                | File extension. Usually: `ALL`                      |
| currentDirectory | `string`                | Directory to browse. By default it's home directory |
| callback         | [`Callback`](#callback) | Callback function to be performed on API response   |

### getKeys

| Argument    | Type                    | Description                                                                                                          |
| ----------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| storageName | `string`                | Storage name. Available values: `PKCS12`, `AKKaztokenStore`, `AKKZIDCardStore`, `AKEToken72KStore`, `AKJaCartaStore` |
| storagePath | `string`                | Path to key container. Usually result of [`browseKeyStore`](#browsekeystore)                                         |
| password    | `string`                | Key container password                                                                                               |
| type        | `string`                | Key type. Available values: `AUTH`, `SIGN`, `ALL`                                                                    |
| callback    | [`Callback`](#callback) | Callback function to be performed on API response                                                                    |

### setLocale

| Argument | Type                    | Description                                       |
| -------- | ----------------------- | ------------------------------------------------- |
| lang     | `string`                | Language code. Available values: `kk`, `ru`, `en` |
| callback | [`Callback`](#callback) | Callback function to be performed on API response |

### getNotBefore

| Argument    | Type                    | Description                                                                                                                   |
| ----------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| storageName | `string`                | Storage name. Available values: `PKCS12`, `AKKaztokenStore`, `AKKZIDCardStore`, `AKEToken72KStore`, `AKJaCartaStore`          |
| storagePath | `string`                | Path to key container. Usually result of [`browseKeyStore`](#browsekeystore)                                                  |
| keyAlias    | `string`                | Key alias extracted from key. See helper [`extractKeyAlias`](https://github.com/seithq/ncalayerjs/blob/master/src/helpers.ts) |
| password    | `string`                | Key container password                                                                                                        |
| callback    | [`Callback`](#callback) | Callback function to be performed on API response                                                                             |

### getNotAfter

| Argument    | Type                    | Description                                                                                                                   |
| ----------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| storageName | `string`                | Storage name. Available values: `PKCS12`, `AKKaztokenStore`, `AKKZIDCardStore`, `AKEToken72KStore`, `AKJaCartaStore`          |
| storagePath | `string`                | Path to key container. Usually result of [`browseKeyStore`](#browsekeystore)                                                  |
| keyAlias    | `string`                | Key alias extracted from key. See helper [`extractKeyAlias`](https://github.com/seithq/ncalayerjs/blob/master/src/helpers.ts) |
| password    | `string`                | Key container password                                                                                                        |
| callback    | [`Callback`](#callback) | Callback function to be performed on API response                                                                             |

### getSubjectDN

| Argument    | Type                    | Description                                                                                                                   |
| ----------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| storageName | `string`                | Storage name. Available values: `PKCS12`, `AKKaztokenStore`, `AKKZIDCardStore`, `AKEToken72KStore`, `AKJaCartaStore`          |
| storagePath | `string`                | Path to key container. Usually result of [`browseKeyStore`](#browsekeystore)                                                  |
| keyAlias    | `string`                | Key alias extracted from key. See helper [`extractKeyAlias`](https://github.com/seithq/ncalayerjs/blob/master/src/helpers.ts) |
| password    | `string`                | Key container password                                                                                                        |
| callback    | [`Callback`](#callback) | Callback function to be performed on API response                                                                             |

### getIssuerDN

| Argument    | Type                    | Description                                                                                                                   |
| ----------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| storageName | `string`                | Storage name. Available values: `PKCS12`, `AKKaztokenStore`, `AKKZIDCardStore`, `AKEToken72KStore`, `AKJaCartaStore`          |
| storagePath | `string`                | Path to key container. Usually result of [`browseKeyStore`](#browsekeystore)                                                  |
| keyAlias    | `string`                | Key alias extracted from key. See helper [`extractKeyAlias`](https://github.com/seithq/ncalayerjs/blob/master/src/helpers.ts) |
| password    | `string`                | Key container password                                                                                                        |
| callback    | [`Callback`](#callback) | Callback function to be performed on API response                                                                             |

### getRdnByOid

| Argument    | Type                    | Description                                                                                                                   |
| ----------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| storageName | `string`                | Storage name. Available values: `PKCS12`, `AKKaztokenStore`, `AKKZIDCardStore`, `AKEToken72KStore`, `AKJaCartaStore`          |
| storagePath | `string`                | Path to key container. Usually result of [`browseKeyStore`](#browsekeystore)                                                  |
| keyAlias    | `string`                | Key alias extracted from key. See helper [`extractKeyAlias`](https://github.com/seithq/ncalayerjs/blob/master/src/helpers.ts) |
| password    | `string`                | Key container password                                                                                                        |
| oid         | `string`                | OID code                                                                                                                      |
| oidIndex    | `number`                | OID index. Put `0`                                                                                                            |
| callback    | [`Callback`](#callback) | Callback function to be performed on API response                                                                             |

### signPlainData

| Argument    | Type                    | Description                                                                                                                   |
| ----------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| storageName | `string`                | Storage name. Available values: `PKCS12`, `AKKaztokenStore`, `AKKZIDCardStore`, `AKEToken72KStore`, `AKJaCartaStore`          |
| storagePath | `string`                | Path to key container. Usually result of [`browseKeyStore`](#browsekeystore)                                                  |
| keyAlias    | `string`                | Key alias extracted from key. See helper [`extractKeyAlias`](https://github.com/seithq/ncalayerjs/blob/master/src/helpers.ts) |
| password    | `string`                | Key container password                                                                                                        |
| toSign      | `string`                | Plain data to be signed                                                                                                       |
| callback    | [`Callback`](#callback) | Callback function to be performed on API response                                                                             |

### verifyPlainData

| Argument    | Type                    | Description                                                                                                                   |
| ----------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| storageName | `string`                | Storage name. Available values: `PKCS12`, `AKKaztokenStore`, `AKKZIDCardStore`, `AKEToken72KStore`, `AKJaCartaStore`          |
| storagePath | `string`                | Path to key container. Usually result of [`browseKeyStore`](#browsekeystore)                                                  |
| keyAlias    | `string`                | Key alias extracted from key. See helper [`extractKeyAlias`](https://github.com/seithq/ncalayerjs/blob/master/src/helpers.ts) |
| password    | `string`                | Key container password                                                                                                        |
| toVerify    | `string`                | Original plain data                                                                                                           |
| signature   | `string`                | Signature to be validated                                                                                                     |
| callback    | [`Callback`](#callback) | Callback function to be performed on API response                                                                             |

### createCMSSignature

| Argument    | Type                    | Description                                                                                                                   |
| ----------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| storageName | `string`                | Storage name. Available values: `PKCS12`, `AKKaztokenStore`, `AKKZIDCardStore`, `AKEToken72KStore`, `AKJaCartaStore`          |
| storagePath | `string`                | Path to key container. Usually result of [`browseKeyStore`](#browsekeystore)                                                  |
| keyAlias    | `string`                | Key alias extracted from key. See helper [`extractKeyAlias`](https://github.com/seithq/ncalayerjs/blob/master/src/helpers.ts) |
| password    | `string`                | Key container password                                                                                                        |
| toSign      | `string`                | Plain data to be signed                                                                                                       |
| attached    | `boolean`               | Attach data into signature or not                                                                                             |
| callback    | [`Callback`](#callback) | Callback function to be performed on API response                                                                             |

### verifyCMSSignature

| Argument  | Type                    | Description                                       |
| --------- | ----------------------- | ------------------------------------------------- |
| toVerify  | `string`                | Original plain data                               |
| signature | `string`                | Signature to be validated                         |
| callback  | [`Callback`](#callback) | Callback function to be performed on API response |

### createCMSSignatureFromFile

| Argument    | Type                    | Description                                                                                                                   |
| ----------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| storageName | `string`                | Storage name. Available values: `PKCS12`, `AKKaztokenStore`, `AKKZIDCardStore`, `AKEToken72KStore`, `AKJaCartaStore`          |
| storagePath | `string`                | Path to key container. Usually result of [`browseKeyStore`](#browsekeystore)                                                  |
| keyAlias    | `string`                | Key alias extracted from key. See helper [`extractKeyAlias`](https://github.com/seithq/ncalayerjs/blob/master/src/helpers.ts) |
| password    | `string`                | Key container password                                                                                                        |
| filePath    | `string`                | File path of content to be signed                                                                                             |
| attached    | `boolean`               | Attach data into signature or not                                                                                             |
| callback    | [`Callback`](#callback) | Callback function to be performed on API response                                                                             |

### verifyCMSSignatureFromFile

| Argument  | Type                    | Description                                       |
| --------- | ----------------------- | ------------------------------------------------- |
| filePath  | `string`                | Original file content                             |
| signature | `string`                | Signature to be validated                         |
| callback  | [`Callback`](#callback) | Callback function to be performed on API response |

### signXml

| Argument    | Type                    | Description                                                                                                                   |
| ----------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| storageName | `string`                | Storage name. Available values: `PKCS12`, `AKKaztokenStore`, `AKKZIDCardStore`, `AKEToken72KStore`, `AKJaCartaStore`          |
| storagePath | `string`                | Path to key container. Usually result of [`browseKeyStore`](#browsekeystore)                                                  |
| keyAlias    | `string`                | Key alias extracted from key. See helper [`extractKeyAlias`](https://github.com/seithq/ncalayerjs/blob/master/src/helpers.ts) |
| password    | `string`                | Key container password                                                                                                        |
| toSign      | `string`                | Raw xml to be signed                                                                                                          |
| callback    | [`Callback`](#callback) | Callback function to be performed on API response                                                                             |

### verifyXml

| Argument  | Type                    | Description                                       |
| --------- | ----------------------- | ------------------------------------------------- |
| signature | `string`                | Raw signed xml to be validated                    |
| callback  | [`Callback`](#callback) | Callback function to be performed on API response |

### signXmlByElementId

| Argument          | Type                    | Description                                                                                                                   |
| ----------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| storageName       | `string`                | Storage name. Available values: `PKCS12`, `AKKaztokenStore`, `AKKZIDCardStore`, `AKEToken72KStore`, `AKJaCartaStore`          |
| storagePath       | `string`                | Path to key container. Usually result of [`browseKeyStore`](#browsekeystore)                                                  |
| keyAlias          | `string`                | Key alias extracted from key. See helper [`extractKeyAlias`](https://github.com/seithq/ncalayerjs/blob/master/src/helpers.ts) |
| password          | `string`                | Key container password                                                                                                        |
| toSign            | `string`                | Raw xml                                                                                                                       |
| elementName       | `string`                | Element name to be signed                                                                                                     |
| idAttrName        | `string`                | Element attribute                                                                                                             |
| parentElementName | `string`                | Element parent node                                                                                                           |
| callback          | [`Callback`](#callback) | Callback function to be performed on API response                                                                             |

### verifyXmlByElementId

| Argument          | Type                    | Description                                       |
| ----------------- | ----------------------- | ------------------------------------------------- |
| signature         | `string`                | Raw signed xml to be validated                    |
| idAttrName        | `string`                | Element attribute                                 |
| parentElementName | `string`                | Element parent node                               |
| callback          | [`Callback`](#callback) | Callback function to be performed on API response |

### getHash

| Argument  | Type                    | Description                                                            |
| --------- | ----------------------- | ---------------------------------------------------------------------- |
| input     | `string`                | Plain data to be hashed                                                |
| digestAlg | `string`                | Digest algorithm name. Available values: `SHA1`, `SHA256`, `GOST34311` |
| callback  | [`Callback`](#callback) | Callback function to be performed on API response                      |

## Demos

- [React](https://github.com/seithq/ncalayer-react)
- [Stimulus](https://github.com/seithq/ncalayer-stimulus)

## Maintainers

[@danikarik](https://github.com/danikarik)

## License

This project is licensed under the [MIT License](LICENSE).
