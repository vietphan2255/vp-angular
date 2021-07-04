export class StringUtil {
  constructor() {}

  static toSnakeCase(str: string): string {
    return str.replace(/[\w]([A-Z])/g, m => m[0] + '_' + m[1]).toLowerCase();
  }
  static toCamelCase(str: string): string {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  static toSnakeCaseObject<T extends { [key: string]: any }>(data: T): object {
    const snakeCaseObject = {} as { [key: string]: any };
    Object.keys(data).forEach(key => (snakeCaseObject[this.toSnakeCase(key)] = data[key]));
    return snakeCaseObject;
  }
}
