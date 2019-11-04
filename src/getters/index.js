export default (store, options) => {
    const optns = options.get()

    if (typeof optns.state === 'object') {
        Object.keys(optns.state).forEach(statePropKey => {
            if (!optns.getters) optns.getters = {}

            optns.getters[statePropKey] = state => state[statePropKey]
        })
    }

    if (optns.modules) {
        Object.entries(optns.modules).forEach(([storeName, store]) => {
            if (typeof store.state === 'object') {
                optns.modules[storeName].getters = {
                    ...Object.keys(store.state).reduce((getters, statePropKey) => {
                        getters[statePropKey] = state => state[statePropKey]

                        return getters
                    }, {}),
                    ...store.getters,
                }
            }
        })
    }
}
