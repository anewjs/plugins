export class Stringifier {
    constructor() {
        this.cache = []
    }

    onStringify(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (this.cache.indexOf(value) !== -1) {
                // Duplicate reference found
                try {
                    // If this value does not reference a parent it can be deduped
                    return JSON.parse(JSON.stringify(value))
                } catch (error) {
                    // discard key if value cannot be deduped
                    return
                }
            }

            // Store value in our collection
            this.cache.push(value)
        }

        return value
    }

    stringify(obj) {
        return JSON.stringify(obj, this.onStringify.bind(this))
    }
}

export default ({ production, stringifier = new Stringifier() } = {}) => store => {
    if (process.env.NODE_ENV !== 'production' || production) {
        let prevState = {}

        store.subscribe((action, args, callType) => {
            if (window.logger === false || localStorage.getItem('logger') === 'false') return
            const groupId = `<${callType}> ${action}`

            console.group(groupId)
            console.log(`args:`, args)
            console.log(`before:`, prevState)
            console.log(`after:`, (prevState = JSON.parse(stringifier.stringify(store.get()))))
            console.groupEnd(groupId)
        })
    }
}
