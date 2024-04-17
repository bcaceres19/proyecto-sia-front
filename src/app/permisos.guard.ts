import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const permisosGuard: CanActivateFn = (route, state) => {
  let idUsuario = sessionStorage.getItem("id");
  const router = inject(Router)
  if(idUsuario !== null){
    return true;
  }
  router.navigateByUrl('');
  return false;
};
