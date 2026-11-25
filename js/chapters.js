/*
 * 章节数据
 * 当前为旧版（2012 人教版）29 章目录，待用户确认是否切换 2024 新版 34 章（差异见 README「版本差异」）。
 * 新增一课后，把对应章节的 ready 改为 true 即可在首页显示「已上线」。
 * 文件路径规则：models/<grade>/<slug>.html
 */
window.CHAPTER_DATA = [
  {
    id: "7a", name: "七年级上册", term: "七上", accent: "#2f6fed",
    chapters: [
      { no: 1, title: "有理数", slug: "01-rational-numbers", tag: "代数", desc: "正负数、数轴、相反数与绝对值", ready: true },
      { no: 2, title: "整式的加减", slug: "02-integral-expressions", tag: "代数", desc: "单项式、多项式与合并同类项", ready: false },
      { no: 3, title: "一元一次方程", slug: "03-linear-equation", tag: "代数", desc: "等式性质、移项与实际问题", ready: false },
      { no: 4, title: "几何图形初步", slug: "04-geometry-intro", tag: "几何", desc: "立体图形、线段与角的度量", ready: false }
    ]
  },
  {
    id: "7b", name: "七年级下册", term: "七下", accent: "#16a394",
    chapters: [
      { no: 5, title: "相交线与平行线", slug: "05-intersecting-parallel", tag: "几何", desc: "对顶角、垂线与平行线的判定", ready: false },
      { no: 6, title: "实数", slug: "06-real-numbers", tag: "代数", desc: "平方根、立方根与无理数", ready: false },
      { no: 7, title: "平面直角坐标系", slug: "07-coordinates", tag: "函数", desc: "用有序数对描述位置与平移", ready: false },
      { no: 8, title: "二元一次方程组", slug: "08-linear-systems", tag: "代数", desc: "代入法、加减法与应用题", ready: false },
      { no: 9, title: "不等式与不等式组", slug: "09-inequalities", tag: "代数", desc: "解集在数轴上的表示", ready: false },
      { no: 10, title: "数据的收集、整理与描述", slug: "10-data-collection", tag: "统计", desc: "抽样调查与频数分布直方图", ready: false }
    ]
  },
  {
    id: "8a", name: "八年级上册", term: "八上", accent: "#7c5cd6",
    chapters: [
      { no: 11, title: "三角形", slug: "11-triangles", tag: "几何", desc: "三边关系、内角和与外角", ready: false },
      { no: 12, title: "全等三角形", slug: "12-congruent-triangles", tag: "几何", desc: "SSS、SAS、ASA、AAS、HL 判定", ready: false },
      { no: 13, title: "轴对称", slug: "13-axial-symmetry", tag: "几何", desc: "对称点、等腰三角形与最短路径", ready: false },
      { no: 14, title: "整式的乘法与因式分解", slug: "14-polynomial-factorization", tag: "代数", desc: "幂的运算、乘法公式与提公因式", ready: false },
      { no: 15, title: "分式", slug: "15-algebraic-fractions", tag: "代数", desc: "分式的运算与分式方程", ready: false }
    ]
  },
  {
    id: "8b", name: "八年级下册", term: "八下", accent: "#e0762d",
    chapters: [
      { no: 16, title: "二次根式", slug: "16-radicals", tag: "代数", desc: "二次根式的化简与运算", ready: false },
      { no: 17, title: "勾股定理", slug: "17-pythagorean", tag: "几何", desc: "直角三角形三边关系与逆定理", ready: false },
      { no: 18, title: "平行四边形", slug: "18-parallelograms", tag: "几何", desc: "性质、判定与中位线", ready: false },
      { no: 19, title: "一次函数", slug: "19-linear-function", tag: "函数", desc: "y=kx+b 的图像与性质", ready: false },
      { no: 20, title: "数据的分析", slug: "20-data-analysis", tag: "统计", desc: "平均数、中位数、众数与方差", ready: false }
    ]
  },
  {
    id: "9a", name: "九年级上册", term: "九上", accent: "#d6455d",
    chapters: [
      { no: 21, title: "一元二次方程", slug: "21-quadratic-equation", tag: "代数", desc: "配方、公式法与根的判别式", ready: false },
      { no: 22, title: "二次函数", slug: "22-quadratic-function", tag: "函数", desc: "抛物线开口、对称轴与最值", ready: false },
      { no: 23, title: "旋转", slug: "23-rotation", tag: "几何", desc: "旋转性质与中心对称", ready: false },
      { no: 24, title: "圆", slug: "24-circle", tag: "几何", desc: "垂径定理、圆周角、切线与扇形", ready: false },
      { no: 25, title: "概率初步", slug: "25-probability", tag: "统计", desc: "列举法与用频率估计概率", ready: false }
    ]
  },
  {
    id: "9b", name: "九年级下册", term: "九下", accent: "#3b8f4f",
    chapters: [
      { no: 26, title: "反比例函数", slug: "26-inverse-function", tag: "函数", desc: "y=k/x 的图像与性质", ready: false },
      { no: 27, title: "相似", slug: "27-similarity", tag: "几何", desc: "相似三角形的判定与性质", ready: false },
      { no: 28, title: "锐角三角函数", slug: "28-trigonometry", tag: "几何", desc: "sin、cos、tan 与解直角三角形", ready: false },
      { no: 29, title: "投影与视图", slug: "29-projection-views", tag: "几何", desc: "三视图与立体图形展开图", ready: false }
    ]
  }
];
