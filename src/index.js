import PandaBridge from 'pandasuite-bridge';

let properties = null;

const factory = {
  top: 1,
  middle: 1,
  bottom: 1,
};

PandaBridge.init(() => {
  PandaBridge.onLoad((pandaData) => {
    properties = pandaData.properties;
  });

  PandaBridge.onUpdate((pandaData) => {
    properties = pandaData.properties;
  });

  /* Actions */

  PandaBridge.listen('validate', () => {
    PandaBridge.send('validated', [{
      top: factory.top,
      middle: factory.middle,
      bottom: factory.bottom,
    }]);
  });

  PandaBridge.synchronize('synchroTop', (percent) => {
    const localPercent = ((properties.maxTop - 1) * percent) / 100;

    factory.top = Math.floor(localPercent) + 1;
  });

  PandaBridge.synchronize('synchroMiddle', (percent) => {
    const localPercent = ((properties.maxMiddle - 1) * percent) / 100;

    factory.middle = Math.floor(localPercent) + 1;
  });

  PandaBridge.synchronize('synchroBottom', (percent) => {
    const localPercent = ((properties.maxBottom - 1) * percent) / 100;

    factory.bottom = Math.floor(localPercent) + 1;
  });
});
