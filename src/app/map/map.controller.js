import * as d3 from 'd3';

export default class MapCtrl {
    constructor($scope, stateService) {
        this.maps = [
            'neighborhoods',
            'streets',
            'arteries',
            'freeways'
        ];
        this.width = "1250";
        this.height = "940";
        this.timer;
        this.routes = [undefined];

        $scope.$on('state.selectedRoutes.updated', (e) => {
            this.routes = stateService.getSelectedRoutes();
        });

        // Set svg width & height
        this.svg = d3.select('svg')
            .attr('width', this.width)
            .attr('height', this.height);
        
        this.projection = d3.geoMercator()
                .scale(310000)
                // Center the Map in San Francisco
                .center([-122.433701, 37.767683])
                .translate([this.width / 2, this.height / 2]);

        this.path = d3.geoPath()
                .projection(this.projection);
    }
};

MapCtrl.$inject = ['$scope', 'stateService'];