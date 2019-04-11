class Utils {
  // eslint-disable-next-line class-methods-use-this
  registeObjectEvent(me, obj) {
    console.log('registeObjectEvent');
    obj.on('mousedown', (options) => {
      me.$emit('object:mousedown', obj, options);
    });
    obj.on('mouseup', (options) => {
      me.$emit('object:mouseup', obj, options);
    });
    obj.on('mousemove', (options) => {
      me.$emit('object:mousemove', obj, options);
    });
    obj.on('mouseover', (options) => {
      me.$emit('object:mouseover', obj, options);
    });
    obj.on('mouseout', (options) => {
      me.$emit('object:mouseout', obj, options);
    });
    obj.on('mousedblclick', (options) => {
      me.$emit('object:mousedblclick', obj, options);
    });
    obj.on('mousewheel', (options) => {
      me.$emit('object:mousewheel', obj, options);
    });
  }
}
const utils = new Utils();
export default utils;
