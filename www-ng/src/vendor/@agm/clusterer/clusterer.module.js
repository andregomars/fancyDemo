import { NgModule } from '@angular/core';
import { AgmCoreModule } from '../core';
import { AgmMarkerCluster } from './directives/cluster';
import { ClusterManager } from './services/managers/cluster-manager';
var AgmClustererModule = (function () {
    function AgmClustererModule() {
    }
    return AgmClustererModule;
}());
export { AgmClustererModule };
AgmClustererModule.decorators = [
    { type: NgModule, args: [{
                imports: [AgmCoreModule],
                declarations: [AgmMarkerCluster],
                exports: [AgmMarkerCluster, AgmCoreModule],
                providers: [ClusterManager],
            },] },
];
/** @nocollapse */
AgmClustererModule.ctorParameters = function () { return []; };
//# sourceMappingURL=clusterer.module.js.map