/*
 * 教材目录（2024 新版人教版，按用户提供的逐节目录整理）
 * 册 → 章 → 节（含三级小节、阅读与思考、实验与探究、观察与猜想、
 * 信息技术应用、数学活动/小结/复习题、综合与实践、课题学习）
 *
 * type 取值：sec（正文，默认）/ reading / experiment / inquiry / tech / review / project
 * ready: true 表示该节已有模型，模型路径固定为 models/<册>/<两位章号>/<节 id>.html
 */
window.CURRICULUM = [
  {
    id: "7a", name: "七年级上册", short: "七上",
    chapters: [
      {
        no: 1, title: "有理数",
        sections: [
          { id: "1.1", title: "正数和负数", ready: true },
          { id: "1.1-rd", title: "用正负数表示允许偏差", type: "reading" },
          {
            id: "1.2", title: "有理数及其大小比较",
            children: [
              { id: "1.2.1", title: "有理数的概念", ready: true },
              { id: "1.2.2", title: "数轴", ready: true },
              { id: "1.2.3", title: "相反数", ready: true },
              { id: "1.2.4", title: "绝对值", ready: true },
              { id: "1.2.5", title: "有理数的大小比较", ready: true }
            ]
          },
          { id: "1.2-rd", title: "图说数学史：漫漫长路识负数", type: "reading" },
          { id: "1-rv", title: "小结、复习题1", type: "review" }
        ]
      },
      {
        no: 2, title: "有理数的运算",
        sections: [
          {
            id: "2.1", title: "有理数的加法与减法",
            children: [
              { id: "2.1.1", title: "有理数的加法", ready: true },
              { id: "2.1.2", title: "有理数的减法", ready: true }
            ]
          },
          {
            id: "2.2", title: "有理数的乘法与除法",
            children: [
              { id: "2.2.1", title: "有理数的乘法", ready: true },
              { id: "2.2.2", title: "有理数的除法", ready: true }
            ]
          },
          {
            id: "2.3", title: "有理数的乘方",
            children: [
              { id: "2.3.1", title: "乘方", ready: true },
              { id: "2.3.2", title: "科学记数法", ready: true },
              { id: "2.3.3", title: "近似数", note: "按规划并入 2.3.2《科学记数法》的最后一屏（精确度与有效数字），不单独建模。请从 2.3.2 进入。" }
            ]
          },
          { id: "2-rd", title: "我国古代正负数加减法则", type: "reading" },
          { id: "2-rv", title: "小结、复习题2", type: "review" },
          { id: "2-pj", title: "进位制的认识与探究", type: "project" }
        ]
      },
      {
        no: 3, title: "代数式",
        sections: [
          { id: "3.1", title: "列代数式表示数量关系", ready: true },
          { id: "3-rd", title: "数字1与字母x的对话", type: "reading" },
          { id: "3.2", title: "代数式的值", ready: true },
          { id: "3-rv", title: "小结、复习题3", type: "review" }
        ]
      },
      {
        no: 4, title: "整式的加减",
        sections: [
          {
            id: "4.1", title: "整式",
            children: [
              { id: "4.1.1", title: "单项式" },
              { id: "4.1.2", title: "多项式" }
            ]
          },
          {
            id: "4.2", title: "整式的加法与减法",
            children: [
              { id: "4.2.1", title: "同类项、合并同类项" },
              { id: "4.2.2", title: "去括号" },
              { id: "4.2.3", title: "整式加减运算" }
            ]
          },
          { id: "4-tc", title: "电子表格与数据计算", type: "tech" },
          { id: "4-rv", title: "数学活动、小结、复习题4", type: "review" }
        ]
      },
      {
        no: 5, title: "一元一次方程",
        sections: [
          {
            id: "5.1", title: "方程",
            children: [
              { id: "5.1.1", title: "从算式到方程、一元一次方程" },
              { id: "5.1.2", title: "等式的性质" }
            ]
          },
          {
            id: "5.2", title: "解一元一次方程",
            children: [
              { id: "5.2.1", title: "合并同类项" },
              { id: "5.2.2", title: "移项" },
              { id: "5.2.3", title: "去括号" },
              { id: "5.2.4", title: "去分母" }
            ]
          },
          {
            id: "5.3", title: "实际问题与一元一次方程",
            children: [
              { id: "5.3.1", title: "配套、工程问题" },
              { id: "5.3.2", title: "销售盈亏问题" },
              { id: "5.3.3", title: "行程、方案选择问题" }
            ]
          },
          { id: "5-ex", title: "无限循环小数化分数", type: "experiment" },
          { id: "5-rv", title: "数学活动、小结、复习题5", type: "review" }
        ]
      },
      {
        no: 6, title: "几何图形初步",
        sections: [
          {
            id: "6.1", title: "几何图形",
            children: [
              { id: "6.1.1", title: "立体图形与平面图形、展开图" },
              { id: "6.1.2", title: "点、线、面、体" }
            ]
          },
          { id: "6.1-rd", title: "几何学的起源", type: "reading" },
          {
            id: "6.2", title: "直线、射线、线段",
            children: [
              { id: "6.2.1", title: "直线、射线、线段概念" },
              { id: "6.2.2", title: "线段长短比较、线段和差、中点" }
            ]
          },
          { id: "6.2-rd", title: "长度的测量", type: "reading" },
          {
            id: "6.3", title: "角",
            children: [
              { id: "6.3.1", title: "角的概念、度量、度分秒换算" },
              { id: "6.3.2", title: "角的比较、角平分线" },
              { id: "6.3.3", title: "余角、补角" }
            ]
          },
          { id: "6-rv", title: "数学活动、小结、复习题6", type: "review" },
          { id: "6-pj", title: "设计学校田径运动会比赛场地", type: "project" }
        ]
      }
    ]
  },
  {
    id: "7b", name: "七年级下册", short: "七下",
    chapters: [
      {
        no: 7, title: "相交线与平行线",
        sections: [
          {
            id: "7.1", title: "相交线",
            children: [
              { id: "7.1.1", title: "对顶角、邻补角" },
              { id: "7.1.2", title: "垂线" },
              { id: "7.1.3", title: "同位角、内错角、同旁内角" }
            ]
          },
          {
            id: "7.2", title: "平行线",
            children: [
              { id: "7.2.1", title: "平行线概念、平行公理" },
              { id: "7.2.2", title: "平行线判定" },
              { id: "7.2.3", title: "平行线的性质" }
            ]
          },
          { id: "7.3", title: "定义、命题、定理" },
          { id: "7.4", title: "平移" },
          { id: "7-rd", title: "为什么要证明", type: "reading" },
          { id: "7-rv", title: "数学活动、小结、复习题7", type: "review" }
        ]
      },
      {
        no: 8, title: "实数",
        sections: [
          {
            id: "8.1", title: "平方根",
            children: [
              { id: "8.1.1", title: "算术平方根" },
              { id: "8.1.2", title: "平方根" }
            ]
          },
          { id: "8.2", title: "立方根" },
          {
            id: "8.3", title: "实数",
            children: [
              { id: "8.3.1", title: "实数概念、分类" },
              { id: "8.3.2", title: "实数的性质、实数运算" }
            ]
          },
          { id: "8-rd", title: "√2是无理数的证明", type: "reading" },
          { id: "8-rv", title: "数学活动、小结、复习题8", type: "review" }
        ]
      },
      {
        no: 9, title: "平面直角坐标系",
        sections: [
          {
            id: "9.1", title: "平面直角坐标系",
            children: [
              { id: "9.1.1", title: "有序数对" },
              { id: "9.1.2", title: "平面直角坐标系、点的坐标" }
            ]
          },
          {
            id: "9.2", title: "坐标方法的简单应用",
            children: [
              { id: "9.2.1", title: "用坐标表示地理位置" },
              { id: "9.2.2", title: "用坐标表示平移" }
            ]
          },
          { id: "9-rv", title: "数学活动、小结、复习题9", type: "review" }
        ]
      },
      {
        no: 10, title: "二元一次方程组",
        sections: [
          { id: "10.1", title: "二元一次方程组" },
          {
            id: "10.2", title: "消元——解二元一次方程组",
            children: [
              { id: "10.2.1", title: "代入消元法" },
              { id: "10.2.2", title: "加减消元法" }
            ]
          },
          { id: "10.3", title: "实际问题与二元一次方程组" },
          { id: "10.4", title: "三元一次方程组的解法" },
          { id: "10-rd", title: "古今解方程组方法", type: "reading" },
          { id: "10-rv", title: "数学活动、小结、复习题10", type: "review" }
        ]
      },
      {
        no: 11, title: "不等式与不等式组",
        sections: [
          {
            id: "11.1", title: "不等式",
            children: [
              { id: "11.1.1", title: "不等式及其解集" },
              { id: "11.1.2", title: "不等式的性质" }
            ]
          },
          { id: "11.2", title: "一元一次不等式" },
          { id: "11.3", title: "一元一次不等式组" },
          { id: "11-rv", title: "数学活动、小结、复习题11", type: "review" }
        ]
      },
      {
        no: 12, title: "数据的收集、整理与描述",
        sections: [
          {
            id: "12.1", title: "统计调查",
            children: [
              { id: "12.1.1", title: "全面调查" },
              { id: "12.1.2", title: "抽样调查、样本、总体" }
            ]
          },
          {
            id: "12.2", title: "直方图",
            children: [
              { id: "12.2.1", title: "频数、频率、分组" },
              { id: "12.2.2", title: "画直方图" }
            ]
          },
          { id: "12-rd", title: "简单随机抽样", type: "reading" },
          { id: "12-rv", title: "数学活动、小结、复习题12", type: "review" },
          { id: "12-pj", title: "数据时长规律的探究与描述", type: "project" }
        ]
      }
    ]
  },
  {
    id: "8a", name: "八年级上册", short: "八上",
    chapters: [
      {
        no: 13, title: "三角形",
        sections: [
          {
            id: "13.1", title: "与三角形有关的线段",
            children: [
              { id: "13.1.1", title: "三角形的边、三边关系" },
              { id: "13.1.2", title: "三角形的高、中线、角平分线" },
              { id: "13.1.3", title: "三角形的稳定性" }
            ]
          },
          {
            id: "13.2", title: "与三角形有关的角",
            children: [
              { id: "13.2.1", title: "三角形内角和定理" },
              { id: "13.2.2", title: "三角形外角" }
            ]
          },
          {
            id: "13.3", title: "多边形及其内角和",
            children: [
              { id: "13.3.1", title: "多边形概念" },
              { id: "13.3.2", title: "多边形内角和、外角和" }
            ]
          },
          { id: "13-rd", title: "多边形的三角剖分", type: "reading" },
          { id: "13-rv", title: "数学活动、小结、复习题13", type: "review" }
        ]
      },
      {
        no: 14, title: "全等三角形",
        sections: [
          { id: "14.1", title: "全等三角形" },
          {
            id: "14.2", title: "三角形全等的判定",
            children: [
              { id: "14.2.1", title: "SSS" },
              { id: "14.2.2", title: "SAS" },
              { id: "14.2.3", title: "ASA、AAS" },
              { id: "14.2.4", title: "HL（直角三角形）" }
            ]
          },
          { id: "14.3", title: "角的平分线的性质" },
          { id: "14-rv", title: "数学活动、小结、复习题14", type: "review" }
        ]
      },
      {
        no: 15, title: "轴对称",
        sections: [
          {
            id: "15.1", title: "轴对称",
            children: [
              { id: "15.1.1", title: "轴对称图形、轴对称" },
              { id: "15.1.2", title: "轴对称的性质、垂直平分线" }
            ]
          },
          { id: "15.2", title: "线段的垂直平分线" },
          {
            id: "15.3", title: "等腰三角形",
            children: [
              { id: "15.3.1", title: "等腰三角形性质与判定" },
              { id: "15.3.2", title: "等边三角形" }
            ]
          },
          { id: "15.4", title: "最短路径问题" },
          { id: "15-ex", title: "最短路径", type: "experiment" },
          { id: "15-rv", title: "数学活动、小结、复习题15", type: "review" }
        ]
      },
      {
        no: 16, title: "整式的乘法",
        sections: [
          { id: "16.1", title: "同底数幂的乘法" },
          { id: "16.2", title: "幂的乘方、积的乘方" },
          {
            id: "16.3", title: "整式的乘法",
            children: [
              { id: "16.3.1", title: "单项式乘单项式" },
              { id: "16.3.2", title: "单项式乘多项式" },
              { id: "16.3.3", title: "多项式乘多项式" }
            ]
          },
          {
            id: "16.4", title: "整式的除法",
            children: [
              { id: "16.4.1", title: "同底数幂除法" },
              { id: "16.4.2", title: "单项式除以单项式、多项式除以单项式" }
            ]
          },
          {
            id: "16.5", title: "乘法公式",
            children: [
              { id: "16.5.1", title: "平方差公式" },
              { id: "16.5.2", title: "完全平方公式" }
            ]
          },
          { id: "16-rd", title: "杨辉三角", type: "reading" },
          { id: "16-rv", title: "数学活动、小结、复习题16", type: "review" }
        ]
      },
      {
        no: 17, title: "因式分解",
        sections: [
          { id: "17.1", title: "提公因式法" },
          {
            id: "17.2", title: "公式法",
            children: [
              { id: "17.2.1", title: "平方差分解" },
              { id: "17.2.2", title: "完全平方公式分解" }
            ]
          },
          { id: "17.3", title: "十字相乘法（拓展）" },
          { id: "17-rd", title: "x²+(p+q)x+pq型式子分解", type: "reading" },
          { id: "17-rv", title: "数学活动、小结、复习题17", type: "review" }
        ]
      },
      {
        no: 18, title: "分式",
        sections: [
          {
            id: "18.1", title: "分式",
            children: [
              { id: "18.1.1", title: "分式概念、分式有意义条件" },
              { id: "18.1.2", title: "分式的基本性质、约分、通分" }
            ]
          },
          {
            id: "18.2", title: "分式的运算",
            children: [
              { id: "18.2.1", title: "分式乘除" },
              { id: "18.2.2", title: "分式加减" },
              { id: "18.2.3", title: "整数指数幂" }
            ]
          },
          {
            id: "18.3", title: "分式方程",
            children: [
              { id: "18.3.1", title: "分式方程解法、验根" },
              { id: "18.3.2", title: "分式方程实际应用" }
            ]
          },
          { id: "18-rv", title: "数学活动、小结、复习题18", type: "review" },
          { id: "18-pj", title: "确定匀质薄板的重心位置", type: "project" }
        ]
      }
    ]
  },
  {
    id: "8b", name: "八年级下册", short: "八下",
    chapters: [
      {
        no: 19, title: "二次根式",
        sections: [
          {
            id: "19.1", title: "二次根式",
            children: [
              { id: "19.1.1", title: "二次根式概念、有意义条件" },
              { id: "19.1.2", title: "二次根式性质" }
            ]
          },
          { id: "19.2", title: "二次根式的乘除" },
          { id: "19.3", title: "二次根式的加减" },
          { id: "19-rd", title: "海伦公式", type: "reading" },
          { id: "19-rv", title: "数学活动、小结、复习题19", type: "review" }
        ]
      },
      {
        no: 20, title: "勾股定理",
        sections: [
          { id: "20.1", title: "勾股定理" },
          { id: "20.2", title: "勾股定理的逆定理" },
          { id: "20-rd", title: "勾股定理多种证法", type: "reading" },
          { id: "20-rv", title: "数学活动、小结、复习题20", type: "review" }
        ]
      },
      {
        no: 21, title: "四边形",
        sections: [
          {
            id: "21.1", title: "平行四边形",
            children: [
              { id: "21.1.1", title: "平行四边形性质" },
              { id: "21.1.2", title: "平行四边形判定" }
            ]
          },
          {
            id: "21.2", title: "特殊的平行四边形",
            children: [
              { id: "21.2.1", title: "矩形" },
              { id: "21.2.2", title: "菱形" },
              { id: "21.2.3", title: "正方形" }
            ]
          },
          { id: "21.3", title: "梯形（拓展了解）" },
          { id: "21.4", title: "三角形中位线定理" },
          { id: "21-rv", title: "数学活动、小结、复习题21", type: "review" }
        ]
      },
      {
        no: 22, title: "函数",
        sections: [
          {
            id: "22.1", title: "函数的概念",
            children: [
              { id: "22.1.1", title: "变量与常量" },
              { id: "22.1.2", title: "函数定义、自变量取值范围、函数值" }
            ]
          },
          {
            id: "22.2", title: "函数的图象",
            children: [
              { id: "22.2.1", title: "函数图像画法" },
              { id: "22.2.2", title: "函数三种表示方法：解析式、列表、图像" }
            ]
          },
          { id: "22-rd", title: "函数概念的发展", type: "reading" },
          { id: "22-rv", title: "数学活动、小结、复习题22", type: "review" }
        ]
      },
      {
        no: 23, title: "一次函数",
        sections: [
          {
            id: "23.1", title: "正比例函数",
            children: [
              { id: "23.1.1", title: "正比例函数概念" },
              { id: "23.1.2", title: "正比例函数图像、性质" }
            ]
          },
          {
            id: "23.2", title: "一次函数",
            children: [
              { id: "23.2.1", title: "一次函数概念" },
              { id: "23.2.2", title: "一次函数图像、增减性" },
              { id: "23.2.3", title: "待定系数法求解析式" }
            ]
          },
          { id: "23.3", title: "一次函数与方程、方程组、不等式" },
          { id: "23.4", title: "实际问题与一次函数" },
          { id: "23-pj", title: "选择方案", type: "project" },
          { id: "23-rv", title: "数学活动、小结、复习题23", type: "review" }
        ]
      },
      {
        no: 24, title: "数据的分析",
        sections: [
          {
            id: "24.1", title: "数据的集中趋势",
            children: [
              { id: "24.1.1", title: "平均数、加权平均数" },
              { id: "24.1.2", title: "中位数、众数" }
            ]
          },
          {
            id: "24.2", title: "数据的离散程度",
            children: [
              { id: "24.2.1", title: "方差" },
              { id: "24.2.2", title: "四分位数、数据分组（新版新增）" }
            ]
          },
          { id: "24-rd", title: "数据的波动", type: "reading" },
          { id: "24-rv", title: "数学活动、小结、复习题24", type: "review" },
          { id: "24-pj", title: "音乐与数学；学生体质健康调研与分析", type: "project" }
        ]
      }
    ]
  },
  {
    id: "9a", name: "九年级上册", short: "九上",
    chapters: [
      {
        no: 25, title: "一元二次方程",
        sections: [
          { id: "25.1", title: "一元二次方程" },
          {
            id: "25.2", title: "解一元二次方程",
            children: [
              { id: "25.2.1", title: "直接开平方法" },
              { id: "25.2.2", title: "配方法" },
              { id: "25.2.3", title: "公式法、判别式Δ" },
              { id: "25.2.4", title: "因式分解法" }
            ]
          },
          { id: "25.3", title: "一元二次方程根与系数的关系（韦达定理）" },
          { id: "25.4", title: "实际问题与一元二次方程" },
          { id: "25-rd", title: "黄金分割", type: "reading" },
          { id: "25-rv", title: "数学活动、小结、复习题25", type: "review" }
        ]
      },
      {
        no: 26, title: "二次函数",
        sections: [
          {
            id: "26.1", title: "二次函数",
            children: [
              { id: "26.1.1", title: "二次函数概念" },
              { id: "26.1.2", title: "y=ax²图像与性质" }
            ]
          },
          { id: "26.2", title: "二次函数y=a(x-h)²+k的图像与性质" },
          {
            id: "26.3", title: "二次函数y=ax²+bx+c",
            children: [
              { id: "26.3.1", title: "配方法化成顶点式" },
              { id: "26.3.2", title: "对称轴、顶点、最值" }
            ]
          },
          { id: "26.4", title: "二次函数与一元二次方程" },
          { id: "26.5", title: "实际问题与二次函数" },
          { id: "26-tc", title: "探究二次函数图像", type: "tech" },
          { id: "26-rv", title: "数学活动、小结、复习题26", type: "review" }
        ]
      },
      {
        no: 27, title: "旋转",
        sections: [
          { id: "27.1", title: "图形的旋转" },
          {
            id: "27.2", title: "中心对称",
            children: [
              { id: "27.2.1", title: "中心对称、中心对称图形" },
              { id: "27.2.2", title: "平面直角坐标系中关于原点对称点坐标" }
            ]
          },
          { id: "27-rd", title: "旋转对称图形", type: "reading" },
          { id: "27-rv", title: "数学活动、小结、复习题27", type: "review" }
        ]
      },
      {
        no: 28, title: "圆",
        sections: [
          {
            id: "28.1", title: "圆的有关概念",
            children: [
              { id: "28.1.1", title: "圆、弦、直径、弧、等圆、等弧" }
            ]
          },
          {
            id: "28.2", title: "圆的基本性质",
            children: [
              { id: "28.2.1", title: "垂径定理" },
              { id: "28.2.2", title: "弧、弦、圆心角关系" },
              { id: "28.2.3", title: "圆周角定理、直径所对圆周角" }
            ]
          },
          {
            id: "28.3", title: "点、直线、圆的位置关系",
            children: [
              { id: "28.3.1", title: "点和圆位置关系、外接圆、外心" },
              { id: "28.3.2", title: "直线和圆位置关系、切线判定与性质" },
              { id: "28.3.3", title: "切线长定理、内切圆、内心" }
            ]
          },
          { id: "28.4", title: "正多边形和圆" },
          { id: "28.5", title: "弧长和扇形面积" },
          { id: "28-rd", title: "圆周率π", type: "reading" },
          { id: "28-rv", title: "数学活动、小结、复习题28", type: "review" }
        ]
      },
      {
        no: 29, title: "概率初步",
        sections: [
          { id: "29.1", title: "随机事件与概率" },
          {
            id: "29.2", title: "用列举法求概率",
            children: [
              { id: "29.2.1", title: "列表法" },
              { id: "29.2.2", title: "树状图" }
            ]
          },
          { id: "29.3", title: "用频率估计概率" },
          { id: "29-rd", title: "键盘字母排列规律", type: "reading" },
          { id: "29-rv", title: "数学活动、小结、复习题29", type: "review" },
          { id: "29-pj", title: "高铁列车运行的数量关系；生活中的优化问题", type: "project" }
        ]
      }
    ]
  },
  {
    id: "9b", name: "九年级下册", short: "九下",
    chapters: [
      {
        no: 30, title: "反比例函数",
        sections: [
          {
            id: "30.1", title: "反比例函数",
            children: [
              { id: "30.1.1", title: "反比例函数概念" },
              { id: "30.1.2", title: "反比例函数图像、性质" }
            ]
          },
          { id: "30.2", title: "实际问题与反比例函数" },
          { id: "30-rd", title: "生活中的反比例关系", type: "reading" },
          { id: "30-rv", title: "数学活动、小结、复习题30", type: "review" }
        ]
      },
      {
        no: 31, title: "相似",
        sections: [
          {
            id: "31.1", title: "图形的相似",
            children: [
              { id: "31.1.1", title: "相似图形、相似多边形" },
              { id: "31.1.2", title: "成比例线段" }
            ]
          },
          {
            id: "31.2", title: "相似三角形",
            children: [
              { id: "31.2.1", title: "相似三角形判定（AA、SAS、SSS）" },
              { id: "31.2.2", title: "相似三角形性质" },
              { id: "31.2.3", title: "相似三角形应用举例" }
            ]
          },
          {
            id: "31.3", title: "位似",
            children: [
              { id: "31.3.1", title: "位似图形概念" },
              { id: "31.3.2", title: "坐标系下位似、坐标变化" }
            ]
          },
          { id: "31-tc", title: "探索位似性质", type: "tech" },
          { id: "31-rv", title: "数学活动、小结、复习题31", type: "review" }
        ]
      },
      {
        no: 32, title: "锐角三角函数",
        sections: [
          {
            id: "32.1", title: "锐角三角函数",
            children: [
              { id: "32.1.1", title: "正弦sinA" },
              { id: "32.1.2", title: "余弦cosA、正切tanA" },
              { id: "32.1.3", title: "特殊角三角函数值（30°、45°、60°）" }
            ]
          },
          {
            id: "32.2", title: "解直角三角形",
            children: [
              { id: "32.2.1", title: "解直角三角形" },
              { id: "32.2.2", title: "解直角三角形应用：仰角俯角、坡度坡角、方位角" }
            ]
          },
          { id: "32-rd", title: "山坡的高度", type: "reading" },
          { id: "32-rv", title: "数学活动、小结、复习题32", type: "review" }
        ]
      },
      {
        no: 33, title: "投影与视图",
        sections: [
          {
            id: "33.1", title: "投影",
            children: [
              { id: "33.1.1", title: "平行投影、中心投影" },
              { id: "33.1.2", title: "正投影" }
            ]
          },
          {
            id: "33.2", title: "三视图",
            children: [
              { id: "33.2.1", title: "主视图、俯视图、左视图画法" },
              { id: "33.2.2", title: "由三视图还原几何体、计算" }
            ]
          },
          { id: "33.3", title: "课题学习：制作立体模型", type: "project" },
          { id: "33-rd", title: "视图的产生与应用", type: "reading" },
          { id: "33-rv", title: "数学活动、小结、复习题33", type: "review" },
          { id: "33-pj", title: "建筑中的数学；随机事件的概率", type: "project" }
        ]
      }
    ]
  }
];
