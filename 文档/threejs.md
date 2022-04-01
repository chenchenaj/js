## 场景Scene

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



## 摄像机Camera

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



## 渲染器Renderer

- 初始化渲染器
- 设置渲染大小
- 设置渲染设备像素比
- 设置背景色.....
- 将渲染元素添加到dom中

```js
initRenderer(渲染元素) {
  this.renderer = new THREE.WebGLRenderer();
  // 设置渲染器的初始颜色(如果在场景中设置了背景色这里就不需要设置背景色)
  // this.renderer.setClearColor(new THREE.Color("skyblue"));
  // 设置输出canvas画面的大小
  this.renderer.setSize(渲染元素.offsetWidth, 渲染元素.offsetHeight);
  this.renderer.setPixelRatio(window.devicePixelRatio)
  渲染元素.appendChild(this.renderer.domElement);
},
```



## 轨道控制器OrbitControls

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
  // 能够将相机向内移动多少
  this.controls.minDistance = 1;
  // 能够将相机向外移动多少
  this.controls.maxDistance = 100;
},
```



## 燈光Light

环境光AmbientLight

平行光DirectionalLight

半球光HemisphereLight

点光PointLight

平面光RectAreaLight

聚光灯SpotLight

- 创建灯光
- 设置灯光投射位置
- 设置是否开启阴影投射
- 将灯光添加到场景中

> 如果物体使用的纹理是MeshBasicMaterial材质，则不需要光源透射就能直接显示；其他材质的物体需要光源透射才能显示

```js
// 以聚光灯为例
const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 30, 30, -20 );
//需要开启阴影投射（这个开启需要场景跟地面也开启阴影才有效果）
spotLight.castShadow = true;
// 将灯光加到场景中
scene.add(spotLight)
```



燈光助手LightHelper



## 射线

光线投射，用于计算鼠标与物体的焦点

```js
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();// 鼠标在画布中的坐标
pointer.x = (e.clientX / ele.clientWidth) * 2 - 1; // e：鼠标事件；ele：画布元素
pointer.y = -(e.clientY / ele.clientHeight) * 2 + 1;
//通过鼠标点的位置和当前相机的矩阵计算出raycaster
raycaster.setFromCamera(pointer, this.camera);
// 计算物体与射线的焦点
const intersects = raycaster.intersectObjects(需要计算的物体数组)
console.log('intersects', intersects)
```



## 纹理

### 平铺画布

```js
// 初始化地面
const planeSize = 20
const planeGeometry = new THREE.PlaneGeometry( 80, 50 );
const planeTexture = new THREE.TextureLoader().load('https://threejs.org/manual/examples/resources/images/checker.png')
// THREE.RepeatWrapping 纹理重复
planeTexture.wrapS = THREE.RepeatWrapping
planeTexture.wrapT = THREE.RepeatWrapping
// 当一个纹素覆盖大于一个像素时，贴图将如何采样。 THREE.NearestFilter，它将使用最接近的纹素的值。
planeTexture.magFilter = THREE.NearestFilter
const repeats = planeSize / 2
// 重复次数
planeTexture.repeat.set(repeats, repeats)
const planeMaterial = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, map: planeTexture} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
```



## 阴影透射

- 渲染器开启阴影渲染
- 灯光开启投射阴影
- 几何体(地面等)接受投射
- 物体开启阴影贴图

```js
// 设置渲染物体阴影
this.renderer.shadowMap.enabled = true

// 投射阴影
light.castShadow = true 

// 允许接收阴影
plane.receiveShadow = true;

// 对象是否渲染到阴影贴图中
cube.castShadow = true
```



## 性能检测Stats

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



## 图形用户界面GUI

![image-20220331140731062](https://gitee.com/yx102/pic/raw/master/img/202203311407126.png)

- 显示滑块需设置滑块值域
- 显示单选框设置visible
- 显示颜色使用addColor添加
- 显示复选框使用options添加列表可选项

```js
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
initGui(){
  const gui = new GUI()
  const stars = this.scene.children
  const params = {
    showSun: true,
    color : 0x00ff00,//颜色
    showMoon: true,
    size: 2,
    state: 'sphere',
    states: ['sphere', 'cube']
  }
  gui.add(params, 'showSun').name("显示太阳").onChange(e => { //这是一个单选框，因为params.visible是一个布尔值，e返回所选布尔值
    stars[0].visible  = e
  })
  gui.addColor(params, "color").onChange(e => { //点击颜色面板，e为返回的10进制颜色
		console.log('color', e)
  });
  gui.add(params, "size", 0.1, 30).onChange(e => { //该滑块的值域是[0.1,30],e为返回的滑块值
		console.log('size', e)
  });
  gui.add(params, "state").options(params.states).onChange( e => { //这是一个下拉列表，state是默认值，列表项通过options设置，params.states为列表数组，e返回所选的列表项。
    console.log('state', e)
  })
}
```





## 辅助对象

### 网格GirdHelper

```js
const size = 10; // size -- 坐标格尺寸
const divisions = 10; // divisions -- 坐标格细分次数

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );
```

### 坐标轴AxesHelper

```js
// 添加全局坐标位置
const axes = new THREE.AxesHelper()
scene.add(axes)
```

### 相机助手CameraHelper

```js
const cameraHelper = new THREE.CameraHelper(this.camera)
this.scene.add(cameraHelper)
```

### 平面辅助PlaneHelper

```js
const plane = new THREE.Plane( new THREE.Vector3( 1, 1, 0.2 ), 3 );
const helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
scene.add( helper );
```

### 点光助手PointLightHelper

```js
const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );
```

### 聚光灯助手SpotLightHelper

```js
const spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );
```



## 雾Fog

```js
initFog(){
  const color = 'lightblue'
  const density = 0.02 // 雾的浓度，物体看不见时适当减少值；物体很明显时可适当增大值
  this.scene.fog = new THREE.FogExp2(color, density)
},
```



## 文字Font

```js
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
      const textMaterial = new THREE.MeshStandardMaterial({
        color: 'yellow',
      });

      const text = new THREE.Mesh(textGeometry, textMaterial);

      // text.translateY(90);
      // text.translateX(-45);
      this.scene.add(text);
    }
  );
},
```



## 模型加载

![image-20220401151925548](https://gitee.com/yx102/pic/raw/master/img/202204011519630.png)

### MTL和OBJ模型加载

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



## GLTF模型加载

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
  });
},
```

