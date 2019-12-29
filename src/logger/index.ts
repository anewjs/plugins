import { StringifierInterface, Options } from 'types/logger'

export class Stringifier implements StringifierInterface {
    cache: any[] = []

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

export default ({ production, stringifier = new Stringifier() }: Options = {}) => store => {
    if (process.env.NODE_ENV !== 'production' || production) {
        let prevState = {}

        store.subscribe((action, args, callType) => {
            if ((window as any).logger === false || localStorage.getItem('logger') === 'false')
                return

            console.group(`<${callType}> ${action}`)
            console.log(`args:`, args)
            console.log(`before:`, prevState)
            console.log(`after:`, (prevState = JSON.parse(stringifier.stringify(store.get()))))
            console.groupEnd()
        })
    }
}
