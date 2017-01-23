import * as d3 from 'd3';
import VehicleCtrl from './vehicle.controller';

describe('VehicleCtrl:', () => {
    let ctrl, $scope, element, stateService, vehicleService, $rootScope, drawFn;

    beforeEach(angular.mock.module("app"));

    beforeEach(() => {
        angular.mock.inject((_$controller_, _$rootScope_, _stateService_, _vehicleService_) => {
            $scope = _$rootScope_.$new();
            stateService = _stateService_;
            vehicleService = _vehicleService_;
            $rootScope = _$rootScope_;

            drawFn = spyOn(VehicleCtrl.prototype, 'draw');

            element = angular.element('<vehicle></vehicle>');
            ctrl = _$controller_('VehicleCtrl', {
                $scope: $scope,
                $element: element,
                stateService: stateService,
                vehicleService: vehicleService
            });
        });
    });

    it('should contain initial values', () => {
        expect(ctrl.plottedVehicles).toEqual([]);
        expect(ctrl.element).not.toBe(undefined);
        expect(ctrl.tooltip).not.toBe(undefined);
    });

    describe('functionality:', () => {
        let data = {vehicle: [{foo: 'bar'}]};
        it('upon receiving a vehicle.service.updated event, stores the new data and draws vehicles',
            () => {
                spyOn(ctrl, 'drawVehicles');
                $rootScope.$broadcast('vehicle.service.updated', data, 'foo');
                expect(ctrl.plottedVehicles).toEqual(data.vehicle);
                expect(ctrl.drawVehicles).toHaveBeenCalledWith(
                    ctrl.$scope.projection, data.vehicle, 'foo'
                );
            }
        );
    })
    describe('draw:', () => {
        beforeEach(() => {
            drawFn.and.callThrough();
            spyOn(d3, 'timer');
            spyOn(vehicleService, 'retrieve');
        })
        it('does initial call for an undefined route', () => {
            ctrl.draw([]);
            expect(vehicleService.retrieve).toHaveBeenCalledWith(undefined);
            expect(ctrl.timer).toBe(undefined);
            expect(d3.timer).toHaveBeenCalledWith(jasmine.any(Function), 15000);
        });
        it('fetches data for each route received', () => {
            ctrl.draw(['foo', 'bar']);

            expect(vehicleService.retrieve.calls.count()).toBe(2);
            expect(vehicleService.retrieve.calls.argsFor(0)).toEqual(['foo']);
            expect(vehicleService.retrieve.calls.argsFor(1)).toEqual(['bar']);

            expect(ctrl.timer).toBe(undefined);
            expect(d3.timer).toHaveBeenCalledWith(jasmine.any(Function), 15000);
        });
    });
    describe('clear:', () => {
        it('does initial call for an undefined route', () => {
            ctrl.plottedVehicles =[{tag: 'foo'}];
            expect(ctrl.plottedVehicles.length).toBe(1);
            ctrl.clear();
            expect(ctrl.plottedVehicles.length).toBe(0);
        });
    });
    describe('drawVehicles', () => {
        it('draws Vehicles', () => {
            let projectionCb = jasmine.createSpy('projection').and.returnValue([1, 1]);
            let data = [
                {lon: 1, lat: 2, speedKmHr: 3}, {lon: 3, lat: 4, speedKmHr: 5}
            ];
            let route = {title: 'foo', color: 'F00'};
            ctrl.drawVehicles(projectionCb, data, route);

            expect(projectionCb.calls.count()).toBe(4);
            expect(projectionCb.calls.argsFor(0)).toEqual([[1, 2]]);
            expect(projectionCb.calls.argsFor(1)).toEqual([[3, 4]]);
            expect(projectionCb.calls.argsFor(2)).toEqual([[1, 2]]);
            expect(projectionCb.calls.argsFor(3)).toEqual([[3, 4]]);
        });
    });
});