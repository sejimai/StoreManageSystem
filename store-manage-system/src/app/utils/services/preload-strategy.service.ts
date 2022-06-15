import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

/**
 * 自定义预加载策略
 *
 * 路由中配置preload:true的module会执行预加载
 */
@Injectable({
  providedIn: 'root',
})
export class PreloadStrategyService implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      return load();
    }
    return of(null);
  }
}
