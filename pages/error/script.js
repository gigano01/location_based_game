document.getElementById("insert-error").textContent = getQueryParam("error")

setTimeout(() => {
    location.assign("../../cheat/index.html")
},10000)