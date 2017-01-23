import * as d3 from 'd3';

export default class VehicleCtrl {
    constructor($scope, $element, stateService, vehicleService) {
        this.$scope = $scope;
        this.stateService = stateService;
        this.vehicleService = vehicleService;

        this.timer;

        this.plottedVehicles = [];

        this.element = d3.select($element[0]);

        this.tooltip = d3.select("div.tooltip").length ?
                        d3.select("div.tooltip") :
                        d3.select("body").append("div");
            
        this.tooltip.attr("class", "tooltip")
            .style("opacity", 0);

        $scope.$watchCollection('routes', this.draw.bind(this));

        $scope.$on('vehicle.service.updated', (e, vehicleData, route) => {
            if (vehicleData.vehicle) {
                this.plottedVehicles = this.plottedVehicles.concat(vehicleData.vehicle);
                this.drawVehicles(this.$scope.projection, this.plottedVehicles, route);
            }
        })
    }

    draw(routes) {
        this.clear();
        // Initial state in case no routes are passed in
        routes = routes.length && routes[0] ? routes : [undefined];

        let self = this;

        routes.forEach(route => {
            self.vehicleService.retrieve(route);
        });
        if (self.timer) {
            self.timer.stop();
        }
        self.timer = d3.timer(() => { self.draw(routes); }, 15000);
    }

    clear() {
        this.plottedVehicles = [];
        this.element.selectAll("text.bus").remove();
    }

    drawVehicles(projection, vehicleData, route) {
        this.element.selectAll("text.bus")
            .data(vehicleData)
            .enter().append('text')
            .attr('class', 'bus')
            .attr('x', d => projection([d.lon, d.lat])[0])
            .attr('y', d => projection([d.lon, d.lat])[1])
            .style('fill', d => route ? route.color : null)
            .text('\uf207')
            .on('mouseover', d => {
                this.tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                this.tooltip.html(
                    `speed: ${d.speedKmHr} Km/h${route ? '</br>route: ' + route.title : ''}`
                )
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 12) + "px")
                    .style("background", d => route ? `#${route.color}` : null);
            })
            .on('mouseout', d => {
                this.tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    }
};

VehicleCtrl.$inject = ['$scope', '$element', 'stateService', 'vehicleService'];