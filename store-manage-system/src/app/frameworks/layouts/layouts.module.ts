import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticlesComponent } from './particles/particles.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

@NgModule({
  declarations: [ParticlesComponent, AuthLayoutComponent],
  imports: [CommonModule],
})
export class LayoutsModule {}
