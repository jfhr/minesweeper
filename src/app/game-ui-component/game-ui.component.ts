import {Component} from '@angular/core';
import {Minesweeper, MinesweeperOptions} from '../minesweeper-service/minesweeper.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GameOptionsComponent} from '../game-options-component/game-options.component';

@Component({
  selector: 'app-game-ui',
  templateUrl: './game-ui.component.html',
  styleUrls: ['./game-ui.component.css']
})
export class GameUiComponent {
  public game: Minesweeper;
  public options = new MinesweeperOptions();
  public showGame = false;

  constructor(private modalService: NgbModal) {
    this.openOptionsModal();
  }

  public openOptionsModal() {
    const modalRef = this.modalService.open(GameOptionsComponent);
    if (this.game !== undefined) {
      modalRef.componentInstance.gameState = this.game.state;
    }
    modalRef.componentInstance.options = this.options;
    modalRef.componentInstance.initialize();
    modalRef.componentInstance.submit.subscribe(options => {
      this.submitGame();
    });
  }

  public submitGame() {
    this.game = new Minesweeper(this.options);
    this.game.stateChange.subscribe(() => {
      this.openOptionsModal();
    });
    this.modalService.dismissAll();
    this.showGame = true;
  }
}
