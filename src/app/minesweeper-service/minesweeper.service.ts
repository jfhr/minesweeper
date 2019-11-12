import {Array2D} from './2d-array.service';
import {EventEmitter} from '@angular/core';

export class Cell {
  public isUncovered = false;
  public isBomb = false;
  public isFlagged = false;
  public neighborBombs = 0;
  public value: string;

  public uncover() {
    this.isUncovered = true;
    if (this.isBomb) {
      this.value = '💣';
    } else if (this.neighborBombs > 0) {
      this.value = this.neighborBombs.toString();
    } else {
      this.value = ' ';
    }
  }

  public flag() {
    this.isFlagged = true;
    if (!this.isUncovered) {
      this.value = '🚩';
    }
  }

  public unflag() {
    this.isFlagged = false;
    if (!this.isUncovered) {
      this.value = ' ';
    }
  }

  public makeBomb() {
    this.neighborBombs = NaN;
    this.isBomb = true;
  }
}

export class Minesweeper {
  public cells: Array2D<Cell>;
  public numberOfFlags = 0;
  public stateChange = new EventEmitter();
  private isInitialized = false;

  /**
   * Generate a field of cells.
   * After the user clicked the first cell, call initializeBombs().
   */
  constructor(public options: MinesweeperOptions) {
    this.cells = new Array2D<Cell>(options.sizeX, options.sizeY);
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i] = new Cell();
    }
  }

  // tslint:disable-next-line:variable-name
  private _state: GameState = GameState.InProgress;

  public get state(): GameState {
    return this._state;
  }

  public set state(value: GameState) {
    if (value !== this._state) {
      this._state = value;
      this.stateChange.emit(value);
    }
  }

  /**
   * Initialize the bombs. This should be called after the first cell has been clicked.
   * The algorithm will make sure that the already clicked cell is not a bomb.
   */
  public initializeBombs() {
    // 1 cell has already been clicked, the rest can be made into bombs.
    const cellsThatCanBeBombs: Cell[] = this.cells.filter(x => !(x.isUncovered || x.isBomb));

    if (cellsThatCanBeBombs.length < this.options.numberOfBombs) {
      throw new Error(
        `Tried to create ${this.options.numberOfBombs} bombs, but there are only ${cellsThatCanBeBombs.length} free cells.`);
    }

    const randomValues = new Uint32Array(this.options.numberOfBombs);
    crypto.getRandomValues(randomValues);
    for (const rValue of randomValues) {
      const bombIndex = rValue % cellsThatCanBeBombs.length;
      const cell = cellsThatCanBeBombs.splice(bombIndex, 1)[0];
      cell.makeBomb();
    }

    for (let idx = 0; idx < this.cells.length; idx++) {
      const cell = this.cells[idx];
      if (cell.isBomb) {
        for (const data of this.cells.getNeighbors(idx)) {
          const neighbor = data.content;
          neighbor.neighborBombs++;
        }
      }
    }
  }

  public clickCell(x: number, y: number, cell: Cell) {
    if (cell.isFlagged) {
      return;  // prevent accidentally clicking a flagged cell
    }
    cell.uncover();
    if (!this.isInitialized) {
      this.initializeBombs();
      this.isInitialized = true;
    }
    // uncover cell again in case it has any neighboring bombs which should be displayed
    cell.uncover();
    if (!cell.isBomb && cell.neighborBombs === 0) {
      this.uncoverNeighborCells(x, y);
    }

    // update game state
    if (cell.isBomb) {
      this.state = GameState.Lost;
    } else if (this.areAllSafeCellsUncovered()) {
      this.state = GameState.Won;
    }
  }

  public flagCell(cell: Cell) {
    cell.flag();
    this.numberOfFlags++;
  }

  public unflagCell(cell: Cell) {
    cell.unflag();
    this.numberOfFlags--;
  }

  private uncoverNeighborCells(x: number, y: number) {
    for (const data of this.cells.getNeighbors(x, y)) {
      const neighbor = data.content;
      if (!neighbor.isUncovered) {
        neighbor.uncover();
        if (neighbor.neighborBombs === 0) {
          this.uncoverNeighborCells(data.x, data.y);
        }
      }
    }
  }

  private areAllSafeCellsUncovered() {
    for (const cell of this.cells) {
      if (!cell.isBomb && !cell.isUncovered) {
        return false;
      }
    }
    return true;
  }
}


export class MinesweeperOptions {
  public sizeX: number;
  public sizeY: number;
  public numberOfBombs: number;
}

export enum GameState {
  InProgress,
  Won,
  Lost,
}
