import { SectionInterface, Options } from 'types/notifications'
import notificationsConfig from './notifications.config'

import * as actions from './notifications.actions'
import * as reducers from './notifications.reducers'
import * as listeners from './notifications.listeners'
import * as getters from './notifications.getters'
import * as selectors from './notifications.selectors'
import * as state from './notifications.state'

export default ({ max, limit }: Options = {}) => (_, options) => {
    notificationsConfig({ max })

    if (limit) {
        state.positions.top = limit.top.reduce((top, position) => {
            top[position] = state.positions.top[position]

            return top
        }, {} as SectionInterface)

        state.positions.bottom = limit.bottom.reduce((bottom, position) => {
            bottom[position] = state.positions.bottom[position]

            return bottom
        }, {} as SectionInterface)
    }

    options.inject({
        modules: {
            notifications: {
                state,
                actions,
                reducers,
                listeners,
                getters,
                selectors,
            },
        },
    })
}
