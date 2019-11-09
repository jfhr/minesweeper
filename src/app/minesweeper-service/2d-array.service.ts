export class Array2D<T> extends Array<T> {
  public readonly sizeX: number;
  public readonly sizeY: number;

  constructor(...args) {
    if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number' && args[0] > 0 && args[1] > 0) {
      super(args[0] * args[1]);
      this.sizeX = args[0];
      this.sizeY = args[1];
    } else {
      super(...args);
      this.sizeX = 1;
      this.sizeY = this.length;
    }
  }

  public coordinates(index: number): { x: number, y: number } {
    return {
      x: Math.floor(index / this.sizeY),
      y: index % this.sizeY,
    };
  }

  public index(x: number, y: number): number {
    return x * this.sizeY + y;
  }

  public get(index: number): T;
  public get(x: number, y: number): T;
  get(x, y?) {
    if (y === undefined) {
      return this[x];
    } else {
      return this[this.index(x, y)];
    }
  }

  public set(value: T, index: number): void;
  public set(value: T, x: number, y: number): void;
  public set(v, x, y?) {
    if (y === undefined) {
      this[x] = v;
    } else {
      this[this.index(x, y)] = v;
    }
  }

  public getNeighbors(index: number): IterableIterator<WithCoordinates<T>>;
  public getNeighbors(x: number, y: number): IterableIterator<WithCoordinates<T>>;
  /* tslint:disable:curly */

  /* tslint:disable:align */
  * getNeighbors(x, y?) {
    if (y === undefined) {
      const coordinates = this.coordinates(x);
      x = coordinates.x;
      y = coordinates.y;
    }

    const at = (_x, _y) => {
      return {x: _x, y: _y, content: this.get(_x, _y)};
    };

    if (x > 0) {
      if (y > 0) {
        yield at(x - 1, y - 1);
      }
      yield at(x - 1, y);
      if (y + 1 < this.sizeY) {
        yield at(x - 1, y + 1);
      }
    }

    if (y > 0) {
      yield at(x, y - 1);
    }
    if (y + 1 < this.sizeY) {
      yield at(x, y + 1);
    }

    if (x + 1 < this.sizeX) {
      if (y > 0) {
        yield at(x + 1, y - 1);
      }
      yield at(x + 1, y);
      if (y + 1 < this.sizeY) {
        yield at(x + 1, y + 1);
      }
    }
  }

  /* tslint:enable:curly */

  /* tslint:enable:align */

  public* iterate2d(): IterableIterator<IterableIterator<WithCoordinates<T>>> {
    for (let x = 0; x < this.sizeX; x++) {
      yield this.iterateRow(x);
    }
  }

  private* iterateRow(x: number): IterableIterator<WithCoordinates<T>> {
    for (let y = 0; y < this.sizeY; y++) {
      yield {x, y, content: this.get(x, y)};
    }
  }
}

interface WithCoordinates<T> {
  x: number;
  y: number;
  content: T;
}
