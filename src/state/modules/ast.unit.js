import * as astModule from './ast'

describe('@state/modules/ast', () => {
  it('exports a valid Vuex module', () => {
    expect(astModule).toBeAVuexModule()
  })
})
