import defaultStorage from './storage'

export default (store, options) => {
	const {
		key,
		storage = defaultStorage,
		parser = JSON.parse,
		serializer = JSON.stringify,
	} = options.get().persist

	const localState = storage.getItem(key)

	if (localState) options.inject({ state: parser(localState) })

	store.subscribe(() => storage.setItem(key, serializer(store.get())))
}
