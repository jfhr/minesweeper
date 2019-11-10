import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GameState, MinesweeperOptions} from '../minesweeper-service/minesweeper.service';

interface DefaultGameMode {
  key: string;
  options: MinesweeperOptions;
}

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.css']
})
export class GameOptionsComponent {
  public defaultGameModes: DefaultGameMode[] = [
    {key: 'Beginner', options: {sizeX: 8, sizeY: 8, numberOfBombs: 10}},
    {key: 'Intermediate', options: {sizeX: 16, sizeY: 16, numberOfBombs: 40}},
    {key: 'Expert', options: {sizeX: 16, sizeY: 32, numberOfBombs: 99}},
  ];
  @Input() public options: MinesweeperOptions;
  @Input() public gameState: GameState;
  @Output() public submitGame = new EventEmitter();

  public isGameWon = false;
  public isGameLost = false;
  public isNewGame = false;
  public isNewCustomGame = false;

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

  public selectGameMode(gameMode: DefaultGameMode) {
    this.options.sizeX = gameMode.options.sizeX;
    this.options.sizeY = gameMode.options.sizeY;
    this.options.numberOfBombs = gameMode.options.numberOfBombs;
    this.submitOptions();
  }

  public enableCustomGame() {
    if (this.isNewGame) {
      this.isNewCustomGame = true;
    }
  }

  public submitOptions() {
    this.submitGame.emit(this.options);
    return false;
  }
}
