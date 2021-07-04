export class PromiseUtil {
  static handle(promise: Promise<any>): Promise<any> {
    return promise.then(data => [data, undefined]).catch(error => Promise.resolve([undefined, error.error]));
  }
}
