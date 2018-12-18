export default (settings = {}) => store => {
    const { production } = settings

    if (process.env.NODE_ENV !== 'production' || production) {
        store.subscribe((action, args) => {
            if (window.logger === false) return

            console.group(action)
            console.log(`args:`, args)
            console.log(`state:`, store.get())
            console.groupEnd(action)
        })
    }
}
