let mapLayer = () => {
  return {
    controller: 'MapLayerCtrl',
    controllerAs: 'mapLayer',
    scope: {
      path: '=',
      mapName: '@'
    }
  }
};

export default mapLayer;