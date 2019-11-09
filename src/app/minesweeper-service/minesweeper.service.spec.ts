import {Minesweeper} from './minesweeper.service';

describe('Minesweeper Service', () => {

  it('Should create a playing field with the correct size.', () => {
    const target = new Minesweeper({
      sizeX: 4, sizeY: 6, numberOfBombs: 4
    });
    expect(target.cells.length).toEqual(4 * 6);
  });

  it('Should initialize the correct number of bombs', () => {
    const target = new Minesweeper({
      sizeX: 4, sizeY: 6, numberOfBombs: 10
    });
    target.cells[0].uncover();
    target.initializeBombs();
    const bombs = target.cells.filter(c => c.isBomb);
    const notBombs = target.cells.filter(c => !c.isBomb);

    expect(bombs.length).toEqual(10, 'Expected exactly 10 bombs');
    expect(notBombs.length).toEqual(14, 'Expected exactly 14 cells to not be bombs');
  });

  it('Should not make an already clicked cell a bomb', () => {
    const target = new Minesweeper({
      sizeX: 4, sizeY: 6, numberOfBombs: 23
    });
    target.cells[4].uncover();
    // everything is a bomb except the cell we just uncovered
    target.initializeBombs();
    expect(target.cells[4].isUncovered).toBeTruthy('Clicked cell should be uncovered');
    expect(target.cells[4].isBomb).toBeFalsy('Clicked cell should not become a bomb');

    expect(target.cells[3].isBomb).toBeTruthy('Cell should be a bomb');
    expect(target.cells[5].isBomb).toBeTruthy('Cell should be a bomb');
  });

});
