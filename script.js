const APIURL = "https://api.github.com/users/";

export function giveMeData(username) { 
    axios.get(`${APIURL}${username}`) 
        .then(response => { 
            console.log("State: fulfilled"); 
            const datos = response.data; 
            console.log("Data Recieved:", datos); 
            // Retornar la segunda llamada a la API 
            return axios.get(`${APIURL}${username}/repos`)
                .then(reposResponse => { 
                    const repos = reposResponse.data; 
                    console.log("Repos Recieved:", repos); 
                    // Obtener los nombres de los repositorios recientes 
                    const recentReposName = getRecentRepos(repos); 
                    // Pasar los datos del usuario y los nombres de los repos a la función provideInformation 
                    provideInformation(datos, recentReposName); 
                }); 
            }) .catch(error => { 
                console.log("State: rejected"); 
                if (error.response) { 
                    console.log('Connection failed'); 
                    giveErrorMessage(); 
                } 
            }); 
        }

export let mainSection = document.getElementById('main');

function giveErrorMessage() {
    let notFound = document.createElement('div')
        notFound.className = 'card'
        notFound.innerHTML =
            `<div>
            <p>No profile with this user name</p>
            </div>
            `
    mainSection.appendChild(notFound)
}


function provideInformation(datos, recentReposName) {
    let userCard = document.createElement('div')
    let avatar = datos.avatar_url
    let fullName = datos.name
    let biography = (datos.bio !== null && datos.bio !== undefined && datos.bio !== "null" && datos.bio !== " ") ? datos.bio : ""; // muy loco: con ManuelagDuque va bien con Ayuik, no
    let followersNumber = datos.followers
    let followingNumber = datos.following
    let repoNumber = datos.public_repos
    let latestRepos = recentReposName

        userCard.className = 'card'
        userCard.innerHTML =
            `<div>
                <img class="avatar" alt="avatar" src="${avatar}">
                <section class="user-info">
                    <h2>${fullName}</h2>
                    <p>${biography}</p>
                    <ul>
                        <strong>
                            <li>${followersNumber} Followers</li>
                            <li>${followingNumber} Following</li>
                            <li>${repoNumber} Repos</li>
                        </strong>
                    </ul>
                    <span class="repo">${latestRepos[0]}</span> <span class="repo">${latestRepos[1]}</span> <span class="repo">${latestRepos[2]}</span> <span class="repo">${latestRepos[3]}</span> <span class="repo">${latestRepos[4]}</span> 
                </section>
            </div>
            `
    mainSection.appendChild(userCard);
};

function getRecentRepos(repos) { 
    const sortedRepos = repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)); 
    let recentRepos = sortedRepos.slice(0, 5);
    let recentReposName = recentRepos.map(repo => repo.name);
    return recentReposName
} 
    
    
