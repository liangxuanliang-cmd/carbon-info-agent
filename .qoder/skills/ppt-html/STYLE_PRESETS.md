# 风格预设参考

Frontend Slides 的精选视觉风格。每个预设都参考了真实的设计案例 — 杜绝千篇一律的"AI 模板"美学。**仅使用抽象形状 — 不使用插图。**

**视口 CSS：** 必需的基础样式请参见 [viewport-base.css](viewport-base.css)。每份演示文稿都必须包含。

---

## 深色主题

### 1. Bold Signal（醒目信号）

**氛围：** 自信、大胆、现代、高冲击力

**布局：** 深色渐变上的彩色卡片。编号在左上角，导航在右上角，标题在左下角。

**字体排印：**
- 展示字体：`Archivo Black`（900）
- 正文字体：`Space Grotesk`（400/500）

**色彩：**
```css
:root {
    --bg-primary: #1a1a1a;
    --bg-gradient: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
    --card-bg: #FF5722;
    --text-primary: #ffffff;
    --text-on-card: #1a1a1a;
}
```

**标志性元素：**
- 醒目的彩色卡片作为视觉焦点（橙色、珊瑚色或鲜艳强调色）
- 大号章节编号（01、02 等）
- 带活跃/非活跃透明度状态的导航面包屑
- 基于网格的布局实现精确对齐

---

### 2. Electric Studio（电力工作室）

**氛围：** 大胆、干净、专业、高对比度

**布局：** 分屏面板 — 上方白色，下方蓝色。品牌标识在角落。

**字体排印：**
- 展示字体：`Manrope`（800）
- 正文字体：`Manrope`（400/500）

**色彩：**
```css
:root {
    --bg-dark: #0a0a0a;
    --bg-white: #ffffff;
    --accent-blue: #4361ee;
    --text-dark: #0a0a0a;
    --text-light: #ffffff;
}
```

**标志性元素：**
- 两面板垂直分屏
- 面板边缘的强调色条
- 引言排版作为主视觉元素
- 极简、自信的间距

---

### 3. Creative Voltage（创意电压）

**氛围：** 大胆、创意、充满能量、复古现代

**布局：** 分屏面板 — 左侧电蓝色，右侧深色。手写风格点缀。

**字体排印：**
- 展示字体：`Syne`（700/800）
- 等宽字体：`Space Mono`（400/700）

**色彩：**
```css
:root {
    --bg-primary: #0066ff;
    --bg-dark: #1a1a2e;
    --accent-neon: #d4ff00;
    --text-light: #ffffff;
}
```

**标志性元素：**
- 电蓝色 + 霓虹黄对比
- 半调纹理图案
- 霓虹标签/标注
- 手写风格字体增添创意感

---

### 4. Dark Botanical（暗色植物学）

**氛围：** 优雅、精致、艺术感、高端

**布局：** 深色背景上居中的内容。角落有抽象柔和形状。

**字体排印：**
- 展示字体：`Cormorant`（400/600）— 优雅衬线体
- 正文字体：`IBM Plex Sans`（300/400）

**色彩：**
```css
:root {
    --bg-primary: #0f0f0f;
    --text-primary: #e8e4df;
    --text-secondary: #9a9590;
    --accent-warm: #d4a574;
    --accent-pink: #e8b4b8;
    --accent-gold: #c9b896;
}
```

**标志性元素：**
- 抽象柔和渐变圆（模糊、重叠）
- 暖色调强调色（粉色、金色、赤陶色）
- 纤细的垂直强调线
- 斜体签名式字体排印
- **不使用插图 — 仅使用抽象 CSS 形状**

---

## 浅色主题

### 5. Notebook Tabs（笔记本标签）

**氛围：** 编辑风、有序、优雅、质感

**布局：** 深色背景上的奶油色纸张卡片。右边缘有彩色标签。

**字体排印：**
- 展示字体：`Bodoni Moda`（400/700）— 经典编辑风格
- 正文字体：`DM Sans`（400/500）

**色彩：**
```css
:root {
    --bg-outer: #2d2d2d;
    --bg-page: #f8f6f1;
    --text-primary: #1a1a1a;
    --tab-1: #98d4bb; /* 薄荷绿 */
    --tab-2: #c7b8ea; /* 薰衣草紫 */
    --tab-3: #f4b8c5; /* 粉红 */
    --tab-4: #a8d8ea; /* 天空蓝 */
    --tab-5: #ffe6a7; /* 奶油黄 */
}
```

**标志性元素：**
- 带微妙阴影的纸张容器
- 右边缘的彩色章节标签（竖排文字）
- 左侧的活页孔装饰
- 标签文字必须随视口缩放：`font-size: clamp(0.5rem, 1vh, 0.7rem)`

---

### 6. Pastel Geometry（柔和几何）

**氛围：** 友好、有序、现代、亲切

**布局：** 柔和色背景上的白色卡片。右边缘有垂直胶囊按钮。

**字体排印：**
- 展示字体：`Plus Jakarta Sans`（700/800）
- 正文字体：`Plus Jakarta Sans`（400/500）

**色彩：**
```css
:root {
    --bg-primary: #c8d9e6;
    --card-bg: #faf9f7;
    --pill-pink: #f0b4d4;
    --pill-mint: #a8d4c4;
    --pill-sage: #5a7c6a;
    --pill-lavender: #9b8dc4;
    --pill-violet: #7c6aad;
}
```

**标志性元素：**
- 带柔和阴影的圆角卡片
- **右边缘的垂直胶囊按钮**，高度各异（类似标签）
- 统一的胶囊宽度，高度：矮 → 中 → 高 → 中 → 矮
- 角落的下载/操作图标

---

### 7. Split Pastel（分屏柔和）

**氛围：** 趣味、现代、友好、创意

**布局：** 双色垂直分屏（左侧桃色，右侧薰衣草色）。

**字体排印：**
- 展示字体：`Outfit`（700/800）
- 正文字体：`Outfit`（400/500）

**色彩：**
```css
:root {
    --bg-peach: #f5e6dc;
    --bg-lavender: #e4dff0;
    --text-dark: #1a1a1a;
    --badge-mint: #c8f0d8;
    --badge-yellow: #f0f0c8;
    --badge-pink: #f0d4e0;
}
```

**标志性元素：**
- 分屏背景色
- 趣味胶囊标签配图标
- 右面板的网格图案叠加
- 圆角行动号召按钮

---

### 8. Vintage Editorial（复古编辑风）

**氛围：** 风趣、自信、编辑风、个性突出

**布局：** 奶油色背景上居中的内容。抽象几何形状作为点缀。

**字体排印：**
- 展示字体：`Fraunces`（700/900）— 独特衬线体
- 正文字体：`Work Sans`（400/500）

**色彩：**
```css
:root {
    --bg-cream: #f5f3ee;
    --text-primary: #1a1a1a;
    --text-secondary: #555;
    --accent-warm: #e8d4c0;
}
```

**标志性元素：**
- 抽象几何形状（圆形轮廓 + 线条 + 圆点）
- 粗边框行动号召框
- 风趣、对话式文案风格
- **不使用插图 — 仅使用几何 CSS 形状**

---

## 特殊主题

### 9. Neon Cyber（霓虹赛博）

**氛围：** 未来感、科技感、自信

**字体排印：** `Clash Display` + `Satoshi`（Fontshare）

**色彩：** 深海军蓝（#0a0f1c）、青色强调（#00ffcc）、品红（#ff00aa）

**标志性元素：** 粒子背景、霓虹光晕、网格图案

---

### 10. Terminal Green（终端绿）

**氛围：** 面向开发者、黑客美学

**字体排印：** `JetBrains Mono`（仅等宽）

**色彩：** GitHub 深色（#0d1117）、终端绿（#39d353）

**标志性元素：** 扫描线、闪烁光标、代码语法高亮

---

### 11. Swiss Modern（瑞士现代）

**氛围：** 干净、精确、包豪斯灵感

**字体排印：** `Archivo`（800）+ `Nunito`（400）

**色彩：** 纯白、纯黑、红色强调（#ff3300）

**标志性元素：** 可见网格、非对称布局、几何形状

---

### 12. Paper & Ink（纸与墨）

**氛围：** 编辑风、文学感、深思熟虑

**字体排印：** `Cormorant Garamond` + `Source Serif 4`

**色彩：** 暖奶油色（#faf9f7）、炭灰（#1a1a1a）、深红强调（#c41e3a）

**标志性元素：** 首字下沉、引言摘录、优雅的水平分割线

---

## 字体搭配速查表

| 预设 | 展示字体 | 正文字体 | 来源 |
|------|---------|---------|------|
| Bold Signal | Archivo Black | Space Grotesk | Google |
| Electric Studio | Manrope | Manrope | Google |
| Creative Voltage | Syne | Space Mono | Google |
| Dark Botanical | Cormorant | IBM Plex Sans | Google |
| Notebook Tabs | Bodoni Moda | DM Sans | Google |
| Pastel Geometry | Plus Jakarta Sans | Plus Jakarta Sans | Google |
| Split Pastel | Outfit | Outfit | Google |
| Vintage Editorial | Fraunces | Work Sans | Google |
| Neon Cyber | Clash Display | Satoshi | Fontshare |
| Terminal Green | JetBrains Mono | JetBrains Mono | JetBrains |

---

## 禁止使用（AI 通用模式）

**字体：** Inter、Roboto、Arial、系统字体作为展示字体

**色彩：** `#6366f1`（通用靛蓝色）、白底紫色渐变

**布局：** 所有内容居中、通用英雄区块、千篇一律的卡片网格

**装饰：** 写实插图、滥用玻璃拟态、无意义的投影

---

## CSS 注意事项

### CSS 函数取反

**错误 — 浏览器会静默忽略（无控制台报错）：**
```css
right: -clamp(28px, 3.5vw, 44px);   /* 浏览器忽略此声明 */
margin-left: -min(10vw, 100px);      /* 浏览器忽略此声明 */
```

**正确 — 包裹在 `calc()` 中：**
```css
right: calc(-1 * clamp(28px, 3.5vw, 44px));  /* 有效 */
margin-left: calc(-1 * min(10vw, 100px));     /* 有效 */
```

CSS 不允许在函数名前加 `-` 号。浏览器会静默丢弃整个声明 — 不报错，元素只是出现在错误位置。**始终使用 `calc(-1 * ...)` 来对 CSS 函数值取反。**
