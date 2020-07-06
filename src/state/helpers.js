import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const altComputed = {
  ...mapState('alt', {
    alts: (state) => state.alts,
  }),
}

export const authMethods = mapActions('auth', ['logIn', 'logOut'])
export const altMethods = mapActions('alt', ['fetchAlts'])
