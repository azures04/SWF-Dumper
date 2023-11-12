function handleResize(boolean) {
    if (boolean) {
        document.querySelector("main").style.top = "0px"
        document.querySelector("main").style.left = "0px"
        document.querySelector("main").style.right = "0px"
        document.querySelector("main").style.bottom = "0px"
        document.querySelector("main").style.boxShadow = "none"
        document.querySelector("main").style.borderRadius = "0px"
        document.querySelector("#titlebar").children[0].style.borderRadius = "0px"
    } else {
        document.querySelector("main").style.top = "6px"
        document.querySelector("main").style.left = "6px"
        document.querySelector("main").style.right = "6px"
        document.querySelector("main").style.bottom = "6px"
        document.querySelector("main").style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);"
        document.querySelector("main").style.borderRadius = "15px"
        document.querySelector("#titlebar").children[0].style.borderRadius = "15px"
    }
}

function handleOnFileInputChange(input_element) {
    input_element.parentNode.children[2].value = input_element.files[0].path
}

window.onresize = () => swf_dumper.window.handleResize()