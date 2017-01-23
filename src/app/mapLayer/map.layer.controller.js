import * as d3 from 'd3';

export default class MapLayerCtrl {
    constructor($scope, $element, mapService) {
        this.$scope = $scope;
        this.mapService = mapService;

        // My reasoning to do this, reduces the amount of watches in the application
        this.element = d3.select($element[0]);

        this.draw();
    }

    draw() {
        this.mapService.retrieve(this.$scope.mapName, map => {
            this.element.selectAll('path')
                .data(map.features)
                .enter().append('path')
                .attr('d', this.$scope.path)
                .attr('class', map.name);
        });
    }
};

MapLayerCtrl.$inject = ['$scope', '$element', 'mapService'];