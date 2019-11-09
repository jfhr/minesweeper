import {Array2D} from './2d-array.service';

describe('2D-Array', () => {

  it('Should behave like a standard 1D array', () => {
    const target = new Array2D<number>(4, 5);

    expect(target.sizeX).toEqual(4, 'Should set sizeX');
    expect(target.sizeY).toEqual(5, 'Should set sizeY');
    expect(target.length).toEqual(20, 'Length should be sizeX * sizeY');

    target[0] = 23;
    expect(target[0]).toEqual(23);
  });

  it('Should return an element\'s neighbors correctly', () => {
    const target = new Array2D<number>(4, 5);

    const NEIGHBORS_0_0 = Array.from(target.getNeighbors(0, 0));
    expect(NEIGHBORS_0_0.length).toEqual(3);

    const NEIGHBORS_0_4 = Array.from(target.getNeighbors(0, 4));
    expect(NEIGHBORS_0_4.length).toEqual(3);

    const NEIGHBORS_2_2 = Array.from(target.getNeighbors(2, 2));
    expect(NEIGHBORS_2_2.length).toEqual(8);

    const NEIGHBORS_0 = Array.from(target.getNeighbors(0));
    expect(NEIGHBORS_0.length).toEqual(3);
  });

});
