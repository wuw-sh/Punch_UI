import {Player, world} from 'mojang-minecraft'
import {ActionFormData, MessageFormData, ModalFormData} from 'mojang-minecraft-ui'

world.events.entityHit.subscribe(data => {
    const pl = data.entity instanceof Player ? data.entity : null
    const
        et = data.hitEntity,
        id = !et ? false : et.id === 'minecraft:polar_bear' ?? false
    if (id) {
        const main = new ActionFormData()
        main.title('Punch UI')
            .body('Description')
            .button('Modal Button')
            .button('Action Button')
            .button('Message Button')
            .show(pl).then(res => {
            if (res.isCanceled) return
            sendMessage(pl, res.selection)
            switch (res.selection) {
                case 0:
                    modalForm(pl)
                    return;
                case 1:
                    actionForm(pl)
                    return;
                case 2:
                    messageForm(pl)
                    return;
            }
        })
    }
})
const sendMessage = (pl, msg) => {
    pl.runCommand('tellraw @s {"rawtext":[{"text":"' + msg + '"}]}')
}

function modalForm(pl) {
    const modal = new ModalFormData()
    modal.title('Modal Form')
        .dropdown('Dropdown', ['Option 1', 'Option 2', 'Option 3'], 0)
        .textField('Text Field', 'Enter text here', 'Text')
        .slider('Slider', 0, 100, 1, 0)
        .toggle('Toggle', true)
        .show(pl).then(res => {
        const value = res.formValues
        if (res.isCanceled) return
        sendMessage(pl, `--Modal Form--\nDropdown: ${value[0]}\nText Field: ${value[1]}\nSlider: ${value[2]}\nToggle: ${value[3]}`)
    })
}

function actionForm(pl) {
    const action = new ActionFormData()
    action.title('Action Form')
        .body('Description')
        .button('Action Button')
        .button('Action Button 1')
        .show(pl).then(res => {
        if (res.isCanceled) return
        sendMessage(pl, `--Action Form--\nSelection: ${res.selection}`)
    })
}

function messageForm(pl) {
    const message = new MessageFormData()
    message.title('Message Form')
        .body('Description')
        .button1('Message Button 1')
        .button2('Message Button 2')
        .show(pl).then(res => {
        if (res.isCanceled) return
        sendMessage(pl, `--Message Form--\nSelection: ${res.selection}`)
    })
}
