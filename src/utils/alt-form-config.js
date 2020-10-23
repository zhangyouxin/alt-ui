export const stressMode = {
  steady: '恒定',
  step: '步进',
}

export const optimizationCode = {
  aOpt: 'A优化',
  dOpt: 'D优化',
  minDelta: '最小方差',
}

export const optimizationAlgrithm = {
  PSO: '粒子群算法',
  legacy: '遗传算法',
  ranWalk: '随机游走算法',
}

export const aceleratModel = {
  ph: '比例危险-比例优势',
  arr: '阿伦尼斯',
  ipl: '逆幂律',
  peck: 'peck',
  eyring: '艾琳',
  gEyring: '广义艾琳',
  ll: '广义对数线性',
}

export const stressCode = {
  temp: '温度',
  press: '压力',
  moist: '湿度',
  vibr: '震动',
  elec: '电应力',
}

export const stressTypeCount = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
}

export const path = [
  {
    model: 'ph',
    opt: ['dOpt'],
    stressNo: [1, 2, 3, 4, 5],
    params: ['β', 'z', 'c'],
  },
  {
    model: 'arr',
    opt: ['dOpt'],
    stressNo: [1],
    stressCode: ['temp'],
    params: ['a', 'b', 'S'],
  },
  {
    model: 'ipl',
    opt: ['dOpt'],
    stressNo: [1],
    stressCode: ['elec'],
    params: ['a', 'b', 'S'],
  },
  {
    model: 'peck',
    opt: ['dOpt'],
    stressNo: [2],
    stressCode1: ['temp'],
    stressCode2: ['press', 'moist', 'vibr', 'elec'],
    params: ['a', 'S', 'E', 'n', 'k', 'T'],
  },
  {
    model: 'eyring',
    opt: ['dOpt'],
    stressNo: [1],
    stressCode: ['temp'],
    params: ['a', 'b', 'k', 'S'],
  },
  {
    model: 'gEyring',
    opt: ['dOpt'],
    stressNo: [2],
    stressCode1: ['temp'],
    stressCode2: ['elec'],
    params: ['a', 'b', 'T', 'S'],
  },
  {
    model: 'll',
    opt: ['dOpt'],
    stressNo: [2, 3, 4, 5],
    params: ['S1', 'S2', 'S3', 'S4'],
  },
]
