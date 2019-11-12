import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {MinesweeperComponent} from './minesweeper-component/minesweeper.component';
import {GameUiComponent} from './game-ui-component/game-ui.component';
import {FormsModule} from '@angular/forms';
import {GameOptionsComponent} from './game-options-component/game-options.component';

@NgModule({
  declarations: [
    AppComponent,
    GameUiComponent,
    GameOptionsComponent,
    MinesweeperComponent,
  ],
  entryComponents: [
    GameOptionsComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
