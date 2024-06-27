const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form-submit");
const search = document.getElementById("search");



getUser("fireaxelottle");

// get user by search function
form.addEventListener('click', (e) => {
    e.preventDefault();
    getUser(search.value);
});

// fetch user info
async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();

    createUsercard(respData)

    getrepos(respData.repos_url);
};

// fetch repositories 
async function getrepos(url) {
    const resp = await fetch(url);
    const respData = await resp.json();


    addrepostocard(respData);
};

// creating user tag
function createUsercard(respData) {
    const main = document.getElementById('main');

    main.innerHTML = `
    <div class="card">
            <div>
                <img class="avatar" src="${respData.avatar_url}" alt="${respData.name}" />
            </div>
            <div class="user-info">
                <h2>${respData.name}</h2>
                <p>${respData.bio}</p>

                <ul class="info">
                    <li>${respData.followers}<strong>Followers</strong></li>
                    <li>${respData.following}<strong>Following</strong></li>
                    <li>${respData.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos"></div>
            </div>
        </div>
    `;

};

const addrepostocard = (respData) => {

    const repos_div = document.getElementById('repos');
    repos_div.innerHTML = "";


    respData.forEach(element => {
        const repoEl = document.createElement('div');
        repoEl.classList.add('repo');

        repoEl.innerHTML=element.name;

        repos_div.appendChild(repoEl);
    });

};