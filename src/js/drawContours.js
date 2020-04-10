import * as d3 from 'd3'
import { s } from './state'

const _computeDensityData = () => {

    const extX = d3.extent(s.nodes, d => Math.floor(d.x))
    const extY = d3.extent(s.nodes, d => Math.floor(d.y))
    const width = extX[1] - extX[0]
    const height = extY[1] - extY[0]
    const x = extX[0]
    const y = extY[0]

    const sumValues = obj => Math.floor(Object.values(obj).reduce((a, b) => a + b))

    s.densityData = d3.contourDensity()
        .x(d => Math.floor(d.x) - x)
        .y(d => Math.floor(d.y) - y)
        // .weight(d => d.docs)
        .weight(d => sumValues(d.tokens) /100)
        .size([width, height])
        .cellSize(15)
        // If cellSize is specified, sets the size of individual cells in the underlying bin grid to the specified positive integer and returns the estimator. If cellSize is not specified, returns the current cell size, which defaults to 4. The cell size is rounded down to the nearest power of two. Smaller cells produce more detailed contour polygons, but are more expensive to compute.
        .bandwidth(80)
        // If bandwidth is specified, sets the bandwidth (the standard deviation) of the Gaussian kernel and returns the estimate. If bandwidth is not specified, returns the current bandwidth, which defaults to 20.4939…. The specified bandwidth is currently rounded to the nearest supported value by this implementation, and must be nonnegative.
        .thresholds(15)
        // If thresholds is specified, sets the threshold generator to the specified function or array and returns this contour generator. If thresholds is not specified, returns the current threshold generator, which by default generates about twenty nicely-rounded density thresholds.
        (s.nodes)

    s.densityData.forEach(d => d.coordinates = d.coordinates
        .map(d => d.map(d => d.map(
            d => {
                // return [(Math.floor(d[0] + x)), Math.floor((d[1] + y))]}
                return [d[0] + x, d[1] + y]
            }
        )))
    )
}


export default () => {

    // if (s.end && !s.densityData.length) _computeDensityData()
    _computeDensityData()


    // console.log(s.densityData.length)

    // for (var i = s.densityData.length - 1; i >= 0; i--) {
    for (var i = 0; i < s.densityData.length; i++) {

        // if (i > 5) continue

        s.context.beginPath()
        s.context.strokeStyle = s.colors.contours
        s.geoPath(s.densityData[i])
        // s.context.lineWidth = 1
        s.context.lineWidth = 6 - (.1 * i)
        s.context.stroke()
    }


}