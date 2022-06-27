import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticlesComponent } from './particles/particles.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ParticlesComponent, AuthLayoutComponent],
  imports: [CommonModule, RouterModule],
  exports: [AuthLayoutComponent],
})
export class LayoutsModule {}
