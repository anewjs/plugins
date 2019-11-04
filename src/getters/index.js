export default (store, options) => {
    options.inject({
        modules: Object.entries(modules).reduce((modules, [storeName, store]) => {
            modules[storeName] = {
                ...store,
                getters: {
                    ...Object.keys(store.state).reduce((getters, statePropKey) => {
                        getters[statePropKey] = state => state[statePropKey]

                        return getters
                    }, {}),
                    ...store.getters,
                },
            }

            return modules
        }, {}),
    })
}
