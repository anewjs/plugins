export default (store, options) => {
    const { modules = {}, state = {} } = options.get()

    options.inject({
        getters: {
            ...Object.keys(state).reduce((getters, statePropKey) => {
                getters[statePropKey] = state => state[statePropKey]

                return getters
            }, {}),
            ...store.getters,
        },
        modules: Object.entries(modules).reduce((modules, [storeName, store]) => {
            modules[storeName] =
                typeof store.state === 'object'
                    ? {
                          ...store,
                          getters: {
                              ...Object.keys(store.state).reduce((getters, statePropKey) => {
                                  getters[statePropKey] = state => state[statePropKey]

                                  return getters
                              }, {}),
                              ...store.getters,
                          },
                      }
                    : store

            return modules
        }, {}),
    })
}
