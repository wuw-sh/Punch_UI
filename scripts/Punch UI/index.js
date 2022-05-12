import {Player, world} from 'mojang-minecraft'
import {ActionFormData} from 'mojang-minecraft-ui'

world.events.entityHit.subscribe(data => {
    const pl = data.entity instanceof Player ? data.entity : null
    const
        et = data.hitEntity,
        id = !et ? false : et.id === 'minecraft:polar_bear' ?? false
    if (id) {
        const form = new ActionFormData()
        form.title('Punch UI')
            .body('Test Body')
            .button('Test Button')
            .button('Test Button 1')
            .button('Test Button 2')
            .show(pl).then(res => {
            if (res.isCanceled) return
        })
    }
})
