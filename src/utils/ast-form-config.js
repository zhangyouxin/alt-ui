export const stressMode = {
  steady: '恒定',
  step: '步进',
}

export const expDistributeAlgrithm = {
  mid: '中位秩算法',
  hansen: 'hansen算法',
  average: '平均秩算法',
}

export const translateExpDistributeAlgrithm = {
  mid: 'jinsi',
  hansen: 'hansen',
  average: 'E',
}

export const paramEstAlgrithm = {
  rsl: '最小二乘法',
  mle: '极大似然估计',
  blue: '最佳线性无偏估计',
}
export const translateParamEstAlgrithm = {
  rsl: 'RLS',
  mle: 'MLE',
  blue: 'BLUE',
}

export const distributeFunction = {
  exponential: '指数分布',
  weibull: '威布尔分布',
  log: '对数分布',
}

export const LifeDistributionModel = {
  exponential: '指数分布',
  weibull: '威布尔分布',
  lognomal: '对数正态分布',
}

export const aceleratModel = {
  arr: '阿伦尼斯',
  ipl: '逆幂律',
  peck: 'peck',
  eyring: '艾琳',
}

export const translateAceleratModel = {
  arr: 'Arrhenius',
  ipl: 'Inversepowerlaw',
  peck: 'Peck',
  eyring: 'Eyring',
}

export const resultMapping = {
  reliabilityPointEst: '可靠性预估点',
  lifePointEst: '寿命估算',
  normalLife: '一般寿命',
  bestLifeFitModel: '最佳匹配模型',
}

export const stressTypeCount = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
}

export const stressCode = {
  temp: '温度',
  press: '压力',
  moist: '湿度',
  vibr: '震动',
  elec: '电应力',
}

export const translateStressCode = {
  temp: 'temperatureStress',
  press: '压力',
  moist: 'humidityStress',
  vibr: '震动',
  elec: 'electricalStress',
}

export const failureThreshold = {
  定时: '定时',
  定数: '定数',
}
