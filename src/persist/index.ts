import { Options } from 'types/persist'
import defaultStorage from './storage'

export default (settings = {}) => (store, options) => {
    const {
        key,
        storage = defaultStorage,
        parser = JSON.parse,
        serializer = JSON.stringify,
        onPersist = state => state,
        onRehydrate = localState => localState,
    }: Options = settings

    const localState = storage.getItem(key)

    options.inject({
        modules: {
            persist: {
                state: {
                    rehydrated: false,
                },

                reducers: {
                    rehydrate: state => ({
                        rehydrated: true,
                    }),
                },
            },
        },
    })

    if (localState) {
        options.inject({
            state: parser(localState),
        })
    }

    store.subscribe(() => {
        const { persist, ...state } = store.get()

        if (!persist.rehydrated) {
            store.commit.persist.rehydrate()
        }

        try {
            storage.setItem(key, serializer(onPersist(state)))
        } catch (e) {
            console.error(e)
        }
    })
}
