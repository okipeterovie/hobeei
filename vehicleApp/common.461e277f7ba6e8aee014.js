(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{qfIS:function(e,r,t){"use strict";t.d(r,"a",function(){return u});var n=function(e){return e[e.Off=0]="Off",e[e.Error=1]="Error",e[e.Warning=2]="Warning",e[e.Info=3]="Info",e[e.Debug=4]="Debug",e}({});let o=(()=>{class e{constructor(e){this.source=e}static enableProductionMode(){e.level=n.Warning}debug(...e){this.log(console.log,n.Debug,e)}info(...e){this.log(console.info,n.Info,e)}warn(...e){this.log(console.warn,n.Warning,e)}error(...e){this.log(console.error,n.Error,e)}log(r,t,n){if(t<=e.level){const o=this.source?["["+this.source+"]"].concat(n):n;r.apply(console,o),e.outputs.forEach(e=>e.apply(e,[this.source,t,...n]))}}}return e.level=n.Debug,e.outputs=[],e})();var i=t("fXoL"),c=t("tyNb"),s=t("bk6/");const a=new o("AuthenticationGuard");let u=(()=>{class e{constructor(e,r){this.router=e,this.credentialsService=r}canActivate(e,r){const t=this.credentialsService.credentials;if(this.credentialsService.isAuthenticated()){let r=!1;return e.data.privileges.forEach(e=>{(null==t?void 0:t.privileges.includes(e))&&(r=!0)}),r}return a.debug("Not authenticated, redirecting and adding redirect url..."),this.router.navigate(["/login"],{queryParams:{redirect:r.url},replaceUrl:!0}),!1}}return e.\u0275fac=function(r){return new(r||e)(i.Ub(c.b),i.Ub(s.a))},e.\u0275prov=i.Eb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);