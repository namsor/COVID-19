import * as d3 from 'd3'
import * as reuse from 'd3-force-reuse'
import { s } from '../settings'
import ticked from './ticked'

export default () => {

    const simulation = d3.forceSimulation()
        .force('collide', d3.forceCollide()
            .radius(s.distance)
            .strength(.5)
            .iterations(20)
        )
        .force('center', d3.forceCenter(s.body.clientWidth / 2, s.body.clientHeight / 2))
        .force('link', d3.forceLink()
            .id(d => d.id)
            .strength(d => d.value * 1)
        )
        .nodes(s.nodes).on('tick', ticked)
        .force('link').links(s.links)

}