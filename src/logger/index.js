export default (settings = {}) => store => {
    const { production } = settings

    if (process.env.NODE_ENV !== 'production' || production) {
        let prevState = {}

        store.subscribe((action, args) => {
            if (window.logger === false || localStorage.getItem('logger') === 'false') return

            console.group(action)
            console.log(`args:`, args)
            console.log(`before:`, prevState)
            console.log(`after:`, (prevState = JSON.parse(JSON.stringify(store.get()))))
            console.groupEnd(action)
        })
    }
}
