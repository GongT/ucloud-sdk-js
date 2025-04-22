type argsT = { [index: string]: any };

export default class Request {
  readonly data: argsT;

  constructor(
    data: any,
    protected readonly options?: object
  ) {
    this.data = data;
  }

  toObject(): argsT {
    return this.encode(this.data);
  }

  private encode(args: argsT): argsT {
    const result: argsT = {};
    for (const k in args) {
      if (Object.hasOwn(args, k)) {
        const v: any = args[k];
        if (v == null) {
          continue;
        }

        if (Object.prototype.toString.call(v) === '[object Array]') {
          v.forEach((value: any, index: number) => {
            if (value instanceof Object) {
              for (const [key, encodedValue] of Object.entries(
                this.encode(value)
              )) {
                result[`${k}.${index}.${key}`] = encodedValue;
              }
            } else {
              result[`${k}.${index}`] = value;
            }
          });
        } else if (Object.prototype.toString.call(v) === '[object Object]') {
          for (const [key, value] of Object.entries(this.encode(v))) {
            result[`${k}.${key}`] = value;
          }
        } else {
          result[k] = v;
        }
      }
    }
    return result;
  }
}
