import queryString from 'query-string'

function createByNameAction(type, history, router) {
    const action = history[type]

    if (router) {
        return (store, config) => {
            if (typeof config === 'function') {
                return action(config(store, router))
            }

            const { name, params, method = 'path', search = store.get.search(), ...rest } = config

            return action({
                pathname: name ? router.get(name)[method](params) : store.get.pathname(),
                search,
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
                    key: state => state.location.key,
                },

                selectors: {
                    search: ({ get }) => [
                        get.search,
                        (state, props) => props,
                        (search, props) => queryString.parse(search, props),
                    ],

                    searchCount: ({ select }) => [
                        select.search,

                        search => Object.keys(search).length,
                    ],
                },
            },
        },
    })

    history.listen((location, action) => {
        store.commit.router.navigate({ action, location })
    })
}
