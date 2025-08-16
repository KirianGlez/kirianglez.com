import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { PeraThree } from "./components/pera-three/pera-three";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, PeraThree],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('kirianglezcom');
}
