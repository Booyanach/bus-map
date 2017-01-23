describe('control:', () => {
    let element, stateService, $scope, $rootScope;

    beforeEach(angular.mock.module("app"));

    beforeEach(() => {
        angular.mock.inject((_$compile_, _$rootScope_, _stateService_) => {
            $scope = _$rootScope_.$new();
            stateService = _stateService_;
            $rootScope = _$rootScope_;
            element = angular.element('<control></control>');

            _$compile_(element)($scope);

            $scope.$digest();
        });
    });

    describe('template', () => {
        it('should contain initial values and then render buttons', () => {
            expect(element[0].querySelectorAll('div.loader').length).toBe(1);
            $scope.control.routeList = $scope.control.showAll.concat([{
                tag: 'foo',
                title: 'Foo?',
                color: 'FF0000'
            }, {
                tag: 'bar',
                title: 'Bar?',
                color: '00FF00'
            }]);

            $scope.$digest();

            expect(element[0].querySelectorAll('div.loader').length).toBe(0);

            let buttons = element[0].querySelectorAll('div.btn');
            expect(buttons.length).toBe(3);

            let btnArray = [].map.call(buttons, btn => btn.textContent.trim());
            expect(btnArray).toEqual($scope.control.routeList.map(route => route.title));
        });

        it('should set the selected class upon click', () => {
            $scope.control.routeList = $scope.control.showAll.concat([{
                tag: 'foo',
                title: 'Foo?',
                color: 'FF0000'
            }, {
                tag: 'bar',
                title: 'Bar?',
                color: '00FF00'
            }]);

            $scope.$digest();
            let fooButton = element[0].querySelectorAll('div.btn')[1];

            // simulate click event
            var evObj = document.createEvent('Events');
            evObj.initEvent('onclick', true, false);
            fooButton.dispatchEvent(evObj);

            expect(fooButton.className.indexOf('selected') > -1).toBe(false);

            spyOn($scope.control, 'checkSelected').and.returnValue(true);

            $scope.$digest();

            expect(fooButton.className.indexOf('selected') > -1).toBe(true);
        });
    })
});