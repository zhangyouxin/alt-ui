import * as altModule from './alt'

describe('@state/modules/alt', () => {
  it('exports a valid Vuex module', () => {
    expect(altModule).toBeAVuexModule()
  })
})
