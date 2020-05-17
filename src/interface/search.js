import './search.css'
import autoComplete from '@tarekraafat/autocomplete.js'

export default () => {

    // autoComplete.js on typing event emitter
    document.querySelector("#autoComplete").addEventListener("autoComplete", event => {
        console.log(event)
    })
    // The autoComplete.js Engine instance creator
    const autoCompletejs = new autoComplete({
        data: {
            src: async () => {
                // Loading placeholder text
                document
                    .querySelector("#autoComplete")
                    .setAttribute("placeholder", "Loading...")
                // Fetch External Data Source
                // const source = s.nodes
                // const source = await fetch(
                //     "https://tarekraafat.github.io/autoComplete.js/demo/db/generic.json"
                // )
                const data = s.nodes
                // Post loading placeholder text
                document
                    .querySelector("#autoComplete")
                    // .setAttribute("placeholder", "Food & Drinks")
                // Returns Fetched data
                return data
            },
            key: ["name"],
            // key: ["food", "cities", "animals"],
            cache: false
        },
        sort: (a, b) => {
            if (a.match < b.match) return -1
            if (a.match > b.match) return 1
            return 0
        },
        placeHolder: "Search a researcher",
        selector: "#autoComplete",
        threshold: 0,
        debounce: 0,
        searchEngine: "strict",
        highlight: true,
        maxResults: 5,
        resultsList: {
            render: true,
            container: source => {
                source.setAttribute("id", "autoComplete_list")
            },
            destination: document.querySelector("#autoComplete"),
            position: "afterend",
            element: "ul"
        },
        resultItem: {
            content: (data, source) => {
                source.innerHTML = data.match
            },
            element: "li"
        },
        noResults: () => {
            const result = document.createElement("li")
            result.setAttribute("class", "no_result")
            result.setAttribute("tabindex", "1")
            result.innerHTML = "No Results"
            document.querySelector("#autoComplete_list").appendChild(result)
        },
        onSelection: feedback => {
            const selection = feedback.selection.value.food
            // Render selected choice to selection div
            document.querySelector(".selection").innerHTML = selection
            // Clear Input
            document.querySelector("#autoComplete").value = ""
            // Change placeholder with the selected value
            document
                .querySelector("#autoComplete")
                .setAttribute("placeholder", selection)
            // Concole log autoComplete data feedback
            console.log(feedback)
        }
    })

    // // Toggle Search Engine Type/Mode
    // document.querySelector(".toggeler").addEventListener("click", function () {
    //     // Holdes the toggle buttin alignment
    //     const toggele = document.querySelector(".toggele").style.justifyContent

    //     if (toggele === "flex-start" || toggele === "") {
    //         // Set Search Engine mode to Loose
    //         document.querySelector(".toggele").style.justifyContent = "flex-end"
    //         document.querySelector(".toggeler").innerHTML = "Loose"
    //         autoCompletejs.searchEngine = "loose"
    //     } else {
    //         // Set Search Engine mode to Strict
    //         document.querySelector(".toggele").style.justifyContent = "flex-start"
    //         document.querySelector(".toggeler").innerHTML = "Strict"
    //         autoCompletejs.searchEngine = "strict"
    //     }
    // })

    // // Toggle results list and other elements
    // const action = function (action) {
    //     const github = document.querySelector(".github-corner")
    //     const title = document.querySelector("h1")
    //     const mode = document.querySelector(".mode")
    //     const selection = document.querySelector(".selection")
    //     const footer = document.querySelector(".footer")

    //     if (action === "dim") {
    //         github.style.opacity = 1
    //         title.style.opacity = 1
    //         mode.style.opacity = 1
    //         selection.style.opacity = 1
    //         footer.style.opacity = 1
    //     } else {
    //         github.style.opacity = 0.1
    //         title.style.opacity = 0.3
    //         mode.style.opacity = 0.2
    //         selection.style.opacity = 0.1
    //         footer.style.opacity = 0.1
    //     }
    // }

    // // Toggle event for search input
    // // showing & hidding results list onfocus / blur
    // ["focus", "blur"].forEach(function (eventType) {
    //     const resultsList = document.querySelector("#autoComplete_list")

    //     document.querySelector("#autoComplete").addEventListener(eventType, function () {
    //         // Hide results list & show other elemennts
    //         if (eventType === "blur") {
    //             action("dim")
    //             resultsList.style.display = "none"
    //         } else if (eventType === "focus") {
    //             // Show results list & hide other elemennts
    //             action("light")
    //             resultsList.style.display = "block"
    //         }
    //     })
    // })











    // d3.select("#searchField")
    //     .on('input', function () {
    //         const matchingNode = s.nodes.find(d => {
    //             console.log(this)
    //             return d.id.toLowerCase().indexOf(this.value.toLowerCase()) !== -1
    //         })
    //         d3.select('#searchResults').html('')
    //         d3.select('#searchResults').append('p').html(`Press the key 'enter'<br\>to focus on ${matchingNode.id}`)
    //         console.log("matching", matchingNode)
    //         s.zoomTo = matchingNode
    //     })

    // To check s.screen.density does not exist anymore

    // .on("keypress", function () {
    //     if (d3.event.keyCode === 32 || d3.event.keyCode === 13) {

    //         const k = 8
    //         const tx = (s.screen.width / 2 - s.zoomTo.x * k) / s.screen.density
    //         const ty = (s.screen.height / 2 - s.zoomTo.y * k) / s.screen.density

    //         s.zoomState = d3.zoomIdentity
    //             .translate(tx, ty)
    //             .scale(k)

    //         s.canvas.transition()
    //             .duration(2000)
    //             .call(s.zoom.transform, s.zoomState)

    //     }
    // })
}