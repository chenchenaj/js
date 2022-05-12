## 场景 Scene

- 初始化场景

```js
import * as THREE from "three";
initScene() {
  // 初始化场景
  this.scene = new THREE.Scene();
  // 给场景设置背景色(根据具体要求看是否需要设置)
  this.scene.background = new THREE.Color("#cccccc");
}
```

## 摄像机 Camera

[PerspectiveCamera（透视摄像机）或者 OrthographicCamera（正交摄像机）]

- 初始化摄像机
- 设置投影的位置

```js
initCamera(渲染元素) {
  this.camera = new THREE.PerspectiveCamera(45,渲染元素.clientWidth / 渲染元素.clientHeight,0.1,2000);
  this.camera.position.set(x, y, z);
  this.camera.lookAt(0, 0, 0)
},
```

## 渲染器 Renderer

- 初始化渲染器
- 设置渲染大小
- 设置渲染设备像素比
- 设置背景色.....
- 将渲染元素添加到 dom 中
- 抗锯齿`antialias`
- 定义渲染器是否在渲染每一帧之前自动清除其输出`autoClear`

```js
initRenderer(渲染元素) {
  this.renderer = new THREE.WebGLRenderer({antialias: true});
  // 设置渲染器的初始颜色(如果在场景中设置了背景色这里就不需要设置背景色)
  // this.renderer.setClearColor(new THREE.Color("skyblue"));
  // 设置输出canvas画面的大小
  this.renderer.setSize(渲染元素.offsetWidth, 渲染元素.offsetHeight);
  this.renderer.setPixelRatio(window.devicePixelRatio)
  // 开始阴影支持
  this.renderer.shadowMap.enabled = true;
  // 阴影类型
  this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  渲染元素.appendChild(this.renderer.domElement);
},
```

## 点 Point

点材质 PointMaterial

```js
const geometry = new THREE.BoxGeometry(5, 5, 5)
let spriteMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.23,
  sizeAttenuation: true, // 指定点的大小是否因相机深度而衰减（仅限透视摄像头）
  transparent: true, // 透明
  map: generateSprite(), // 纹理
})

let points = new THREE.Points(geometry, spriteMaterial)
```

## 几何体 Geometry

旋转 rotation

位移 position

获取物体的位置 scene.getObjectByName('几何体的 name').position

### 平面 Plane

### 立方体 Cube

### 球体 Sphere

### 边缘几何体 EdgesGeometry

与 LineSegments 结合使用，描绘出几何体的形状

### PointMaterial 点材质

```js
const geometry = new THREE.BoxGeometry(5, 5, 5)
let spriteMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.23,
  transparent: true,
  map: generateSprite(),
})

let points = new THREE.Points(geometry, spriteMaterial)
```

### Line线材质

```js
const material = new THREE.LineBasicMaterial({
  color: 0x0000ff,
})

const points = []
points.push(new THREE.Vector3(-10, 0, 0)) // 线的点位
points.push(new THREE.Vector3(0, 10, 0))

const geometry = new THREE.BufferGeometry().setFromPoints(points)

const line = new THREE.Line(geometry, material)
this.scene.add(line)
```

## 材质 Material

### 混合材质

createMultiMaterialObject 方法

```js
let cubeMaterial = new THREE.MeshDepthMaterial()
let basicMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff * Math.random(),
})
basicMaterial.transparent = true
// 使用叠加混合
basicMaterial.blending = THREE.MultiplyBlending

let cube = new THREE.SceneUtils.createMultiMaterialObject(cubeGeometry, [
  cubeMaterial,
  basicMaterial,
])
this.scene.add(cube)
```

MeshLambertMaterial：非光泽表面的材质，没有镜面高光

MeshPhongMaterial：具有镜面高光的光泽表面的材质

LineDashedMaterial：用于绘制虚线样式几何体的材质

SpriteMaterial：点精灵材质，使用 Sprite 的材质

提示图标一般都是使用这种材质

```js
const map = new THREE.TextureLoader().load('textures/sprite.png')
const material = new THREE.SpriteMaterial({ map: map, color: 0xffffff })

const sprite = new THREE.Sprite(material)
sprite.scale.set(200, 200, 1)
scene.add(sprite)
```

## 动画 Animation

### 动画混合器 AnimationMixer

特定对象的动画的播放器，与 AnimationClip 同时使用

```js
const mixer = new THREE.AnimationMixer(horse) // horse是mesh合并出来的物体
let clip = THREE.AnimationClip.CreateFromMorphTargetSequence(
  'run',
  geometry.morphTargets,
  30
)
let action = mixer.clipAction(clip)
action.setDuration(1).play()
```

### 绕轴旋转

B 绕着 A 旋转

```js
// 配置
const pivotPoint = new THREE.Object3D();
pivotPoint.add(B);
A.add(pivotPoint);

// 渲染
render(){
  A.rotation.y += 0.02
}
```

### 弹跳效果

```js
step += 0.02
// 球体的y坐标 做正弦曲线运动 模拟出弹跳效果
sphere.position.y = -30 + 70 * Math.abs(Math.sin(step))
```

## 控制器

### 拖拽控件 DragControls

```js
// objects: 放置可以拖拽的物体对象
const dragControls = new DragControls(
  objects,
  this.camera,
  this.renderer.domElement
)

// 当用户开始拖拽3D Objects时触发
dragControls.addEventListener('dragstart', (event) => {
  event.object.material.emissive.set(0xaaaaaa)
})

// 用户拖拽3D Objects时触发
dragControls.addEventListener('drag', (event) => {
  console.log('物体拖拽时触发')
})

// 用户开始完成3D Objects时触发
dragControls.addEventListener('dragend', (event) => {
  event.object.material.emissive.set(0x000000)
})

// 当指针移动到一个3D Object或者其某个子级上时触发
dragControls.addEventListener('hoveron', (event) => {
  console.log('指针移到物体上时触发')
})

// 当指针移出一个3D Object时触发
dragControls.addEventListener('hoveroff', (event) => {
  console.log('指针移到物体上时触发')
})
```

### 轨道控制器 OrbitControls

```js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
initControl(element) {
  // OrbitControls(将要被控制的相机,用于事件监听的HTML元素)
  this.controls = new OrbitControls(this.camera, element);
  this.controls.enableDampling = true; //使动画循环使用时阻尼或自转 意思是否有惯性
  this.controls.enableZoom = true; //是否允许缩放
  this.controls.enablePan = true; //是否开启鼠标右键拖拽
  this.controls.autoRotate = false; //是否允许自动旋转
  this.controls.dampingFactor = 0.25; //动态阻尼系数：就是鼠标拖拽旋转灵敏度
  this.controls.maxPolarAngle = 0.45 * Math.PI; // 最大偏移角度
  this.controls.noPan = true; // 进制移动
  this.controls.rotateSpeed = 0.05; // 旋转速度
  this.controls.zoomSpeed = 0.2;// 缩放速度
  this.controls.panSpeed = 0.1;// 平controls
  this.controls.staticMoving = false;// 静止移动，为 true 则没有惯性
  this.controls.dynamicDampingFactor = 0.2;// 阻尼系数 越小 则滑动越大
  // 能够将相机向内移动多少
  this.controls.minDistance = 1;
  // 能够将相机向外移动多少
  this.controls.maxDistance = 100;
},
```

### 第一人称控制器 FirstPersonControls

```js
initControls() {
    /* 第一人称控件 */
    this.controls = new THREE.FirstPersonControls(this.camera);
    /* 属性参数默认 */
    this.controls.enabled = true; // 是否启用控制器
    this.controls.lookSpeed = 0.02; //鼠标移动查看的速度
    this.controls.movementSpeed = 10; //相机移动速度
    this.controls.noFly = false;
    this.controls.constrainVertical = true; //约束垂直
    this.controls.verticalMin = 1.0; // 能够垂直环视角度的下限
    this.controls.verticalMax = 2.0; // 能够垂直环视角度的上限
    this.controls.lon = 0; //进入初始视角x轴的角度
    this.controls.lat = 0; //初始视角进入后y轴的角度

}
```

### 飞行控件 FlyControls

```js
initControls() {
    /* 飞行控件 */
    this.controls = new THREE.FlyControls(camera, renderer.domElement);

    /* 属性参数默认 */
    this.controls.rollSpeed = Math.PI / 24; // 翻滚速度
    this.controls.autoForward = true; //自动向前移动
    this.controls.dragToLook = false; // 若该值设为true，你将只能通过执行拖拽交互来环视四周
    this.controls.movementSpeed = 25; //移动速度
}
```

## 燈光 Light

环境光 AmbientLight

平行光 DirectionalLight

半球光 HemisphereLight

点光 PointLight

平面光 RectAreaLight

半球光 HemisphereLight：光照颜色从天空光线颜色渐变到地面光线颜色

平面光光源 RectAreaLight：平面光光源从一个矩形平面上均匀地发射光线

聚光灯 SpotLight

- 创建灯光
- 设置灯光投射位置
- 设置是否开启阴影投射
- 将灯光添加到场景中

> 如果物体使用的纹理是 MeshBasicMaterial 材质，则不需要光源透射就能直接显示；其他材质的物体需要光源透射才能显示

```js
// 以聚光灯为例
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(30, 30, -20)
//需要开启阴影投射（这个开启需要场景跟地面也开启阴影才有效果）
spotLight.castShadow = true
// 光的强度 默认值为1
spotLight.intensity = 1
// 从发光点发出的距离，光的亮度，会随着距离的远近线性衰减
spotLight.distance = 350
// 光色散角度，默认是 Math.PI * 2
spotLight.angle = 0.4
// 光影的减弱程度，默认值为0， 取值范围 0 -- 1之间
spotLight.penumbra = 0.1
// 光在距离上的量值, 和光的强度类似（衰减指数）
spotLight.decay = 1
// 将灯光加到场景中
scene.add(spotLight)
```

燈光助手 LightHelper

## 射线 Raycaster

### 射线相交

光线投射，用于计算鼠标与物体的焦点

```js
onMouseMove(e){
  e.preventDefault();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();// 鼠标在画布中的坐标
  pointer.x = (e.clientX / ele.clientWidth) * 2 - 1; // e：鼠标事件；ele：画布元素
  pointer.y = -(e.clientY / ele.clientHeight) * 2 + 1;
  //通过鼠标点的位置和当前相机的矩阵计算出raycaster
  raycaster.setFromCamera(pointer, this.camera);
  // 计算物体与射线的焦点
  const intersects = raycaster.intersectObjects(需要计算的物体数组)
  console.log('intersects', intersects)

  // 获取选中最近的 Mesh 对象
  if (intersects.length !== 0 && intersects[0].object instanceof THREE.Mesh) {
      selectObject = intersects[0].object;
      // 做对应的操作
  } else {
      alert("未选中 Mesh!");
  }
}

// 如果要显示对应的名字则可以
renderDiv(object) {
    // 获取窗口的一半高度和宽度
    let halfWidth = window.innerWidth / 2;
    let halfHeight = window.innerHeight / 2;

    // 逆转相机求出二维坐标
    let vector = object.position.clone().project(camera);

    // 修改 div 的位置
    $("#label").css({
        left: vector.x * halfWidth + halfWidth,
        top: -vector.y * halfHeight + halfHeight - object.position.y
    });
    // 显示模型信息
    $("#label").text("name:" + object.name);
}

render() {
  if (selectObject != undefined && selectObject != null) {
      renderDiv(selectObject); // 不断执行更新div的坐标
  }
}
```

## 纹理 Texture

### 平铺画布

```js
// 初始化地面
const planeSize = 20
const planeGeometry = new THREE.PlaneGeometry(80, 50)
const planeTexture = new THREE.TextureLoader().load(
  'https://threejs.org/manual/examples/resources/images/checker.png'
)
// THREE.RepeatWrapping 纹理重复
planeTexture.wrapS = THREE.RepeatWrapping
planeTexture.wrapT = THREE.RepeatWrapping
// 当一个纹素覆盖大于一个像素时，贴图将如何采样。 THREE.NearestFilter，它将使用最接近的纹素的值。
planeTexture.magFilter = THREE.NearestFilter
const repeats = planeSize / 2
// 重复次数
planeTexture.repeat.set(repeats, repeats)
const planeMaterial = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  map: planeTexture,
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
```

## 阴影透射

- 渲染器开启阴影渲染
- 灯光开启投射阴影|设置阴影分辨率
- 几何体(地面等)接受投射
- 物体开启阴影贴图

```js
// 设置渲染物体阴影
this.renderer.shadowMap.enabled = true

// 投射阴影
light.castShadow = true
//设置阴影分辨率
light.shadow.mapSize.width = 2048
light.shadow.mapSize.height = 2048

// 允许接收阴影
plane.receiveShadow = true

// 对象是否渲染到阴影贴图中
cube.castShadow = true
```

## 性能检测 Stats

![image-20220331114220610](https://gitee.com/yx102/pic/raw/master/img/202203311142665.png)

```js
import Stats from 'three/examples/jsm/libs/stats.module.js'
initStats(ele){
  const stats = new Stats()
  // stats.setMode(0); // 0:FPS 1: MS 2:MB
  // stats.domElement.style.position = 'absolute';
  // stats.domElement.left = '0px';
  // stats.domElement.top = '0px';
  ele.appendChild(stats.domElement)
}
```

## 图形用户界面 GUI

![image-20220331140731062](https://gitee.com/yx102/pic/raw/master/img/202203311407126.png)

- 显示滑块需设置滑块值域
- 显示单选框设置 visible
- 显示颜色使用 addColor 添加
- 显示复选框使用 options 添加列表可选项
- 显示按钮设置方法
- 分类 addFolder(改分类)

```js
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
initGui(){
  const gui = new GUI({closed: true, width: 400})
  const stars = this.scene.children
  const params = {
    showSun: true,
    color : 0x00ff00,//颜色
    showMoon: true,
    size: 2,
    state: 'sphere',
    states: ['sphere', 'cube'],
    add: function(){}
  }
  gui.add(params, 'showSun').name("显示太阳").onChange(e => { //这是一个单选框，因为params.visible是一个布尔值，e返回所选布尔值
    stars[0].visible  = e
  })
  gui.addColor(params, "color").onChange(e => { //点击颜色面板，e为返回的10进制颜色
		console.log('color', e, new THREE.Color(e))
  });
  gui.add(params, "size", 0.1, 30).onChange(e => { //该滑块的值域是[0.1,30],e为返回的滑块值
		console.log('size', e)
  });
  gui.add(params, "state").options(params.states).onChange( e => { //这是一个下拉列表，state是默认值，列表项通过options设置，params.states为列表数组，e返回所选的列表项。
    console.log('state', e)
  });
  gui.add(params, "add");
  gui.addFolder('文件夹名称')
}
```

区分开来的写法

```js
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('y轴')
```

## 辅助对象

### 箭头 ArrowHelper

可用在坐标轴上

```js
const dir = new THREE.Vector3(1, 2, 0)

//normalize the direction vector (convert to vector of length 1)
dir.normalize()

const origin = new THREE.Vector3(0, 0, 0)
const length = 1
const hex = 0xffff00

const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex)
scene.add(arrowHelper)
```

### 网格 GirdHelper

```js
const size = 10 // size -- 坐标格尺寸
const divisions = 10 // divisions -- 坐标格细分次数

const gridHelper = new THREE.GridHelper(size, divisions)
scene.add(gridHelper)
```

### 坐标轴 AxesHelper

```js
// 添加全局坐标位置
const axes = new THREE.AxesHelper()
scene.add(axes)
```

### 相机助手 CameraHelper

```js
const cameraHelper = new THREE.CameraHelper(this.camera)
this.scene.add(cameraHelper)
```

### 平面辅助 PlaneHelper

```js
const plane = new THREE.Plane(new THREE.Vector3(1, 1, 0.2), 3)
const helper = new THREE.PlaneHelper(plane, 1, 0xffff00)
scene.add(helper)
```

### 点光助手 PointLightHelper

```js
const sphereSize = 1
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize)
scene.add(pointLightHelper)
```

### 聚光灯助手 SpotLightHelper

```js
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)
```

## 雾 Fog

### Fog 雾

```js
initFog(){
  // 定义线性雾，密度随着距离的增加而线性增长
  this.scene.fog = new THREE.Fog( 0xffffff, 0.015, 100);
}
```

### FogExp2 雾指数

```js
initFog(){
  const color = 'lightblue'
  const density = 0.02 // 雾的浓度，物体看不见时适当减少值；物体很明显时可适当增大值
  this.scene.fog = new THREE.FogExp2(color, density)
},
```

## 文字 Font

### 三维立体

```js
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
initFont() {
  const loader = new FontLoader();
  const font = loader.load(
    // 资源URL
    "https://threejs.org/examples/fonts/gentilis_regular.typeface.json",

    // onLoad回调
    font=> {
      console.log("加载成功回调", font);
      // do something with the font
      const textGeometry = new TextGeometry("Hello three.js!", {
        font: font,
        size: 2,
        height: 1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 0.1, // 斜角与原始文本轮廓之间的延伸距离
        bevelSegments: 2, // 斜角的分段数
      });
      textGeometry.computeBoundingBox();//绑定盒子模型
      const textMaterial = new THREE.MeshStandardMaterial({
        color: 'yellow',
      });

      const text = new THREE.Mesh(textGeometry, textMaterial);

      // 计算出整个模型宽度的一半, 不然模型就会绕着x = 0,中心旋转
      text.position.x = -(textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x) / 2;
      // text.translateY(90);
      // text.translateX(-45);
      this.scene.add(text);
    }
  );
},
```

### 二维字体

```js
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
initContent() {
  const loader = new FontLoader();
  const text = 'threejs'
    loader.load('gentilis_bold.typeface.json', font => {
        // 材质
        var fontMaterial = new THREE.MeshLambertMaterial({
            color: 0x912CEE,
            side: THREE.DoubleSide
        });
        var planeMaterial = new THREE.MeshLambertMaterial({
            color: 0x545454,
            transparent: true,
            opacity: 0.6,
            side: THREE.DoubleSide
        });

        var planeGeometry = new THREE.PlaneGeometry(600, 300);
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.y += 40;
        this.scene.add(plane);

        // 生成二维字体模型
        var shapes = font.generateShapes(text, 100, 1);
        var fontGeometry = new THREE.ShapeGeometry(shapes);

        // 绑定盒子模型
        fontGeometry.computeBoundingBox();
        var font = new THREE.Mesh(fontGeometry, fontMaterial);
        // x = 0,位置
        font.position.x = -0.5 * (fontGeometry.boundingBox.max.x - fontGeometry.boundingBox.min.x);
        font.position.z += 1;
        this.scene.add(font);
    });
},
```

加载器

### FileLoader 加载

```js
let fileLoader = new THREE.FileLoader()

/* 加载JSON */
fileLoader.load('models/json/3.json', function (json) {
  let obj = JSON.parse(json)
  let loader = new THREE.ObjectLoader()
  let object = loader.parse(obj.scene)
  console.log(object.children[0])
})
```

### ObjectLoader 加载

```js
let loader = new THREE.ObjectLoader()
loader.load('models/json/model.json', (obj) => {
  console.log(obj)
})
```

## 模型加载

![image-20220401151925548](https://gitee.com/yx102/pic/raw/master/img/202204011519630.png)

### MTL 和 OBJ 模型加载

mtl 后缀文件用 MTL 模块加载

obj 后缀文件用 OBJ 模块加载

```js
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

initOBJModel(){
  const mtlLoader = new MTLLoader()
  mtlLoader.load('windmill/windmill.mtl', mtl => {
    mtl.preload()

    for (const material of Object.values(mtl.materials)) {
      console.log('material', material)
      // 设置材质双面
      material.side = THREE.DoubleSide
    }

    const objLoader = new OBJLoader()
    objLoader.setMaterials(mtl)

    // 加载模型
    objLoader.load('windmill/windmill.obj', obj => {
      this.scene.add(obj)
    })
  })
}
```

```js
let mtlLoader = new THREE.MTLLoader()
mtlLoader.load('models/obj/city.mtl', (materials) => {
  let objLoader = new THREE.OBJLoader()
  objLoader.setMaterials(materials)

  objLoader.load('models/obj/city.obj', (object) => {
    // 看是否需要给模型设置颜色或做其他操作
    scene.add(object)
  })
})
```

### GLTF 模型加载

```js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

initGLTFModel() {
  const gltf = new GLTFLoader();
  gltf.load("bingdundun.glb", (gltf) => {
    const root = gltf.scene;
    console.log("root", root);

    // 遍历所有子对象
    root.traverse((child) => { // traverse只有在THREE中才有这个函数
      if (child.isMesh) { // 业务代码，根据实际调整
        // 内部
        if (child.name === "oldtiger001") {
          // 金属度
          child.material.metalness = 0.5;
          // 粗糙度
          child.material.roughness = 0.8;
        }
        // 半透明外壳
        if (child.name === "oldtiger002") {
          // 启用透明
          child.material.transparent = true;
          // 透明度
          child.material.opacity = 0.5;
          // 透明反射效果
          child.material.refractionRatio = 1;
          child.material.metalness = 0.2;
          child.material.roughness = 0;
        }
      }
    });
    this.scene.add(root);
  }, xhr => {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  }, error => {
    console.log('load error!')
  });
},
```

### DRACOLoader 加载压缩后的模型

直接使用 gltfLoader 经行加载会加载失败，必须经过 DRACOLoader 经行转换

```js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { LoadingManager } from 'three'

const loader = new GLTFLoader(new LoadingManager()) //实时显示进度
DRACOLoader.setDecoderPath('three.js/examples/js/libs/draco/gltf/') //设置解压库文件路径
const dracoLoader = new DRACOLoader() //
dracoLoader.setDecoderConfig({ type: 'js' }) //使用js方式解压
dracoLoader.preload() //初始化_initDecoder 解码器
loader.setDRACOLoader(dracoLoader) //gltfloader使用dracoLoader

let url = 'models/yalj.glb'
loader.load(
  url,
  ({ scene }) => {
    //处理加载过来的模型
  },
  (xhr) => {
    //处理加载的进度
  },
  (error) => {
    //加载错误时触发
  }
)
```

## threeBSP 布尔运算

```js
// 创建运算后的 mesh
// objects[0]&objects[1]是THREEBSP的内容
// objects[2]是mesh的一种材质
createMesh(type) {
    function funResult(){
        if (scene.getObjectByName('mesh') != null){
            scene.remove(scene.getObjectByName('mesh'));
        }
        var result;
        switch(type){
            // 差集
            case 'subtract': result = this.objects[0].subtract(this.objects[1]);
                break;
            // 并集
            case 'union': result = this.objects[0].union(this.objects[1]);
                break;
            // 交集
            case 'intersect': result = this.objects[0].intersect(this.objects[1]);
                break;
        }

        // 将BSP对象转化为Mesh对象
        const mesh = result.toMesh();

        // 重新为mesh赋值一个纹理材质
        mesh.material = this.objects[2];
        mesh.name = 'mesh';
        this.scene.add(mesh);
    }
    return funResult;
}

// 初始化object
initObject() {
    // 创建几何体
    var cylinderGeometry = new THREE.CylinderGeometry(100,100,20,50,20);
    var boxGeometry = new THREE.BoxGeometry(100,100,100,30,30);

    // 创建材质
    var materials1 = new THREE.MeshLambertMaterial({wireframe:true,color : 0x9AFF9A});
    var materials2 = new THREE.MeshLambertMaterial({wireframe:false,color : 0x9F79EE});

    // 创建Mesh
    var cylinder = new THREE.Mesh(cylinderGeometry,materials1);
    var box = new THREE.Mesh(boxGeometry, materials1);
    this.scene.add(cylinder);
    this.scene.add(box);

    //  将网格模型对象包装成可以进行buer运算的对象(BSP对象)
    const cylinderBSP = new ThreeBSP(cylinder);
    const boxBSP = new ThreeBSP(box);

    // 初始化数据放入数组
    this.objects = [];
    this.objects.push(cylinderBSP);
    this.objects.push(boxBSP);
    this.objects.push(materials2);
}
```

## 窗口缩放 Resize

```js
onWindowResize() {
    // 重新设置相机宽高比例
    this.camera.aspect = window.innerWidth / window.innerHeight;
    // 更新相机投影矩阵
    this.camera.updateProjectionMatrix();
    // 重新设置渲染器渲染范围
    this.renderer.setSize(window.innerWidth, window.innerHeight);
}
```

## demo

### 地图

```js
import * as d3 from "d3";
// 以北京为中心 修改坐标
this.projection = d3.geoMercator().center([116.412318, 39.909843]).translate([0, 0])

initMap(){
  const loader = new THREE.FileLoader()
  loader.load('china.json', (data) => {
    const jsondata = JSON.parse(data)
    console.log('jsondata', jsondata)
    this.operationData(jsondata)
  })
},
// 解析数据
operationData(jsondata) {
  const map = new THREE.Object3D()
  // 全国信息
  const features = jsondata.features

  features.forEach((feature) => {
    // 单个省份 对象
    const province = new THREE.Object3D()
    // 地址
    province.properties = feature.properties.name
    const coordinates = feature.geometry.coordinates
    // const color = 'yellow'
    const color = ['重庆市', '上海市'].includes(feature.properties.name) ? 'blue' : 'yellow'

    if (feature.geometry.type === 'MultiPolygon') {
      // 多个，多边形
      coordinates.forEach((coordinate) => {
        // coordinate 多边形数据
        coordinate.forEach((rows) => {
          const mesh = this.drawExtrudeMesh(rows, color)
          const line = this.lineDraw(rows, color)
          province.add(line)
          province.add(mesh)
        })
      })
    }

    if (feature.geometry.type === 'Polygon') {
      // 多边形
      coordinates.forEach((coordinate) => {
        const mesh = this.drawExtrudeMesh(coordinate, color)
        const line = this.lineDraw(coordinate, color)
        province.add(line)
        province.add(mesh)
      })
    }
    map.add(province)
  })
  this.scene.add(map)
},
/**
 * 立体几何图形
 * @param polygon 多边形 点数组
 * @param color 材质颜色
 * */
drawExtrudeMesh(polygon, color) {
  const shape = new THREE.Shape()
  polygon.forEach((row, i) => {
    const [x, y] = this.projection(row)
    if (i === 0) {
      shape.moveTo(x, -y)
    }
    shape.lineTo(x, -y)
  })

  // 拉伸
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 10,
    bevelEnabled: false
  })
  const material = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.5
  })
  return new THREE.Mesh(geometry, material)
},
/**
 * 边框 图形绘制
 * @param polygon 多边形 点数组
 * @param color 材质颜色
 * */
lineDraw(polygon, color) {
  const lineGeometry = new THREE.BufferGeometry()
  const pointsArray = new Array()
  polygon.forEach((row) => {
    const [x, y] = this.projection(row)
    // 创建三维点
    pointsArray.push(new THREE.Vector3(x, -y, 9))
  })
  // 放入多个点
  lineGeometry.setFromPoints(pointsArray)

  const lineMaterial = new THREE.LineBasicMaterial({
    color: color
  })
  return new THREE.Line(lineGeometry, lineMaterial)
},
```

### 魔方

```js
initContent(){
  let matArray = [];
  matArray.push(new THREE.MeshBasicMaterial({color: 0xFF7F50}));
  matArray.push(new THREE.MeshBasicMaterial({color: 0x9B30FF}));
  matArray.push(new THREE.MeshBasicMaterial({color: 0x9ACD32}));
  matArray.push(new THREE.MeshBasicMaterial({color: 0x63B8FF}));
  matArray.push(new THREE.MeshBasicMaterial({color: 0xc41e3a}));
  matArray.push(new THREE.MeshBasicMaterial({color: 0xffffff}));
  let group = new THREE.Group()

  // 循环创建立方体
  for (let x = 0; x < 3; x++){
      for (let y = 0; y < 3; y++){
          for (let z = 0; z < 3; z++){
              let boxGeometry = new THREE.BoxGeometry(10.8, 10.8, 10.8);
              let box = new THREE.Mesh(boxGeometry, matArray);
              box.position.set(x * 11 - 11, y * 11 - 11, z * 11 - 11);
              group.add(box);
          }
      }
  }
  this.scene.add(group);
}
```

### 还原形状

保存一个未知几何体的 JSON，通过 JSON 还原成几何体

```js
// 保存
const germetry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshNormalMaterial()
const mesh = new THREE.Mesh(geometry, material)
localStorage.setItem('cylinder', JSON.stringify(mesh.toJSON()))

// 解析
// 将 cylinderJson 字符串转换为 json 对象
const loadedGeometry = JSON.parse(cylinderJson)
// 解析 json 对象
const loader = new THREE.ObjectLoader()
const loadedMesh = loader.parse(loadedGeometry)
console.log(loadedMesh)
```
