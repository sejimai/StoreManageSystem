import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.scss'],
})
export class ParticlesComponent implements AfterViewInit, OnDestroy {
  number = 120;
  linkDistance = 120;
  linkWidth = 1;
  moveSpeed = 8;
  size = 3;
  repulseDistance = 140;
  repulseDuration = 0.4;
  canvasHeight = 0;
  canvasWidth = 0;
  interaction = {
    status: 'mouseleave',
    pos_x: 0,
    pos_y: 0,
  };
  canvas: HTMLCanvasElement = new HTMLCanvasElement();
  context: CanvasRenderingContext2D = new CanvasRenderingContext2D();
  particlesList: SingleParticle[] = [];
  animating = true;
  private destroy$: Subject<void> = new Subject<void>();

  @ViewChild('particles', { static: true })
  particlesCanvas!: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    this.canvas = this.particlesCanvas.nativeElement;
    let ct = this.canvas.getContext('2d');
    if (ct) {
      this.context = ct;
    }
    this.setCanvasSize();
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.number; i = i + 1) {
      this.particlesList.push(this.createParticle());
    }
    this.render();
  }

  ngOnDestroy() {
    this.animating = false;
    this.destroy$.next();
    this.destroy$.complete();
  }

  setCanvasSize() {
    this.canvasHeight = this.canvas.offsetHeight;
    this.canvasWidth = this.canvas.offsetWidth;
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
  }

  createParticle(): SingleParticle {
    let lx = Math.random() * this.canvasWidth;
    let ly = Math.random() * this.canvasHeight;
    const lvx = Math.random() - 0.5;
    const lvy = Math.random() - 0.5;

    if (lx > this.canvasWidth - this.size * 2) {
      lx = lx - this.size;
    } else if (lx < this.size * 2) {
      lx = lx + this.size;
    }
    if (ly > this.canvasHeight - this.size * 2) {
      ly = ly - this.size;
    } else if (ly < this.size * 2) {
      ly = ly + this.size;
    }

    return {
      x: lx,
      y: ly,
      vx: lvx,
      vy: lvy,
    };
  }

  draw(p: SingleParticle) {
    this.context.fillStyle = 'rgba(255,255,255, 0.6)';
    this.context.beginPath();
    this.context.arc(p.x, p.y, this.size, 0, Math.PI * 2, false);
    this.context.closePath();
    this.context.fill();
  }

  particlesDraw() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.update();
    for (let i = 0, l = this.particlesList.length; i < l; i = i + 1) {
      this.draw(this.particlesList[i]);
    }
  }

  update() {
    let p: SingleParticle = {
      vx: 0,
      vy: 0,
      x: 0,
      y: 0,
    };
    let p2: SingleParticle = {
      vx: 0,
      vy: 0,
      x: 0,
      y: 0,
    };
    let ms = 0;

    for (let i = 0, l = this.particlesList.length; i < l; i = i + 1) {
      p = this.particlesList[i];
      ms = this.moveSpeed / 2;
      p.x += p.vx * ms;
      p.y += p.vy * ms;

      if (p.x - this.size > this.canvasWidth) {
        p.x = -this.size;
        p.y = Math.random() * this.canvasHeight;
      } else if (p.x + this.size < 0) {
        p.x = this.canvasWidth + this.size;
        p.y = Math.random() * this.canvasHeight;
      }
      if (p.y - this.size > this.canvasHeight) {
        p.y = -this.size;
        p.x = Math.random() * this.canvasWidth;
      } else if (p.y + this.size < 0) {
        p.y = this.canvasHeight + this.size;
        p.x = Math.random() * this.canvasWidth;
      }
      if (this.interaction.status === 'mousemove') {
        this.repulse(p);
      }
      for (let j = i + 1; j < l; j = j + 1) {
        p2 = this.particlesList[j];
        this.linkParticles(p, p2);
      }
    }
  }

  repulse(p: SingleParticle) {
    const dxMouse = p.x - this.interaction.pos_x;
    const dyMouse = p.y - this.interaction.pos_y;
    const distMouse = Math.sqrt(Math.pow(dxMouse, 2) + Math.pow(dyMouse, 2));
    const velocity = 100;
    const repulseFactor = Math.min(
      Math.max(
        (1 / this.repulseDistance) *
          (-1 * Math.pow(distMouse / this.repulseDistance, 2) + 1) *
          this.repulseDistance *
          velocity,
        0
      ),
      50
    );
    p.x = p.x + (dxMouse / distMouse) * repulseFactor;
    p.y = p.y + (dyMouse / distMouse) * repulseFactor;
  }

  linkParticles(p1: SingleParticle, p2: SingleParticle) {
    const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    if (dist <= this.linkDistance) {
      if (0.7 - dist / (1 / 0.7) / this.linkDistance > 0) {
        this.context.strokeStyle = 'rgba(255, 255,255, .16)';
        this.context.lineWidth = this.linkWidth;
        this.context.beginPath();
        this.context.moveTo(p1.x, p1.y);
        this.context.lineTo(p2.x, p2.y);
        this.context.stroke();
        this.context.closePath();
      }
    }
  }

  render() {
    this.particlesDraw();
    if (this.animating) {
      window.requestAnimationFrame((callback) => {
        return this.render();
      });
    }
  }
}

interface SingleParticle {
  vx: number;
  vy: number;
  x: number;
  y: number;
}
