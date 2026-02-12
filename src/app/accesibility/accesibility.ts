import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-accesibility',
  imports: [],
  templateUrl: './accesibility.html',
  styleUrl: './accesibility.css',
})
export class Accesibility {
  private fontScale = 1;
  private isBig = false;

  biggerText() {
    if (!this.isBig) {
      this.fontScale += 0.1;
    } else {
      this.fontScale = 1;
    }
    document.documentElement.style.fontSize = `${this.fontScale}rem`;
    this.isBig = !this.isBig;
  }

  private legibleFont = false;

  constructor(private renderer: Renderer2) {}

  changeFont() {
    if (!this.legibleFont) {
      this.renderer.addClass(document.documentElement, 'legible-font');
    } else {
      this.renderer.removeClass(document.documentElement, 'legible-font');
    }

    this.legibleFont = !this.legibleFont;
  }

  private imagesHidden = false;

  hideImages() {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      if (!this.imagesHidden) {
        this.renderer.setStyle(img, 'display', 'none');
      } else {
        this.renderer.removeStyle(img, 'display');
      }
    });

    const elementsWithBg = document.querySelectorAll<HTMLElement>('body *');
    elementsWithBg.forEach((el) => {
      const bg = window.getComputedStyle(el).backgroundImage;
      if (bg && bg !== 'none') {
        if (!this.imagesHidden) {
          el.setAttribute('data-original-bg', bg);
          this.renderer.setStyle(el, 'background-image', 'none');
        } else {
          const originalBg = el.getAttribute('data-original-bg');
          if (originalBg) {
            this.renderer.setStyle(el, 'background-image', originalBg);
          }
        }
      }
    });

    this.imagesHidden = !this.imagesHidden;
  }

  private greyActive = false;

  greyScale() {
    const contentElements = document.querySelectorAll('body *:not(.fab)');

    contentElements.forEach((el) => {
      if (!this.greyActive) {
        this.renderer.setStyle(el, 'filter', 'grayscale(100%)');
      } else {
        this.renderer.removeStyle(el, 'filter');
      }
    });

    this.greyActive = !this.greyActive;
  }

  private linksVisible = false;

  showLinks() {
    const links = document.querySelectorAll('a');
    links.forEach((link) => {
      if (!this.linksVisible) {
        this.renderer.setStyle(link, 'background-color', 'yellow');
        this.renderer.setStyle(link, 'color', 'black');
        this.renderer.setStyle(link, 'text-decoration', 'underline');
        this.renderer.setStyle(link, 'font-weight', 'bold');
      } else {
        this.renderer.removeStyle(link, 'background-color');
        this.renderer.removeStyle(link, 'color');
        this.renderer.removeStyle(link, 'text-decoration');
        this.renderer.removeStyle(link, 'font-weight');
      }
    });

    this.linksVisible = !this.linksVisible;
  }

  private readingMaskActive = false;
  private readingMaskDiv!: HTMLDivElement;

  readingMask() {
    if (!this.readingMaskActive) {
      this.readingMaskDiv = this.renderer.createElement('div');
      this.renderer.setStyle(this.readingMaskDiv, 'position', 'fixed');
      this.renderer.setStyle(this.readingMaskDiv, 'pointer-events', 'none'); // que no bloquee clicks
      this.renderer.setStyle(this.readingMaskDiv, 'width', '100%');
      this.renderer.setStyle(this.readingMaskDiv, 'height', '2em'); // alto de la línea
      this.renderer.setStyle(this.readingMaskDiv, 'background', 'rgba(255,255,0,0.3)'); // color semi-transparente
      this.renderer.setStyle(this.readingMaskDiv, 'z-index', '9999');
      this.renderer.setStyle(this.readingMaskDiv, 'top', '0px');
      this.renderer.setStyle(this.readingMaskDiv, 'left', '0px');

      this.renderer.appendChild(document.body, this.readingMaskDiv);

      window.addEventListener('mousemove', this.moveMask);
    } else {
      if (this.readingMaskDiv) {
        this.renderer.removeChild(document.body, this.readingMaskDiv);
      }
      window.removeEventListener('mousemove', this.moveMask);
    }

    this.readingMaskActive = !this.readingMaskActive;
  }

  moveMask = (event: MouseEvent) => {
    if (this.readingMaskDiv) {
      this.renderer.setStyle(this.readingMaskDiv, 'top', `${event.clientY - 12}px`);
    }
  };
}
