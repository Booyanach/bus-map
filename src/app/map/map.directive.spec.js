describe('map:', () => {
    let element, stateService, $scope, $rootScope;

    beforeEach(angular.mock.module("app"));

    beforeEach(() => {
        angular.mock.inject((_$compile_, _$rootScope_, _stateService_) => {
            $scope = _$rootScope_.$new();
            stateService = _stateService_;
            $rootScope = _$rootScope_;
            element = angular.element('<map></map>');

            _$compile_(element)($scope);

            $scope.$digest();
        });
    });

    describe('template', () => {
        it('should contain initial values', () => {
            let svg = element.find('svg')[0];
            let mapLayer = [].map.call(svg.querySelectorAll('g[map-layer]'), el => el);

            expect(mapLayer.length).toBe(4);
            expect(
                mapLayer.map(layer => layer.getAttribute('map-name'))
            ).toEqual($scope.map.maps);
            expect(svg.querySelectorAll('g[vehicle]').length).toBe(1);
        });
    })
});