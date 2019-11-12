import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AppModule} from './app.module';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'minesweeper'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('minesweeper');
  });

  it(`should create the game ui`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    let gameUiExists = false;
    for (const childElement of fixture.nativeElement.children) {
      if (childElement.tagName === 'APP-GAME-UI') {
        gameUiExists = true;
      }
    }
    expect(gameUiExists).toBeTruthy();
  });

});
