import angular from 'angular';
import map from './map/map.directive';
import MapCtrl from './map/map.controller';
import control from './control/control.directive';
import ControlCtrl from './control/control.controller';
import mapLayer from './mapLayer/map.layer.directive';
import MapLayerCtrl from './mapLayer/map.layer.controller';
import vehicle from './vehicle/vehicle.directive';
import VehicleCtrl from './vehicle/vehicle.controller';
import MapService from './map/map.service';
import StateService from './state.service';
import VehicleService from './vehicle/vehicle.service';

import '../style/app.css';

const MODULE_NAME = 'app';

let app = angular.module(MODULE_NAME, [])
    .directive('map', map)
    .directive('control', control)
    .directive('vehicle', vehicle)
    .directive('mapLayer', mapLayer)
    .controller('MapCtrl', MapCtrl)
    .controller('MapLayerCtrl', MapLayerCtrl)
    .controller('ControlCtrl', ControlCtrl)
    .controller('VehicleCtrl', VehicleCtrl)
    .service('mapService', MapService)
    .service('vehicleService', VehicleService)
    .service('stateService', StateService);

export default app;