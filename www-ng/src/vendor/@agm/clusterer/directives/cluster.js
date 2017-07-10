import { Directive, Input } from '@angular/core';
import { ClusterManager } from '../services/managers/cluster-manager';
import { MarkerManager } from '../../core/services/managers/marker-manager';
/**
 * AgmMarkerCluster clusters map marker if they are near together
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .agm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-cluster>
 *        <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        </agm-marker>
 *        <agm-marker [latitude]="lat2" [longitude]="lng2" [label]="'N'">
 *        </agm-marker>
 *      </agm-cluster>
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmMarkerCluster = (function () {
    function AgmMarkerCluster(cluster) {
        this.cluster = cluster;
    }
    /** @internal */
    AgmMarkerCluster.prototype.ngOnDestroy = function () {
        this.cluster.clearMarkers();
    };
    /** @internal */
    AgmMarkerCluster.prototype.ngOnChanges = function (changes) {
        if (changes['gridSize']) {
            this.cluster.setGridSize(this);
        }
        if (changes['maxZoom']) {
            this.cluster.setMaxZoom(this);
        }
        if (changes['styles']) {
            this.cluster.setStyles(this);
        }
        if (changes['zoomOnClick']) {
            this.cluster.setZoomOnClick(this);
        }
        if (changes['averageCenter']) {
            this.cluster.setAverageCenter(this);
        }
        if (changes['minimumClusterSize']) {
            this.cluster.setMinimumClusterSize(this);
        }
        if (changes['styles']) {
            this.cluster.setStyles(this);
        }
        if (changes['imagePath']) {
            this.cluster.setImagePath(this);
        }
        if (changes['imageExtension']) {
            this.cluster.setImageExtension(this);
        }
    };
    /** @internal */
    AgmMarkerCluster.prototype.ngOnInit = function () {
        this.cluster.init({
            gridSize: this.gridSize,
            maxZoom: this.maxZoom,
            zoomOnClick: this.zoomOnClick,
            averageCenter: this.averageCenter,
            minimumClusterSize: this.minimumClusterSize,
            styles: this.styles,
            imagePath: this.imagePath,
            imageExtension: this.imageExtension,
        });
    };
    return AgmMarkerCluster;
}());
export { AgmMarkerCluster };
AgmMarkerCluster.decorators = [
    { type: Directive, args: [{
                selector: 'agm-cluster',
                providers: [ClusterManager, { provide: MarkerManager, useExisting: ClusterManager }]
            },] },
];
/** @nocollapse */
AgmMarkerCluster.ctorParameters = function () { return [
    { type: ClusterManager, },
]; };
AgmMarkerCluster.propDecorators = {
    'gridSize': [{ type: Input },],
    'maxZoom': [{ type: Input },],
    'zoomOnClick': [{ type: Input },],
    'averageCenter': [{ type: Input },],
    'minimumClusterSize': [{ type: Input },],
    'styles': [{ type: Input },],
    'imagePath': [{ type: Input },],
    'imageExtension': [{ type: Input },],
};
//# sourceMappingURL=cluster.js.map