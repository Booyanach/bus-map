import * as d3 from 'd3';
import MapLayerCtrl from './map.layer.controller';

describe('MapLayerCtrl:', () => {
    let ctrl, $scope, element, mapService, $rootScope, drawFn;

    beforeEach(angular.mock.module("app"));

    beforeEach(() => {
        angular.mock.inject((_$controller_, _$rootScope_, _mapService_) => {
            $scope = _$rootScope_.$new();
            mapService = _mapService_;
            $rootScope = _$rootScope_;

            drawFn = spyOn(MapLayerCtrl.prototype, 'draw');

            element = angular.element('<map-layer></map-layer>');
            ctrl = _$controller_('MapLayerCtrl', {
                $scope: $scope,
                $element: element,
                mapService: mapService,
            });
        });
    });
    it('should contain initial values and call draw', () => {
        expect(ctrl.element).not.toBe(undefined);
        expect(drawFn).toHaveBeenCalled();
    });
    describe('draw:', () => {
        beforeEach(() => {
            spyOn(mapService, 'retrieve').and.callFake((name, callback) => {
                callback({name: name, features: []});
            });
            spyOn(d3.selection.prototype, 'selectAll').and.callThrough();
            ctrl.$scope.mapName = 'foo';
        })
        it('retrieves data for a specific mapName passed in from parent', () => {
            drawFn.and.callThrough();
            ctrl.draw();
            expect(mapService.retrieve).toHaveBeenCalledWith('foo', jasmine.any(Function));
            expect(d3.selection.prototype.selectAll).toHaveBeenCalledWith('path');
        });
    });
});