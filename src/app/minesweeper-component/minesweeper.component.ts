import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Cell, GameState, Minesweeper, MinesweeperOptions} from '../minesweeper-service/minesweeper.service';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['/minesweeper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinesweeperComponent {
  public readonly options: MinesweeperOptions;
  @Input() public game: Minesweeper;

  constructor(private ref: ChangeDetectorRef) {
    this.ref.markForCheck();
  }

  public clickCell(x: number, y: number, cell: Cell) {
    if (this.game.state === GameState.InProgress) {
      this.game.clickCell(x, y, cell);
      this.ref.markForCheck();
      this.reactToGameState();
    }
  }

  public rightClickCell(x: number, y: number, cell: Cell) {
    if (this.game.state === GameState.InProgress) {
      if (cell.isFlagged) {
        this.game.unflagCell(cell);
      } else {
        this.game.flagCell(cell);
      }
    }
    // prevent context menu
    return false;
  }

  public unvoverAll() {
    for (const cell of this.game.cells) {
      cell.uncover();
    }
    this.ref.markForCheck();
  }

  private reactToGameState() {
    if (this.game.state === GameState.Won) {
      this.wonGame();
    } else if (this.game.state === GameState.Lost) {
      this.lostGame();
    }
  }

  private wonGame() {
    this.unvoverAll();
  }

  private lostGame() {
    this.unvoverAll();
  }
}
