import { s } from '../init/settings'
import * as PIXI from 'pixi.js'

let stage

export function initTokens() {

    const tokens = new PIXI.Graphics()
    stage = s.pixi.addChild(tokens)

    // Check this

    s.ext.distance = {
        min: Math.pow(s.distance * s.screen.density / 2, 2),
        max: Math.pow(s.distance * s.screen.density, 2)
    }

    const tokenStyle = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 24,
        fill: "white",
        align: 'center'
    })

    s.links.forEach(link => {
        if (link.value < .1) return
        const [key, value] = Object.entries(link.tokens)[0]
        const scale = value * .0005
        link.txt = new PIXI.Text(key, tokenStyle)
        link.txt.scale.set(scale)
        stage.addChild(link.txt)
    })

}

export function drawTokens() {

    s.links.forEach(link => {

        if (!link.txt) return

        const deltaX = Math.abs(link.source.x - link.target.x)
        const deltaY = Math.abs(link.source.y - link.target.y)
        const distance = Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
        const txt = link.txt

        if (s.ext.distance.min < distance && distance < s.ext.distance.max) {
            const x = deltaX / 2 + (link.source.x < link.target.x ? link.source.x : link.target.x)
            const y = deltaY / 2 + (link.source.y < link.target.y ? link.source.y : link.target.y)
            console.log()
            txt.position.set(x - txt.width / 2, y - txt.height / 2)
        } else {
            txt.position.set(-100, -100)
        }

    })

}