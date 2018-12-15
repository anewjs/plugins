function createByNameAction(type, history, router) {
    const action = history[type]

    if (router) {
        return (store, config) => {
            if (typeof config === 'function') {
                return action(config(store, router))
            }

            const { name, method = 'path', params, ...rest } = config

            return action({
                pathname: router.get(name)[method](method === 'data' && !params ? 'path' : params),
                ...rest,
            })
        }
    }

    return action
}

function createAction(type, history, router) {
    const action = history[type]

    if (router) {
        return (store, arg) => {
            if (typeof arg === 'function') {
                action(() => arg(store, router))
            }

            return action(arg)
        }
    }

    return (store, arg) => {
        if (typeof arg === 'function') {
            action(() => arg(store))
        }

        return action(arg)
    }
}

export default ({ history, router } = {}) => (store, options) => {
    options.inject({
        modules: {
            router: {
                state: {
                    action: history.action,
                    location: history.location,
                },

                reducers: {
                    navigate: (state, change) => change,
                },

                actions: {
                    listen: history.listen,
                    go: history.go,
                    goBack: history.goBack,
                    goForward: history.goForward,
                    canGo: history.canGo,

                    push: createByNameAction('push', history, router),
                    replace: createByNameAction('replace', history, router),
                    block: createAction('block', history, router),
                },

                getters: {
                    action: state => state.action,
                    location: state => state.location,
                    pathname: state => state.location.pathname,
                    hash: state => state.location.hash,
                    search: state => state.location.search,
                    state: state => state.location.state,
                },
            },
        },
    })

    history.listen((location, action) => {
        store.commit.router.navigate({ action, location })
    })
}
