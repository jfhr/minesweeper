import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GameState, MinesweeperOptions} from '../minesweeper-service/minesweeper.service';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.css']
})
export class GameOptionsComponent {
  @Input() public options: MinesweeperOptions;
  @Input() public gameState: GameState;
  @Output() public submit = new EventEmitter();

  public isGameWon = false;
  public isGameLost = false;
  public isNewGame = false;

  public initialize() {
    if (this.gameState === GameState.Lost) {
      this.isGameLost = true;
    } else if (this.gameState === GameState.Won) {
      this.isGameWon = true;
    } else {
      this.newGame();
    }
  }

  public newGame() {
    this.isGameWon = false;
    this.isGameLost = false;
    if (this.options === undefined) {
      this.options = new MinesweeperOptions();
    }
    this.isNewGame = true;
  }

  public submitOptions() {
    this.submit.emit(this.options);
    return false;
  }
}
