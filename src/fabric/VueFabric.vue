<template>
  <div>
    <canvas id="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import { fabric } from 'fabric';
import '../libs/customiseControls.js';
import Utils from '../utils';

const dotCircleImg = require('../assets/dot-circle.png');
const rotateMdrImg = require('../assets/rotate-mdr.png');

export default {
  name: 'VueFabric',
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      canvas: null,
      currentObj: null
    };
  },
  created() {

  },
  mounted() {
    this.canvas = new fabric.Canvas('canvas', { preserveObjectStacking: true });
    const canvas = this.canvas;
    fabric.Canvas.prototype.customiseControls({
      tl: {
        action: 'scale'
        // cursor: '../../assets/dot-circle.png',
      },
      tr: {
        action: 'scale'
      },
      bl: {
        action: 'scale',
        cursor: 'pointer'
      },
      br: {
        action: 'scale',
        cursor: 'pointer'
      },
      mb: {
        action: 'scale',
        cursor: 'pointer'
      },
      // mr: {
      //     // action: function(e, target) {
      //     //     target.set({
      //     //         left: 200,
      //     //     });
      //     //     canvas.renderAll();
      //     // },
      //     action: 'scale',
      //     cursor: 'pointer',
      // },
      mt: {
        // action: {
        //   rotateByDegrees: 30
        // },
        action: 'scale',
        cursor: 'pointer'
      },
      // only is hasRotatingPoint is not set to false
      mtr: {
        action: 'rotate'
        // cursor: '../../assets/cow.png',
      }
    });
    this.setCornerIcons({});
    // canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
    canvas.backgroundColor = '#ffffff';
    // canvas.renderAll();
    // this.canvas.push(canvas);
    const that = this;
    this.canvas.controlsAboveOverlay = false;
    this.canvas.skipOffscreen = true;
    // this.drawControls();
    this.canvas.on('selection:created', (options) => {
      that.$emit('selection:created', options);
    });
    this.canvas.on('mouse:down', (options) => {
      that.$emit('mouse:down', options);
    });
    this.canvas.on('mouse:up', (options) => {
      that.$emit('mouse:up', options);
    });
    this.canvas.on('mouse:move', (options) => {
      that.$emit('mouse:move', options);
    });
    this.canvas.on('mouse:dblclick', (options) => {
      that.$emit('mouse:dblclick', options);
    });
    this.canvas.on('mouse:over', (options) => {
      that.$emit('mouse:over', options);
    });
    this.canvas.on('mouse:out', (options) => {
      that.$emit('mouse:out', options);
    });
    this.canvas.on('object:added', (options) => {
      that.$emit('object:added', options);
    });
    this.canvas.on('object:removed', (options) => {
      that.$emit('object:removed', options);
    });
    this.canvas.on('object:modified', (options) => {
      that.$emit('object:modified', options);
    });
    this.canvas.on('object:rotating', (options) => {
      that.$emit('object:rotating', options);
    });
    this.canvas.on('object:scaling', (options) => {
      that.$emit('object:scaling', options);
    });
    this.canvas.on('object:moving', (options) => {
      that.$emit('object:moving', options);
    });
    this.canvas.on('selection:updated', (options) => {
      that.$emit('selection:updated', options);
    });
    this.canvas.on('selection:cleared', (options) => {
      that.$emit('selection:cleared', options);
    });
    this.canvas.on('before:selection:cleared', (options) => {
      that.$emit('before:selection:cleared', options);
    });
  },
  methods: {
    setCornerIcons({
      size = 20, borderColor = '#e4e4e4', cornerBackgroundColor = '#ffffff', cornerShape = 'rect', tl = dotCircleImg, tr = dotCircleImg, bl = dotCircleImg, br = dotCircleImg, ml = dotCircleImg, mr = dotCircleImg, mtr = rotateMdrImg
    }) {
      // basic settings
      const that = this;
      fabric.Object.prototype.customiseCornerIcons(
        {
          settings: {
            borderColor,
            cornerSize: size,
            cornerShape, // 'rect', 'circle'
            cornerBackgroundColor
          },
          tl: {
            icon: tl
          },
          tr: {
            icon: tr
          },
          bl: {
            icon: bl
          },
          br: {
            icon: br
          },
          ml: {
            icon: ml
          },
          mr: {
            icon: mr
          },
          // only is hasRotatingPoint is not set to false
          mtr: {
            icon: mtr
          }
        },
        () => {
          that.canvas.renderAll();
        }
      );
    },
    drawDottedline(options) {
      // eslint-disable-next-line no-param-reassign
      options = Object.assign({
        x: 0, y: 0, x1: 10, y1: 10, color: '#B2B2B2', drawWidth: 2, offset: 6, empty: 3
      }, options);
      const canvasObject = new fabric.Line([options.x, options.y, options.x1, options.y1], {
        ...options,
        strokeDashArray: [options.offset, options.empty],
        stroke: options.color,
        strokeWidth: options.drawWidth
      });
      this.canvas.add(canvasObject);
      this.canvas.renderAll();
    },
    drawArrowLine(options) {
      options = Object.assign({
        x: 0,
        y: 0,
        x1: 0,
        y1: 0,
        color: '#B2B2B2',
        drawWidth: 2,
        fillColor: 'rgba(255,255,255,0)',
        theta: 35,
        headlen: 35
      }, options);
      const canvasObject = new fabric.Path(
        this.drawArrowBase(options.x, options.y, options.x1,
          options.y1, options.theta,
          options.headlen), {
          ...options,
          stroke: options.color,
          fill: options.fillColor,
          strokeWidth: options.drawWidth
        });
      this.canvas.add(canvasObject);
      this.canvas.renderAll();
    },
    drawArrowBase(fromX, fromY, toX, toY, theta, headlen) {
      theta = typeof theta !== 'undefined' ? theta : 30;
      headlen = typeof theta !== 'undefined' ? headlen : 10;
      // 计算各角度和对应的P2,P3坐标
      const angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI;
      const angle1 = ((angle + theta) * Math.PI) / 180;
      const angle2 = ((angle - theta) * Math.PI) / 180;
      const topX = headlen * Math.cos(angle1);
      const topY = headlen * Math.sin(angle1);
      const botX = headlen * Math.cos(angle2);
      const botY = headlen * Math.sin(angle2);
      let arrowX = fromX - topX;
      let arrowY = fromY - topY;
      let path = ` M ${fromX} ${fromY}`;
      path += ` L ${toX} ${toY}`;
      arrowX = toX + topX;
      arrowY = toY + topY;
      path += ` M ${arrowX} ${arrowY}`;
      path += ` L ${toX} ${toY}`;
      arrowX = toX + botX;
      arrowY = toY + botY;
      path += ` L ${arrowX} ${arrowY}`;
      return path;
    },
    freeDrawConfig(isDrawingMode, color = '#B2B2B2', drawWidth = 2) {
      this.canvas.isDrawingMode = isDrawingMode;
      this.canvas.freeDrawingBrush.color = color; // 设置自由绘颜色
      this.canvas.freeDrawingBrush.width = drawWidth;
    },
    removeCurrentObj() {
      const obj = this.canvas.getActiveObject();
      // console.log(obj);
      this.canvas.remove(obj);
      this.canvas.renderAll();
    },
    getEditObj() {
      const obj = this.canvas.getActiveObject();
      this.removeCurrentObj();
      return obj;
    },
    setEditObj(obj) {
      this.canvas.add(obj);
      this.canvas.renderAll();
    },
    setRotate(deg = 36) {
      const obj = this.canvas.getActiveObject();
      const angle = obj.angle;
      obj.rotate(angle + deg);
      this.canvas.renderAll();
    },
    discardActive() {
      this.canvas.discardActiveObject();
      this.canvas.discardActiveGroup();
      this.canvas.renderAll();
    },
    moveTo() {
      const obj = this.canvas.getActiveObject();
      console.log(this.canvas.sendBackwards);
      this.canvas.sendBackwards(obj, true);
      this.canvas.discardActiveObject();
      this.canvas.discardActiveGroup();
    },
    createRect(options) {
      options = Object.assign({
        width: 0, height: 0, fillColor: 'rgba(255, 255, 255, 0)', left: 50, top: 50
      }, options);
      const rect = new fabric.Rect({
        ...options,
        fill: options.fillColor // 填充的颜色
      });
      this.canvas.add(rect);
      this.canvas.renderAll();
    },
    createCircle(options) {
      options = Object.assign({
        left: 0, top: 0, radius: 30, fillColor: 'rgba(255, 255, 255, 0)', color: '#B2B2B2', drawWidth: 2
      }, options);
      const defaultOption = {
        ...options,
        fill: options.fillColor,
        strokeWidth: options.drawWidth,
        stroke: options.color
      };
      const Circle = new fabric.Circle(defaultOption);
      this.canvas.add(Circle);
      this.canvas.renderAll();
    },
    createTriangle(options) {
      options = Object.assign({
        x: 0,
        y: 0,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        left: 100,
        top: 100,
        color: '#B2B2B2',
        drawWidth: 2,
        fillColor: 'rgba(255, 255, 255, 0)',
        id: 'triangle'
      }, options);
      const path = `M ${options.x} ${options.y} L ${options.x1} ${options.y1}
      L ${options.x2} ${options.y2} z`;
      const canvasObject = new fabric.Path(path, {
        ...options,
        stroke: options.color,
        strokeWidth: options.drawWidth,
        fill: options.fillColor
      });
      this.canvas.add(canvasObject);
      this.canvas.renderAll();
    },
    createEqualTriangle(options) {
      options = Object.assign({
        left: 100, top: 100, width: 50, height: 80, fillColor: 'rgba(255, 255, 255, 0)', color: '#B2B2B2', drawWidth: 2
      }, options);
      // console.log(defaultOption);
      const triangle = new fabric.Triangle({
        ...options,
        fill: options.fillColor,
        strokeWidth: options.drawWidth,
        stroke: options.color
      });
      this.setContronVisibility(triangle);
      this.canvas.add(triangle);
      this.canvas.renderAll();
    },
    createLine(options) {
      options = Object.assign({
        x: 0, y: 0, x1: 10, y1: 10, fillColor: 'rgba(255, 255, 255, 0)', strokeColor: '#B0B0B0'
      }, options);
      const line = new fabric.Line([options.x, options.y, options.x1, options.y1], {
        ...options,
        fill: options.fillColor,
        stroke: options.strokeColor
      });
      this.canvas.add(line);
      this.canvas.renderAll();
    },
    createEllipse(options) {
      options = Object.assign({
        rx: 100, ry: 200, fillColor: 'rgba(255, 255, 255, 0)', angle: 90, strokeColor: '#B0B0B0', strokeWidth: 3, left: 50, top: 50
      }, options);
      const ellipse = new fabric.Ellipse({
        ...options,
        fill: options.fillColor,
        stroke: options.strokeColor
      });
      this.canvas.add(ellipse);
      this.canvas.renderAll();
    },
    createText(text, options) {
      options = Object.assign({ left: 100, top: 100 }, options);
      const canvasObj = new fabric.Text(text, { ...options });
      this.canvas.add(canvasObj);
      this.canvas.renderAll();
    },
    createTextbox(text, options) {
      options = Object.assign({
        fontSize: 14, fillColor: '#000000', registeObjectEvent: false, width: 100, left: 100, top: 100
      }, options);
      const canvasObj = new fabric.Textbox(text, {
        ...options,
        fill: options.fillColor
      });
      // console.log(text);
      this.canvas.add(canvasObj);
      if (options.registeObjectEvent) {
        Utils.registeObjectEvent(this, canvasObj);
      }
      this.canvas.renderAll();
    },
    createImage(url, options) {
      const canvas = this.canvas;
      const that = this;
      options = options || {};
      fabric.Image.fromURL(url, (img) => {
        // 添加过滤器
        // img.filters.push(new fabric.Image.filters.Grayscale());
        // 应用过滤器并重新渲染画布执行
        // img.applyFilters(canvas.renderAll.bind(canvas));
        // console.log(img);
        const maxWidth = that.width / 2;
        let width = 0;
        let height = 0;
        if (img.width > img.height) {
          if (img.width > maxWidth) {
            width = maxWidth;
            height = (img.height / img.width) * width;
          } else {
            width = img.width;
            height = img.height;
          }
        } else if (img.height > maxWidth) {
          height = maxWidth;
          width = (img.width / img.height) * height;
        } else {
          width = img.width;
          height = img.height;
        }
        if (options && options.width) {
          width = options.width;
        }
        if (options && options.height) {
          height = options.height;
        }
        let leftP = that.width / 2;
        let topP = that.height / 2;
        if (options && options.left) {
          leftP = options.left;
        }
        if (options && options.top) {
          topP = options.top;
        }
        img.set({
          id: options.id ? options.id : 'image',
          left: leftP,
          top: topP,
          scaleX: width / img.width,
          scaleY: height / img.height,
          originX: 'center',
          originY: 'center',
          cornerStrokeColor: 'blue'
        });

        // const oldOriginX = img.get('originX');
        // const oldOriginY = img.get('originY');
        // const center = img.getCenterPoint();
        img.hasControls = true;
        img.hasBorders = true;
        // img.customiseCornerIcons(
        //   {
        //     settings: {
        //       borderColor: '#b4b4b4',
        //       cornerSize: 20,
        //       cornerBackgroundColor: '#FF0000',
        //       cornerShape: 'circle',
        //       cornerPadding: 0
        //     }
        //     tl: {
        //       icon: dotCircleImg
        //     },
        //     tr: {
        //       icon: dotCircleImg
        //     },
        //     bl: {
        //       icon: dotCircleImg
        //     },
        //     br: {
        //       icon: dotCircleImg
        //     },
        //     mb: {
        //       icon: dotCircleImg
        //     },
        //     mt: {
        //       icon: dotCircleImg
        //     },
        //     mr: {
        //       icon: dotCircleImg
        //     },
        //     mtr: {
        //       icon: dotCircleImg
        //     }
        //   },
        //   function () {
        //     canvas.renderAll();
        //   }
        // );
        // img.setControlsVisibility({
        //   bl: true,
        //   br: true,
        //   mb: false,
        //   ml: true,
        //   mr: true,
        //   mt: false,
        //   mtr: true,
        //   tl: true,
        //   tr: true
        // });
        canvas.add(img); // 把图片添加到画布上
        if (options && options.registeObjectEvent) {
          Utils.registeObjectEvent(that, img);
        }
        canvas.renderAll.bind(canvas);
      });
    },
    toJson() {
      const json = this.canvas.toJSON();
      return json;
    },
    toDataUrl() {
      const canvas = this.canvas;
      const dataURL = canvas.toDataURL({
        format: 'jpeg',
        quality: 1
      });
      return dataURL;
    },
    loadFromJSON(json, cb) {
      const canvas = this.canvas;
      canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), (
        o,
        object
      ) => {
        // `o` = json object
        // `object` = fabric.Object instance
        // ... do some stuff ...
        cb(o);
        object.setControlsVisibility({
          bl: true,
          br: true,
          mb: false,
          ml: true,
          mr: true,
          mt: false,
          mtr: true,
          tl: true,
          tr: true
        });
      });
    },
    clear() {
      this.canvas.clear();
    },
    getObjects() {
      return this.canvas.getObjects();
    },
    renderAll() {
      this.canvas.renderAll(this.canvas);
    },
    renderTop() {
      this.canvas.renderTop();
    },
    setBackgroundColor(color) {
      const canvas = this.canvas;
      this.canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
    },
    setBackgroundImage(
      imgUrl,
      opacity = 1,
      angle = 0,
      left = 0,
      top = 0,
      crossOrigin = null
    ) {
      const canvas = this.canvas;
      canvas.setBackgroundImage(imgUrl, canvas.renderAll.bind(canvas), {
        opacity,
        angle,
        left,
        top,
        originX: 'left',
        originY: 'top',
        crossOrigin
      });
    },
    toSvg() {
      return this.canvas.toSVG();
    },
    drawControls() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.ellipse(100, 100, 50, 75, (45 * Math.PI) / 180, 0, 2 * Math.PI); // 倾斜45°角
      ctx.stroke();
      ctx.setLineDash([5]);
      ctx.moveTo(0, 200);
      ctx.lineTo(200, 0);
      ctx.stroke();
      this.canvas.drawControls(ctx);
      // this.canvas.controlsAboveOverlay=true;
    },
    setContronVisibility(obj) {
      obj.setControlsVisibility({
        bl: true,
        br: true,
        mb: false,
        ml: true,
        mr: true,
        mt: false,
        mtr: true,
        tl: true,
        tr: true
      });
    },
    // 设置mirror
    toggleMirror({ flip = 'X' }) {
      const img = this.canvas.getActiveObject();
      // console.log(img);
      if (img && img.type === 'image') {
        if (flip === 'X') {
          img.toggle('flipX');
        } else {
          img.toggle('flipY');
        }
        this.renderAll();
      }
    },
    // 设置层级
    toNextLayer() {
      const obj = this.canvas.getActiveObject();
      if (!obj) {
        return;
      }
      obj.sendBackwards(true);
      this.renderTop();
      // this.canvas.setActiveObject(obj);
    },
    toBottomLayer() {
      const obj = this.canvas.getActiveObject();
      if (!obj) {
        return;
      }
      obj.sendToBack();
      this.renderTop();
      // this.canvas.setActiveObject(obj);
    },
    toLastLayer() {
      const obj = this.canvas.getActiveObject();
      if (!obj) {
        return;
      }
      obj.bringForward(true);
      this.renderTop();
    },
    toTopLayer() {
      const obj = this.canvas.getActiveObject();
      if (!obj) {
        return;
      }
      obj.bringToFront();
      this.renderTop();
    }
  }
};
</script>

<style lang='lang="less"' scoped>
</style>
