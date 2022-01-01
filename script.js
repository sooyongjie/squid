const apiName = document.querySelector('#apiName')
const apiKey = document.querySelector('#apiKey')
const downloadLink = document.querySelector('#downloadLink')
const submitBtn = document.querySelector('#submitBtn')

let data = {
    "link": "https://r8j4ym.debrid.it/dl/testing123/Pok%C3%A9mon%20Mystery%20Dungeon%20Rescue%20Team%20DX%20%28NSP%29%28Base%20Game%29.rar",
    "host": "1fichier",
    "filename": "Pokémon Mystery Dungeon Rescue Team DX (NSP)(Base Game).rar",
    "streaming": [],
    "paws": false,
    "filesize": 2252922570,
    "id": "2axa97ie1d1",
    "hostDomain": "1fichier.com"
}

console.log(data);

if(Cookies.get('key')) {
    apiName.value = Cookies.get('name')
    apiKey.value = Cookies.get('key')
    downloadLink.value = Cookies.get('url')
}

submitBtn.addEventListener('click', () => {
    fetchLink(apiName.value, apiKey.value, downloadLink.value)
})

const fetchLink = (name, key, url) => {
    Cookies.set('name', name, { expires: 30 })
    Cookies.set('key', key, { expires: 30 })
    Cookies.set('url', url, { expires: 30 })
    let api = `https://api.alldebrid.com/v4/link/unlock?agent=${name}&apikey=${key}&link=${url}`
    let test = 0;

    if (!test) {
        axios.get(api)
            .then(response => {
                const data = response.data.data;
                console.log(`data: `, data);
                openLink(data.link)
            })
            .catch(error => console.error(error));
    } else {
        openLink(data.link)
    }
};

const openLink = (resUrl) => {
    let openLink = confirm("Open link?");
    if(openLink != null) {
        window.location.href = resUrl
    }
}